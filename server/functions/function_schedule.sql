--function assumes dates in leaves are sorted in ascending order.
--only can apply leaves in the subsequent years. cant change the leaves of existing year.
--leaves for next year has to be declared latest end of the year
--test: SELECT specify_leaves('zw', '{2021-1-1, 2021-6-19, 2021-12-31}'::date[]);
--test: SELECT specify_leaves('zw', '{2020-12-30 ,2020-12-31}'::date[]);
CREATE OR REPLACE FUNCTION specify_leaves(username VARCHAR(256), leaves_ date[]) RETURNS void AS $$
    DECLARE
        contiguous_150_blocks INTEGER:= 0;
        previous_date DATE:= date_trunc('year', leaves_[1]);
        previous_leaves DATE[] := ARRAY(SELECT date FROM leaves WHERE username=cname AND to_char(date, 'YYYY') = to_char(previous_date, 'YYYY'));
        x DATE;
    BEGIN
        --Check if any leaves applied are before the current_date
        IF (SELECT COUNT(*) FROM unnest(leaves_) dates WHERE dates <= current_date) > 0 THEN
            RAISE EXCEPTION'Date has already passed';
        END IF;

        --Merge leaves applied now with previous leaves for a year and add first jan next year to the mix
        leaves_ = leaves_::date[] || previous_leaves::date[];
        
        --append next year's first day to date[]
        leaves_ = leaves_::date[] || (previous_date + interval '1 year')::date;

        --sort leaves_ and filter duplicates
        leaves_ = ARRAY(SELECT DISTINCT date FROM unnest(leaves_) date ORDER BY date ASC)::DATE[];
        
        FOREACH x in ARRAY leaves_ -- O(~64)
            LOOP
                --Ensure leaves are from the same year
                IF to_char(x - 1, 'YYYY') <> to_char(previous_date, 'YYYY') AND x <> date_trunc('year', previous_date) THEN 
                    RAISE EXCEPTION'Attempted to apply across years';
                END IF;
                
                -- Checks if a pet is under the caretaker's care on that day
                IF (SELECT AVG(pet_count) FROM Schedule WHERE date = x AND cname = username) > 0 THEN
                    RAISE EXCEPTION'Cannot apply for leave if there is at least one pet';
                END IF;

                -- Checks for the 2x150 blocks
                IF x - previous_date >= 150 THEN
                    contiguous_150_blocks := contiguous_150_blocks + (x - previous_date) / 150; 
                END IF;
                RAISE NOTICE 'Segment: %',x - previous_date;
                
                IF x != (date_trunc('year', leaves_[1]) + interval '1 year')::date THEN
                -- It is now save to apply for leave x
                    INSERT INTO leaves VALUES(username, x) ON CONFLICT(cname, date) DO NOTHING;
                END IF;
                
                -- update to be the next working day
                previous_date := x + 1; 
            END LOOP;

        IF contiguous_150_blocks < 2 THEN
            RAISE EXCEPTION'Failed to meet the requirement of 2x150 pet days, %', contiguous_150_blocks;
        END IF;
    END;
$$ LANGUAGE plpgsql;


--Does not allow part timers to delete their availability. Can only add more.
--part timer can declare their availability at any time as long as the day has
--test: SELECT specify_availability('zw','{2022-1-1, 2022-6-19, 2022-12-31}'::date[]);
CREATE OR REPLACE FUNCTION specify_availability(username VARCHAR(256), work date[]) RETURNS void AS $$
    DECLARE
        x DATE;
    BEGIN
        FOREACH x in ARRAY work
            LOOP
                IF x > current_date THEN
                    INSERT INTO Availability(cname, date) VALUES(username, x) ON CONFLICT (cname, date) DO NOTHING;
                END IF;
            END LOOP;
    END;
$$ LANGUAGE plpgsql;
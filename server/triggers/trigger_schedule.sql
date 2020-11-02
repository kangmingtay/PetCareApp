--trigger removes all entries from schedule before the current year. 
--Because schedule for that month is required for salary calculations
--Schedule for the year is required to get leaves
CREATE OR REPLACE FUNCTION delete_old_schedule() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  row_count int;
BEGIN
    DELETE FROM Schedule WHERE to_char(date, 'YYYY') < to_char(current_date, 'YYYY');
    IF found THEN
        GET DIAGNOSTICS row_count = ROW_COUNT;
        RAISE NOTICE 'DELETEd % row(s) FROM Schedule', row_count;
    END IF;
    RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trigger_delete_old_schedule ON schedule;
CREATE TRIGGER trigger_delete_old_schedule
AFTER INSERT ON schedule
EXECUTE PROCEDURE delete_old_schedule();



CREATE OR REPLACE FUNCTION update_schedule() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    x DATE:= NEW.start_date;
BEGIN
    IF NEW.is_selected THEN
        LOOP
            INSERT INTO Schedule
            VALUES(NEW.cname, x, 1)
            ON CONFLICT (cname, date) DO
            UPDATE SET pet_count = Schedule.pet_count + 1 WHERE Schedule.cname = NEW.cname AND Schedule.date = x;
            IF x = NEW.end_date THEN EXIT; END IF;
            x := x + 1;
        END LOOP;
    END IF;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_update_schedule ON bids;
CREATE TRIGGER trigger_update_schedule
AFTER UPDATE OF is_selected ON bids
FOR EACH ROW
EXECUTE PROCEDURE update_schedule();
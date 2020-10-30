--trigger removes all entries from schedule before the current year. 
--Because schedule for that month is required for salary calculations
--Schedule for the year is required to get leaves
CREATE OR REPLACE FUNCTION update_care_taker_rating() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE care_takers C
    SET rating = (SELECT AVG(rating) FROM bids WHERE is_selected = true GROUP BY cname HAVING cname = C.cname)
    WHERE C.cname = NEW.cname;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_update_care_taker_rating ON bids;
CREATE TRIGGER trigger_update_care_taker_rating
AFTER UPDATE OF is_selected ON bids
FOR EACH ROW
EXECUTE PROCEDURE update_care_taker_rating();
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
AFTER UPDATE OF is_selected,rating ON bids
FOR EACH ROW
EXECUTE PROCEDURE update_care_taker_rating();
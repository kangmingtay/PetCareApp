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
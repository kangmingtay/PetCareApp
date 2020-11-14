CREATE OR REPLACE FUNCTION add_caretaker()
RETURNS TRIGGER AS $$
BEGIN
    -- inserts into caretaker whenever a full-timer / part-timer is added
    INSERT INTO Care_Takers(cname, rating) VALUES (NEW.cname, 2);
        RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_fulltimer_trigger
BEFORE INSERT
ON Full_Timer
FOR EACH ROW
EXECUTE PROCEDURE add_caretaker();

CREATE TRIGGER create_parttimer_trigger
BEFORE INSERT
ON Part_Timer
FOR EACH ROW
EXECUTE PROCEDURE add_caretaker();
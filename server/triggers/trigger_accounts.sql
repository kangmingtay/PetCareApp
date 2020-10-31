CREATE OR REPLACE FUNCTION check_account()
RETURNS TRIGGER AS $$
BEGIN
    -- inserts into admin or pet owner and care taker tables depending on the type
    IF NEW.is_admin = 'true' THEN
        INSERT INTO PCS_Administrator VALUES (NEW.username);
        RETURN NEW;
    ELSE
        INSERT INTO Pet_Owners VALUES (NEW.username);
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_account_trigger
AFTER INSERT
ON Accounts
FOR EACH ROW
EXECUTE PROCEDURE check_account();
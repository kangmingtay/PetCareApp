CREATE OR REPLACE FUNCTION check_valid_amount_before_insert(pnameA VARCHAR(256), pet_nameA VARCHAR(256), cnameA VARCHAR(256), start_dateA VARCHAR(256), end_dateA VARCHAR(256), payment_amtA NUMERIC, transaction_typeA VARCHAR(30))
RETURNS void AS $$
    DECLARE
      pet_type VARCHAR(256);
      min_rate NUMERIC;
      rating NUMERIC;
      numDays INT;
    BEGIN
      SELECT P.category INTO pet_type
      FROM pets P
      WHERE P.pname = pnameA AND P.pet_name = pet_nameA;

      SELECT PC.base_price INTO min_rate
      FROM pet_categories PC
      WHERE pet_type = PC.category;

      SELECT C.rating INTO rating
      FROM care_takers C
      WHERE C.cname = cnameA;

      SELECT TO_DATE(end_dateA, 'DD-MM-YYYY') - TO_DATE(start_dateA, 'DD-MM-YYYY') + 1
      INTO numDays;

      IF rating IS NULL THEN
        IF min_rate * numDays > payment_amtA THEN
          RAISE EXCEPTION 'Insufficient payment! Minimum expected: $% ', ROUND(min_rate * numDays::NUMERIC, 2);
        END IF;
      ELSE
        IF (min_rate + (min_rate * (CEILING(rating) - 1) / 4) ) * numDays > payment_amtA THEN
          RAISE EXCEPTION 'Insufficient payment! Minimum expected: $% ', ROUND((min_rate + (min_rate * (CEILING(rating) - 1) / 4) ) * numDays::NUMERIC, 2);
        END IF;
      END IF;

      -- IF (min_rate + (min_rate * (CEILING(rating) - 1) / 4) ) * numDays > payment_amtA THEN
      --   RAISE EXCEPTION 'Insufficient payment! Minimum expected: $% ', (min_rate + (min_rate * (CEILING(rating) - 1) / 4) ) * numDays;
      -- END IF;
      -- IF 1 THEN
      --   RAISE EXCEPTION 'Insufficient payment! Minimum expected: $% ', (min_rate + (min_rate * (CEILING(rating) - 1) / 4) ) * numDays;
      -- END IF;

      INSERT INTO bids(pname, pet_name, cname, start_date, end_date, payment_amt, transaction_type)
      VALUES (pnameA, pet_nameA, cnameA, TO_DATE(start_dateA, 'DD-MM-YYYY'), TO_DATE(end_dateA, 'DD-MM-YYYY'), payment_amtA, transaction_typeA);

    END;
$$ LANGUAGE plpgsql;
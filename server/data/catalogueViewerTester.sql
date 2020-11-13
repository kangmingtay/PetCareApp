--drop schema public cascade;
--create public schema;


--Accounts:
INSERT INTO Accounts VALUES ('p1', '123', 'a@b.com', 'xxx', TO_DATE('01-01-2020', 'DD-MM-YYYY'), 'false');
INSERT INTO Accounts VALUES ('cft1', '123', 'a@b.com', 'xxx', TO_DATE('01-01-2020', 'DD-MM-YYYY'), 'false');
INSERT INTO Accounts VALUES ('cft2', '123', 'a@b.com', 'xxx', TO_DATE('01-01-2020', 'DD-MM-YYYY'), 'false');
INSERT INTO Accounts VALUES ('cft3', '123', 'a@b.com', 'xxx', TO_DATE('01-01-2020', 'DD-MM-YYYY'), 'false');
INSERT INTO Accounts VALUES ('cpt1', '123', 'a@b.com', 'xxx', TO_DATE('01-01-2020', 'DD-MM-YYYY'), 'false');
INSERT INTO Accounts VALUES ('cpt2', '123', 'a@b.com', 'xxx', TO_DATE('01-01-2020', 'DD-MM-YYYY'), 'false');
INSERT INTO Accounts VALUES ('cpt3', '123', 'a@b.com', 'xxx', TO_DATE('01-01-2020', 'DD-MM-YYYY'), 'false');
INSERT INTO Accounts VALUES ('cpt11', '123', 'a@b.com', 'xxx', TO_DATE('01-01-2020', 'DD-MM-YYYY'), 'false');
INSERT INTO Accounts VALUES ('cpt12', '123', 'a@b.com', 'yyy', TO_DATE('01-01-2020', 'DD-MM-YYYY'), 'false');
INSERT INTO Accounts VALUES ('cpt13', '123', 'a@b.com', 'xxx', TO_DATE('01-01-2020', 'DD-MM-YYYY'), 'false');
INSERT INTO Accounts VALUES ('cpt14', '123', 'a@b.com', 'yyy', TO_DATE('01-01-2020', 'DD-MM-YYYY'), 'false');
INSERT INTO Accounts VALUES ('cpt15', '123', 'a@b.com', 'xxx', TO_DATE('01-01-2020', 'DD-MM-YYYY'), 'false');

INSERT INTO Accounts VALUES ('ed', '123', 'a@b.com', 'xxx', TO_DATE('01-01-2020', 'DD-MM-YYYY'), 'true');

--Petowners:
INSERT INTO Pet_Owners VALUES ('p1');

--CareTakers:
-- INSERT INTO Care_Takers VALUES ('cft1', NULL);
-- INSERT INTO Care_Takers VALUES ('cft2', NULL);
-- INSERT INTO Care_Takers VALUES ('cft3', NULL);
-- INSERT INTO Care_Takers VALUES ('cpt1', NULL);
-- INSERT INTO Care_Takers VALUES ('cpt2', NULL);
-- INSERT INTO Care_Takers VALUES ('cpt3', NULL);
-- INSERT INTO Care_Takers VALUES ('cpt11', 1);
-- INSERT INTO Care_Takers VALUES ('cpt12', 2);
-- INSERT INTO Care_Takers VALUES ('cpt13', 2.5);
-- INSERT INTO Care_Takers VALUES ('cpt14', 4);
-- INSERT INTO Care_Takers VALUES ('cpt15', 5);
-- INSERT INTO Care_Takers VALUES ('p1', NULL);

--Full_timer:
INSERT INTO Full_timer VALUES ('cft1');
INSERT INTO Full_timer VALUES ('cft2');
INSERT INTO Full_timer VALUES ('cft3');
INSERT INTO Full_timer VALUES ('p1');

--Part_timer:
INSERT INTO Part_timer VALUES ('cpt1');
INSERT INTO Part_timer VALUES ('cpt2');
INSERT INTO Part_timer VALUES ('cpt3');
INSERT INTO Part_timer VALUES ('cpt11');
INSERT INTO Part_timer VALUES ('cpt12');
INSERT INTO Part_timer VALUES ('cpt13');
INSERT INTO Part_timer VALUES ('cpt14');
INSERT INTO Part_timer VALUES ('cpt15');

--pet_categories
INSERT INTO pet_categories VALUES ('cat', 50);
INSERT INTO pet_categories VALUES ('dog', 100);

--prefers
INSERT INTO prefers VALUES ('cft1','cat');
INSERT INTO prefers VALUES ('cft2','cat');
INSERT INTO prefers VALUES ('cft3','dog');
INSERT INTO prefers VALUES ('cpt1','cat');
INSERT INTO prefers VALUES ('cpt2','cat');
INSERT INTO prefers VALUES ('cpt3','dog');

INSERT INTO prefers VALUES ('cpt11','cat');
INSERT INTO prefers VALUES ('cpt12','cat');
INSERT INTO prefers VALUES ('cpt13','cat');
INSERT INTO prefers VALUES ('cpt14','cat');
INSERT INTO prefers VALUES ('cpt15','cat');

INSERT INTO prefers VALUES ('p1','cat');
INSERT INTO prefers VALUES ('p1','dog');

--pets
INSERT INTO pets VALUES ('nyaako','cat','p1','daily cuddles', 'www.pog.com');
INSERT INTO pets VALUES ('nyaako1','cat','p1','ball', 'www.pog.com');
INSERT INTO pets VALUES ('nyaako2','cat','p1','laser', 'www.pog.com');
INSERT INTO pets VALUES ('inu','dog','p1','play catch', 'www.pog.com');

--schedule
--Full timers' schedule
--universal set is all days in the year
--FT: leaves and schedule are mutually exclusive
INSERT INTO Schedule
SELECT 'cft1', generate_series(TO_DATE('1/10/2021', 'DD/MM/YYYY'), TO_DATE('3/10/2021', 'DD/MM/YYYY'),'1 day'::interval), 4;
INSERT INTO Schedule
SELECT 'cft1', generate_series(TO_DATE('4/10/2021', 'DD/MM/YYYY'), TO_DATE('6/10/2021', 'DD/MM/YYYY'),'1 day'::interval), 5;
INSERT INTO Schedule
SELECT 'cft1', generate_series(TO_DATE('7/10/2021', 'DD/MM/YYYY'), TO_DATE('8/10/2021', 'DD/MM/YYYY'),'1 day'::interval), 4;

INSERT INTO Schedule
SELECT 'cft2', generate_series(TO_DATE('1/10/2021', 'DD/MM/YYYY'), TO_DATE('2/10/2021', 'DD/MM/YYYY'),'1 day'::interval), 4;
INSERT INTO Schedule
SELECT 'cft2', generate_series(TO_DATE('3/10/2021', 'DD/MM/YYYY'), TO_DATE('6/10/2021', 'DD/MM/YYYY'),'1 day'::interval), 5;
INSERT INTO Schedule
SELECT 'cft2', generate_series(TO_DATE('7/10/2021', 'DD/MM/YYYY'), TO_DATE('8/10/2021', 'DD/MM/YYYY'),'1 day'::interval), 4;

INSERT INTO Schedule
SELECT 'cft3', generate_series(TO_DATE('1/10/2021', 'DD/MM/YYYY'), TO_DATE('3/10/2021', 'DD/MM/YYYY'),'1 day'::interval), 4;
INSERT INTO Schedule
SELECT 'cft3', generate_series(TO_DATE('4/10/2021', 'DD/MM/YYYY'), TO_DATE('6/10/2021', 'DD/MM/YYYY'),'1 day'::interval), 5;
INSERT INTO Schedule
SELECT 'cft3', generate_series(TO_DATE('7/10/2021', 'DD/MM/YYYY'), TO_DATE('8/10/2021', 'DD/MM/YYYY'),'1 day'::interval), 4;

--Full timers' leaves
INSERT INTO leaves
SELECT 'cft1', generate_series(TO_DATE('9/10/2021', 'DD/MM/YYYY'), TO_DATE('10/10/2021', 'DD/MM/YYYY'),'1 day'::interval);

INSERT INTO leaves
SELECT 'cft2', generate_series(TO_DATE('11/10/2021', 'DD/MM/YYYY'), TO_DATE('12/10/2021', 'DD/MM/YYYY'),'1 day'::interval);


--PT: schedule is subset of availability
--Part timers' availability
INSERT INTO availability
SELECT 'cpt1', generate_series(TO_DATE('1/10/2021', 'DD/MM/YYYY'), TO_DATE('5/10/2021', 'DD/MM/YYYY'),'1 day'::interval);

INSERT INTO availability
SELECT 'cpt2', generate_series(TO_DATE('1/10/2021', 'DD/MM/YYYY'), TO_DATE('6/10/2021', 'DD/MM/YYYY'),'2 day'::interval);

INSERT INTO availability
SELECT 'cpt3', generate_series(TO_DATE('1/10/2021', 'DD/MM/YYYY'), TO_DATE('5/10/2021', 'DD/MM/YYYY'),'1 day'::interval);

INSERT INTO availability
SELECT 'cpt11', generate_series(TO_DATE('1/11/2021', 'DD/MM/YYYY'), TO_DATE('5/11/2021', 'DD/MM/YYYY'),'1 day'::interval);
INSERT INTO availability
SELECT 'cpt12', generate_series(TO_DATE('1/11/2021', 'DD/MM/YYYY'), TO_DATE('5/11/2021', 'DD/MM/YYYY'),'1 day'::interval);
INSERT INTO availability
SELECT 'cpt13', generate_series(TO_DATE('1/11/2021', 'DD/MM/YYYY'), TO_DATE('5/11/2021', 'DD/MM/YYYY'),'1 day'::interval);
INSERT INTO availability
SELECT 'cpt14', generate_series(TO_DATE('1/11/2021', 'DD/MM/YYYY'), TO_DATE('5/11/2021', 'DD/MM/YYYY'),'1 day'::interval);
INSERT INTO availability
SELECT 'cpt15', generate_series(TO_DATE('1/11/2021', 'DD/MM/YYYY'), TO_DATE('5/11/2021', 'DD/MM/YYYY'),'1 day'::interval);

--Part timers' schedule
INSERT INTO Schedule
SELECT 'cpt1', generate_series(TO_DATE('1/10/2021', 'DD/MM/YYYY'), TO_DATE('3/10/2021', 'DD/MM/YYYY'),'1 day'::interval), 1;
INSERT INTO Schedule
SELECT 'cpt1', generate_series(TO_DATE('4/10/2021', 'DD/MM/YYYY'), TO_DATE('5/10/2021', 'DD/MM/YYYY'),'1 day'::interval), 2;

INSERT INTO Schedule
SELECT 'cpt2', generate_series(TO_DATE('1/10/2021', 'DD/MM/YYYY'), TO_DATE('6/10/2021', 'DD/MM/YYYY'),'2 day'::interval), 1;

INSERT INTO Schedule
SELECT 'cpt3', generate_series(TO_DATE('1/10/2021', 'DD/MM/YYYY'), TO_DATE('3/10/2021', 'DD/MM/YYYY'),'1 day'::interval), 1;
INSERT INTO Schedule
SELECT 'cpt3', generate_series(TO_DATE('4/10/2021', 'DD/MM/YYYY'), TO_DATE('5/10/2021', 'DD/MM/YYYY'),'1 day'::interval), 2;

--testing rating for part timers
INSERT INTO Schedule
SELECT 'cpt11', generate_series(TO_DATE('1/11/2021', 'DD/MM/YYYY'), TO_DATE('1/11/2021', 'DD/MM/YYYY'),'1 day'::interval), 1;
INSERT INTO Schedule
SELECT 'cpt11', generate_series(TO_DATE('2/11/2021', 'DD/MM/YYYY'), TO_DATE('5/11/2021', 'DD/MM/YYYY'),'1 day'::interval), 2;

INSERT INTO Schedule
SELECT 'cpt12', generate_series(TO_DATE('1/11/2021', 'DD/MM/YYYY'), TO_DATE('1/11/2021', 'DD/MM/YYYY'),'1 day'::interval), 1;
INSERT INTO Schedule
SELECT 'cpt12', generate_series(TO_DATE('2/11/2021', 'DD/MM/YYYY'), TO_DATE('5/11/2021', 'DD/MM/YYYY'),'1 day'::interval), 2;

INSERT INTO Schedule
SELECT 'cpt13', generate_series(TO_DATE('1/11/2021', 'DD/MM/YYYY'), TO_DATE('1/11/2021', 'DD/MM/YYYY'),'1 day'::interval), 1;
INSERT INTO Schedule
SELECT 'cpt13', generate_series(TO_DATE('2/11/2021', 'DD/MM/YYYY'), TO_DATE('2/11/2021', 'DD/MM/YYYY'),'1 day'::interval), 2;
INSERT INTO Schedule
SELECT 'cpt13', generate_series(TO_DATE('3/11/2021', 'DD/MM/YYYY'), TO_DATE('5/11/2021', 'DD/MM/YYYY'),'1 day'::interval), 3;

INSERT INTO Schedule
SELECT 'cpt14', generate_series(TO_DATE('1/11/2021', 'DD/MM/YYYY'), TO_DATE('1/11/2021', 'DD/MM/YYYY'),'1 day'::interval), 1;
INSERT INTO Schedule
SELECT 'cpt14', generate_series(TO_DATE('2/11/2021', 'DD/MM/YYYY'), TO_DATE('2/11/2021', 'DD/MM/YYYY'),'1 day'::interval), 2;
INSERT INTO Schedule
SELECT 'cpt14', generate_series(TO_DATE('3/11/2021', 'DD/MM/YYYY'), TO_DATE('3/11/2021', 'DD/MM/YYYY'),'1 day'::interval), 3;
INSERT INTO Schedule
SELECT 'cpt14', generate_series(TO_DATE('4/11/2021', 'DD/MM/YYYY'), TO_DATE('5/11/2021', 'DD/MM/YYYY'),'1 day'::interval), 4;

INSERT INTO Schedule
SELECT 'cpt15', generate_series(TO_DATE('1/11/2021', 'DD/MM/YYYY'), TO_DATE('1/11/2021', 'DD/MM/YYYY'),'1 day'::interval), 1;
INSERT INTO Schedule
SELECT 'cpt15', generate_series(TO_DATE('2/11/2021', 'DD/MM/YYYY'), TO_DATE('2/11/2021', 'DD/MM/YYYY'),'1 day'::interval), 2;
INSERT INTO Schedule
SELECT 'cpt15', generate_series(TO_DATE('3/11/2021', 'DD/MM/YYYY'), TO_DATE('3/11/2021', 'DD/MM/YYYY'),'1 day'::interval), 3;
INSERT INTO Schedule
SELECT 'cpt15', generate_series(TO_DATE('4/11/2021', 'DD/MM/YYYY'), TO_DATE('4/11/2021', 'DD/MM/YYYY'),'1 day'::interval), 4;
INSERT INTO Schedule
SELECT 'cpt15', generate_series(TO_DATE('5/11/2021', 'DD/MM/YYYY'), TO_DATE('5/11/2021', 'DD/MM/YYYY'),'1 day'::interval), 5;


--bids
-- INSERT INTO bids (pname, pet_name, cname, start_date, end_date, rating, is_selected, payment_amt, transaction_type, review) 
-- VALUES ('p1', 'nyaako1', 'cft1', TO_DATE('1/11/2021', 'DD/MM/YYYY'), TO_DATE('2/11/2021', 'DD/MM/YYYY'), NULL, false, 50, 'card', NULL);

-- INSERT INTO bids (pname, pet_name, cname, start_date, end_date, rating, is_selected, payment_amt, transaction_type, review) 
-- VALUES ('p1', 'nyaako2', 'cpt1', TO_DATE('3/11/2021', 'DD/MM/YYYY'), TO_DATE('4/11/2021', 'DD/MM/YYYY'), NULL, false, 50, 'card', NULL);

-- INSERT INTO bids (pname, pet_name, cname, start_date, end_date, rating, is_selected, payment_amt, transaction_type, review) 
-- VALUES ('p1', 'nyaako1', 'cpt15', TO_DATE('1/11/2021', 'DD/MM/YYYY'), TO_DATE('1/11/2021', 'DD/MM/YYYY'), NULL, false, 40, 'card', NULL);


--For fetching caretakers from catalogue
-- SELECT cname
--       FROM (
--         SELECT DISTINCT F.cname, L.date
--         FROM full_timer F, prefers P, accounts A,
--         (SELECT generate_series(TO_DATE('${startDate}', 'DD-MM-YYYY'), TO_DATE('${endDate}', 'DD-MM-YYYY'),'1 day'::interval) AS date) AS L
--         WHERE F.cname = P.cname AND P.cname = A.username
--         AND P.category LIKE '${petCategory}' AND P.cname LIKE '${cName}'
--         AND A.address LIKE '${address}' AND F.cname != '${pName}'
--         AND NOT EXISTS (
--           SELECT DISTINCT L1.date
--           FROM leaves L1
--           WHERE L.date = L1.date AND F.cname = L1.cname
--           AND L1.date >= TO_DATE('${startDate}', 'DD-MM-YYYY') AND L1.date <= TO_DATE('${endDate}', 'DD-MM-YYYY')
--         )
--         AND NOT EXISTS (
--           SELECT S.date
--           FROM schedule S
--           WHERE L.date = S.date AND F.cname = S.cname
--           AND S.pet_count = 5
--         )
--       ) AS FT
--       GROUP BY FT.cname
--       HAVING TO_DATE('${endDate}', 'DD-MM-YYYY') - TO_DATE('${startDate}', 'DD-MM-YYYY')+1 = COUNT(*)
--     UNION
--     SELECT cname
--       FROM (
--         SELECT DISTINCT A.cname, A.date
--         FROM availability A, prefers P, accounts AC
--         WHERE A.date >= TO_DATE('${startDate}', 'DD-MM-YYYY') AND A.date <= TO_DATE('${endDate}', 'DD-MM-YYYY')
--         AND P.cname = A.cname AND A.cname = AC.username
--         AND P.category LIKE '${petCategory}' AND P.cname LIKE '${cName}'
--         AND AC.address LIKE '${address}' AND P.cname != '${pName}'
--         AND NOT EXISTS (
--           SELECT DISTINCT S.cname
--           FROM schedule S, care_takers C
--           WHERE A.cname = S.cname AND S.date = A.date
--           AND S.cname = C.cname AND ((C.rating <= 2 AND S.pet_count = 2) OR (C.rating > 2 AND S.pet_count = CEILING(C.rating)))
--         )
--       ) AS PT
--       GROUP BY PT.cname
--       HAVING TO_DATE('${endDate}', 'DD-MM-YYYY') - TO_DATE('${startDate}', 'DD-MM-YYYY')+1 = COUNT(*)

-- --For fetching list of pets for particular pname during bid selection
-- SELECT P.pet_name
--       FROM pets P
--       WHERE P.pname = '${pname}'
--       AND P.category LIKE '${petCategory}'
--       AND P.pet_name NOT IN (
--         SELECT B.pet_name
--         FROM bids B
--         WHERE P.pet_name = B.pet_name
--         AND (B.start_date <= TO_DATE('${endDate}', 'DD-MM-YYYY') AND B.end_date >= TO_DATE('${endDate}', 'DD-MM-YYYY')) 
--         OR (TO_DATE('${startDate}', 'DD-MM-YYYY') <= B.end_date AND TO_DATE('${startDate}', 'DD-MM-YYYY') >= B.start_date)
--         OR (TO_DATE('${startDate}', 'DD-MM-YYYY') <= B.start_date AND TO_DATE('${endDate}', 'DD-MM-YYYY') >= B.end_date)
--       )
--       ;

-- -- INSERT INTO bids(pname, pet_name, cname, start_date, end_date, payment_amt, transaction_type)
-- --   VALUES ('${pName}', '${petName}', '${cName}', '${startDate}', '${endDate}', '${paymentAmt}', '${transactionType}');

-- CREATE OR REPLACE FUNCTION check_valid_amount_before_insert(pnameA VARCHAR(256), pet_nameA VARCHAR(256), cnameA VARCHAR(256), start_dateA VARCHAR(256), end_dateA VARCHAR(256), payment_amtA NUMERIC, transaction_typeA VARCHAR(30))
-- RETURNS void AS $$
--     DECLARE
--       pet_type VARCHAR(256);
--       min_rate NUMERIC;
--       rating NUMERIC;
--       numDays INT;
--     BEGIN
--       SELECT P.category INTO pet_type
--       FROM pets P
--       WHERE P.pname = pnameA AND P.pet_name = pet_nameA;

--       SELECT PC.base_price INTO min_rate
--       FROM pet_categories PC
--       WHERE pet_type = PC.category;

--       SELECT C.rating INTO rating
--       FROM care_takers C
--       WHERE C.cname = cnameA;

--       SELECT TO_DATE(end_dateA, 'DD-MM-YYYY') - TO_DATE(start_dateA, 'DD-MM-YYYY') + 1
--       INTO numDays;

--       IF (min_rate + (min_rate * (CEILING(rating) - 1) / 4) ) * numDays > payment_amtA THEN
--         RAISE EXCEPTION 'Insufficient payment! Minimum expected: $% ', (min_rate + (min_rate * (CEILING(rating) - 1) / 4) ) * numDays;
--       END IF;

--       INSERT INTO bids(pname, pet_name, cname, start_date, end_date, payment_amt, transaction_type)
--       VALUES (pnameA, pet_nameA, cnameA, TO_DATE(start_dateA, 'DD-MM-YYYY'), TO_DATE(end_dateA, 'DD-MM-YYYY'), payment_amtA, transaction_typeA);

--     END;
-- $$ LANGUAGE plpgsql;
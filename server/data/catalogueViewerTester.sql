--Accounts:
INSERT INTO Accounts VALUES ('p1', '123', 'a@b.com', 'xxx', TO_DATE('01-01-2020', 'DD-MM-YYYY'), 'false');
INSERT INTO Accounts VALUES ('cft1', '123', 'a@b.com', 'xxx', TO_DATE('01-01-2020', 'DD-MM-YYYY'), 'false');
INSERT INTO Accounts VALUES ('cft2', '123', 'a@b.com', 'xxx', TO_DATE('01-01-2020', 'DD-MM-YYYY'), 'false');
INSERT INTO Accounts VALUES ('cft3', '123', 'a@b.com', 'xxx', TO_DATE('01-01-2020', 'DD-MM-YYYY'), 'false');
INSERT INTO Accounts VALUES ('cpt1', '123', 'a@b.com', 'xxx', TO_DATE('01-01-2020', 'DD-MM-YYYY'), 'false');
INSERT INTO Accounts VALUES ('cpt2', '123', 'a@b.com', 'xxx', TO_DATE('01-01-2020', 'DD-MM-YYYY'), 'false');
INSERT INTO Accounts VALUES ('cpt3', '123', 'a@b.com', 'xxx', TO_DATE('01-01-2020', 'DD-MM-YYYY'), 'false');

--Petowners:
INSERT INTO Pet_Owners VALUES ('p1');

--CareTakers:
INSERT INTO Care_Takers VALUES ('cft1', NULL);
INSERT INTO Care_Takers VALUES ('cft2', NULL);
INSERT INTO Care_Takers VALUES ('cft3', NULL);
INSERT INTO Care_Takers VALUES ('cpt1', NULL);
INSERT INTO Care_Takers VALUES ('cpt2', NULL);
INSERT INTO Care_Takers VALUES ('cpt3', NULL);

--Full_timer:
INSERT INTO Full_timer VALUES ('cft1');
INSERT INTO Full_timer VALUES ('cft2');
INSERT INTO Full_timer VALUES ('cft3');

--Part_timer:
INSERT INTO Part_timer VALUES ('cpt1');
INSERT INTO Part_timer VALUES ('cpt2');
INSERT INTO Part_timer VALUES ('cpt3');

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

--pets
INSERT INTO pets VALUES ('nyaako','cat','p1','daily cuddles');
INSERT INTO pets VALUES ('inu','dog','p1','play catch');

--bids
INSERT INTO bids (pname, pet_name, cname, start_date, end_date, rating, is_selected, payment_amt, transaction_type, ranking, review) 
VALUES ('p1', 'nyaako', 'cft1', TO_DATE('1/10/2021', 'DD/MM/YYYY'), TO_DATE('2/10/2021', 'DD/MM/YYYY'), NULL, false, 50, 'card', 1, NULL);

INSERT INTO bids (pname, pet_name, cname, start_date, end_date, rating, is_selected, payment_amt, transaction_type, ranking, review) 
VALUES ('p1', 'nyaako', 'cpt1', TO_DATE('1/10/2021', 'DD/MM/YYYY'), TO_DATE('2/10/2021', 'DD/MM/YYYY'), NULL, false, 50, 'card', 2, NULL);

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

--Part timers' schedule
INSERT INTO Schedule
SELECT 'cpt1', generate_series(TO_DATE('1/10/2021', 'DD/MM/YYYY'), TO_DATE('3/10/2021', 'DD/MM/YYYY'),'1 day'::interval), 1;
INSERT INTO Schedule
SELECT 'cpt1', generate_series(TO_DATE('4/10/2021', 'DD/MM/YYYY'), TO_DATE('5/10/2021', 'DD/MM/YYYY'),'1 day'::interval), 2;

INSERT INTO Schedule
SELECT 'cpt2', generate_series(TO_DATE('1/10/2021', 'DD/MM/YYYY'), TO_DATE('6/10/2021', 'DD/MM/YYYY'),'2 day'::interval), 1;

INSERT INTO Schedule
SELECT 'cpt3', generate_series(TO_DATE('1/10/2021', 'DD/MM/YYYY'), TO_DATE('3/10/2021', 'DD/MM/YYYY'),'1 day'::interval), 2;
INSERT INTO Schedule
SELECT 'cpt3', generate_series(TO_DATE('4/10/2021', 'DD/MM/YYYY'), TO_DATE('5/10/2021', 'DD/MM/YYYY'),'1 day'::interval), 1;

--For FT caretakers into catalogue
SELECT cname
    FROM (
      SELECT DISTINCT F.cname, L.date
      FROM full_timer F, prefers P, (SELECT generate_series(TO_DATE('${startDate}', 'YYYY/MM/DD'), TO_DATE('${endDate}', 'YYYY/MM/DD'),'1 day'::interval) AS date) AS L
      WHERE F.cname = P.cname AND P.category = '${petCategory}'
      EXCEPT
      SELECT DISTINCT L1.cname, L1.date
      FROM leaves L1
      WHERE L1.date >= '${startDate}' AND L1.date <= '${endDate}'
      EXCEPT
      SELECT S.cname, S.date
      FROM schedule S
      WHERE S.pet_count = 5
    ) AS FT
    GROUP BY FT.cname
    HAVING DATE_PART('day', '${endDate}'::timestamp - '${startDate}'::timestamp)+1 = COUNT(*);
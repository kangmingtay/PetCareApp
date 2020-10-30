--Accounts:

INSERT INTO Accounts VALUES ('zw', '123', 'z@w.com','xxx',TO_DATE('01-01-2020', 'DD-MM-YYYY'),'false');
INSERT INTO Accounts VALUES ('km', '123', 'z@w.com','xxx',TO_DATE('01-01-2020', 'DD-MM-YYYY'),'false');
INSERT INTO Accounts VALUES ('shannon', '123', 'z@w.com','xxx',TO_DATE('01-01-2020', 'DD-MM-YYYY'),'false');
INSERT INTO Accounts VALUES ('rusdi', '123', 'z@w.com','xxx',TO_DATE('01-01-2020', 'DD-MM-YYYY'),'false');
INSERT INTO Accounts VALUES ('zayne', '123', 'z@w.com','xxx',TO_DATE('01-01-2020', 'DD-MM-YYYY'),'false');


--Petowners:

INSERT INTO Pet_Owners VALUES ('zw');
INSERT INTO Pet_Owners VALUES ('km');
INSERT INTO Pet_Owners VALUES ('rusdi');
INSERT INTO Pet_Owners VALUES ('zayne');
INSERT INTO Pet_Owners VALUES ('shannon');


--CareTakers:

INSERT INTO Care_Takers VALUES ('zw', 1);
INSERT INTO Care_Takers VALUES ('km', 2);
INSERT INTO Care_Takers VALUES ('rusdi', 3);
INSERT INTO Care_Takers VALUES ('zayne', 4);
INSERT INTO Care_Takers VALUES ('shannon', 5);

--Part_timer:

INSERT INTO Part_timer VALUES ('zw');
INSERT INTO Part_timer VALUES ('km');

--Full_timer:

INSERT INTO Full_timer VALUES ('zayne');
INSERT INTO Full_timer VALUES ('rusdi');
INSERT INTO Full_timer VALUES ('shannon');

--pet_categories
INSERT INTO pet_categories VALUES ('dog', 30);
INSERT INTO pet_categories VALUES ('cat', 20);
INSERT INTO pet_categories VALUES ('cockroach', 1);

--prefers
INSERT INTO prefers VALUES ('zw','cockroach');
INSERT INTO prefers VALUES ('zw','dog');
INSERT INTO prefers VALUES ('rusdi','cat');
INSERT INTO prefers VALUES ('km','dog');

--pets
INSERT INTO pets VALUES ('km_dog','dog','km','feed chocoloate');
INSERT INTO pets VALUES ('rusdi_cat','cat','rusdi','throw in water');
INSERT INTO pets VALUES ('zw_cockroach','cockroach','zw','step');
insert into pets (pet_name, category, pname, care_req) values ('gregor', 'dog', 'shannon', 'none');

--bids

insert into bids (pname, pet_name, cname, start_date, end_date, rating, is_selected, payment_amt, transaction_type, ranking, review) 
	  values ('shannon', 'gregor', 'zw', TO_DATE('1/10/2021', 'DD/MM/YYYY'), TO_DATE('10/10/2021', 'DD/MM/YYYY'), 1, true, 500, 'card', 2, 'good');

insert into bids (pname, pet_name, cname, start_date, end_date, rating, is_selected, payment_amt, transaction_type, ranking, review) 
	  values ('shannon', 'gregor', 'zw', TO_DATE('27/9/2021', 'DD/MM/YYYY'), TO_DATE('3/10/2021', 'DD/MM/YYYY'), 1, true, 7000, 'card', 2, 'good');

insert into bids (pname, pet_name, cname, start_date, end_date, rating, is_selected, payment_amt, transaction_type, ranking, review) 
	  values ('shannon', 'gregor', 'zw', TO_DATE('29/10/2021', 'DD/MM/YYYY'), TO_DATE('4/11/2021', 'DD/MM/YYYY'), 1, true, 70000, 'card', 2, 'good');


insert into bids (pname, pet_name, cname, start_date, end_date, rating, is_selected, payment_amt, transaction_type, ranking, review) 
	  values ('zw', 'zw_cockroach', 'shannon', TO_DATE('1/10/2021', 'DD/MM/YYYY'), TO_DATE('30/10/2021', 'DD/MM/YYYY'), 1, true, 300, 'card', 2, 'good');
insert into bids (pname, pet_name, cname, start_date, end_date, rating, is_selected, payment_amt, transaction_type, ranking, review) 
	  values ('rusdi', 'rusdi_cat', 'shannon', TO_DATE('1/10/2021', 'DD/MM/YYYY'), TO_DATE('30/10/2021', 'DD/MM/YYYY'), 1, true, 300, 'card', 2, 'good');
insert into bids (pname, pet_name, cname, start_date, end_date, rating, is_selected, payment_amt, transaction_type, ranking, review) 
	  values ('km', 'km_dog', 'shannon', TO_DATE('1/10/2021', 'DD/MM/YYYY'), TO_DATE('30/10/2021', 'DD/MM/YYYY'), 1, true, 300, 'card', 2, 'good');

--october 2021: 500 + 3000 + 30000
--september 2021: 4000
--november 2021: 40000 
--schedule

insert into Schedule select 'zw', generate_series(TO_DATE('1/10/2021', 'DD/MM/YYYY'), TO_DATE('3/10/2021', 'DD/MM/YYYY'),'1 day'::interval), 2;
insert into Schedule select 'zw', generate_series(TO_DATE('27/9/2021', 'DD/MM/YYYY'), TO_DATE('30/9/2021', 'DD/MM/YYYY'),'1 day'::interval), 1;
insert into Schedule select 'zw', generate_series(TO_DATE('4/10/2021', 'DD/MM/YYYY'), TO_DATE('10/10/2021', 'DD/MM/YYYY'),'1 day'::interval), 1;
insert into Schedule select 'zw', generate_series(TO_DATE('29/10/2021', 'DD/MM/YYYY'), TO_DATE('4/11/2021', 'DD/MM/YYYY'),'1 day'::interval), 1;

insert into Schedule select 'shannon', generate_series(TO_DATE('1/10/2021', 'DD/MM/YYYY'), TO_DATE('30/10/2021', 'DD/MM/YYYY'),'1 day'::interval), 3;












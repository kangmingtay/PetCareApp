CREATE TABLE IF NOT EXISTS Accounts (
    username VARCHAR(256),
    password VARCHAR(256) NOT NULL,
    email VARCHAR(256) NOT NULL ,
    address VARCHAR(256) NOT NULL,
    date_created DATE NOT NULL,
    is_admin BOOLEAN DEFAULT false,
    PRIMARY KEY (username),
    CONSTRAINT proper_email CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$') 
);

-- Implement covering & overlapping constraint 

CREATE TABLE IF NOT EXISTS Pet_Owners (
    username VARCHAR(256),
    FOREIGN KEY (username) REFERENCES Accounts(username) ON DELETE CASCADE,
    PRIMARY KEY (username)
);

CREATE TABLE IF NOT EXISTS Care_Takers (
    cname VARCHAR(256),
    rating NUMERIC CHECK (rating <= 5 AND rating > 0),
    FOREIGN KEY (cname) REFERENCES Accounts(username) ON DELETE CASCADE,
    PRIMARY KEY (cname)
);

CREATE TABLE IF NOT EXISTS Part_Timer (
    cname VARCHAR(256) REFERENCES Care_Takers(cname) ON DELETE CASCADE, 
    PRIMARY KEY (cname)
);

CREATE TABLE IF NOT EXISTS Availability (
    cname VARCHAR(256) REFERENCES Part_Timer(cname) ON DELETE CASCADE,
    date DATE,
    PRIMARY KEY(cname, date)
);

CREATE TABLE IF NOT EXISTS Full_Timer (
    cname VARCHAR(256) REFERENCES Care_Takers(cname) ON DELETE CASCADE, 
    PRIMARY KEY (cname)
);


CREATE TABLE IF NOT EXISTS Leaves (
    cname VARCHAR(256) REFERENCES Full_Timer(cname) ON DELETE CASCADE,
    date DATE,
    PRIMARY KEY(cname, date)
);

CREATE TABLE IF NOT EXISTS Pet_Categories (
    category VARCHAR(256),
    base_price NUMERIC,
    PRIMARY KEY (category)
);

CREATE TABLE IF NOT EXISTS Prefers (
    cname VARCHAR(256) REFERENCES Care_Takers(cname) ON DELETE CASCADE,
    category VARCHAR(256) REFERENCES Pet_Categories(category) ON DELETE CASCADE,
    PRIMARY KEY (cname, category)
);

CREATE TABLE IF NOT EXISTS Schedule (
    cname VARCHAR(256) REFERENCES Care_Takers (cname) ON DELETE CASCADE,
    date DATE,
    pet_count int,
    PRIMARY KEY (cname, date)
);

CREATE TABLE IF NOT EXISTS PCS_Administrator (
    username VARCHAR(256),
    salary numeric,
    FOREIGN KEY (username) REFERENCES Accounts(username) ON DELETE CASCADE,
    PRIMARY KEY (username)
);

CREATE TABLE IF NOT EXISTS Pets (
    pet_name VARCHAR(256),
    category VARCHAR(256) NOT NULL REFERENCES Pet_Categories(category) ON DELETE CASCADE,
    pname VARCHAR(256) NOT NULL REFERENCES Pet_Owners(username) ON DELETE CASCADE,
    care_req TEXT,
    PRIMARY KEY (pname, pet_name)
);

CREATE TABLE IF NOT EXISTS Bids (
    pname VARCHAR(256),
    pet_name VARCHAR(256), 
    cname VARCHAR(256),
    start_date DATE,
    end_date DATE,
    rating NUMERIC CHECK (rating <= 5 AND rating > 0),
    is_selected BOOLEAN,
    payment_amt NUMERIC, 
    transaction_type VARCHAR(30),
    review VARCHAR(256), 
    PRIMARY KEY(pname, pet_name, start_date, end_date),
    FOREIGN KEY (pname, pet_name) REFERENCES Pets(pname, pet_name) ON DELETE CASCADE,
    FOREIGN KEY (cname) REFERENCES Care_Takers(cname) ON DELETE CASCADE,
    CONSTRAINT start_before_end CHECK (end_date >= start_date)
);

-- CREATE VIEW as Catalogue (
--     -- displays available schedule + pet_category preference of a care taker 
--     -- complex query to get availability of care_takers based on schedule, prefers and bids
--     -- problem: catalogue dates between start and end dates in bids must not be included
--     -- <cname, category, date>
-- );
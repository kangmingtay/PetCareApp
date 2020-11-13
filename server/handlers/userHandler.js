const pool = require("../db");

const UTC__START_DATE = "1970-01-01";

async function handleGetAllUsers(req, res) {
    try {
        if (Object.keys(req.query).length !== 4) {
            throw Error("Missing request params");
        }

        // const start_date = (req.query.start_date === '') ? UTC__START_DATE : req.query.start_date;
        // const end_date = (req.query.end_date === '') ? new Date().toISOString().slice(0, 10) : req.query.end_date;
        const offset = (req.query.offset === '') ? 20 : req.query.offset;
        const limit = (req.query.offset === '') ? 0 : req.query.limit;
        const sort_category = (req.query.sort_category === '') ? 'username' : req.query.sort_category;
        const sort_direction = (req.query.sort_direction === "-") ? 'DESC' : 'ASC';

        const query = `
            SELECT username, email, address, date_created, is_admin 
            FROM accounts
            ORDER BY ${sort_category} ${sort_direction}
            LIMIT ${limit}
            OFFSET ${offset}`;
        const allUser = await pool.query(query);

        const resp = { results: allUser.rows };
        return res.status(200).json(resp);
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message,
        })
    }
}

async function handleGetUser(req, res) {
    try {
        const { username } = req.params;
        
        const query = `
            SELECT username, email, address, date_created, is_admin 
            FROM accounts 
            WHERE username = '${username.toLowerCase()}'`;
        const singleUser = await pool.query(query);
        let resp = { results: singleUser.rows};
        if (singleUser.rowCount === 0) {
            resp['message'] = "User does not exist!"
        }
        return res.status(200).json(resp);
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message,
        })
    }
}

async function handleCreateUser(req, res) {
    try {
        const { username, password, email, address, isAdmin } = req.body;
        
        const query = `INSERT INTO Accounts(username, password, email, address, date_created, is_admin) 
            VALUES ('${username.toLowerCase()}', '${password}', '${email}', '${address}', NOW(), '${isAdmin}')
        `;
        const createUser = await pool.query(query);
        let resp = {};
        if (createUser.rowCount === 1) {
            resp['message'] = "User created!"
            resp['success'] = true
        }
        return res.status(200).json(resp);
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message,
        })
    }
}

async function handleDeleteUser(req, res) {
    try {
        const { username } = req.params;
        const query = `DELETE FROM accounts WHERE username = '${username}'`;
        const deleteUser = await pool.query(query);
        let resp = {};
        if (deleteUser.rowCount === 1) {
            resp['message'] = "User deleted!"
        } else {
            resp['message'] = "User does not exist!"
        }
        return res.status(200).json(resp);
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message,
        })
    }
}

async function handleUpdateUser(req, res) {
    try {
        const { username } = req.params;
        const { email, address } = req.body;
        const query = `UPDATE accounts SET email = '${email}', address = '${address}' WHERE username = '${username}'`;
        const updateUser = await pool.query(query);
        let resp = {};
        if (updateUser.rowCount === 1) {
            resp['message'] = "User updated!"
        } else {
            resp['message'] = "User does not exist!"
        }
        return res.status(200).json(resp);
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message,
        })
    }
}

async function handleCheckUserType(req, res) {
    try {
        const { username } = req.params;
        const query = `
            SELECT 
                (SELECT 1 FROM pet_owners WHERE username = '${username}') AS "isPetOwner", 
                (SELECT 1 FROM care_takers WHERE cname = '${username}') AS "isCareTaker", 
                (SELECT 1 FROM full_timer WHERE cname = '${username}') AS "isFullTimer", 
                (SELECT 1 FROM part_timer WHERE cname = '${username}') AS "isPartTimer"
        `
        const getUserTypes = await pool.query(query);
        let resp = {}
        if (getUserTypes.rowCount === 1) {
            resp["results"] = {...getUserTypes.rows[0]};
            resp["success"] = true;
        }
        return res.status(200).json(resp);
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message
        })
    }
        
}

module.exports = {
    handleGetAllUsers,
    handleGetUser,
    handleCreateUser,
    handleDeleteUser,
    handleUpdateUser,
    handleCheckUserType
}
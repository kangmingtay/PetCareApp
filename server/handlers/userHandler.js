const pool = require("../db");

async function handleGetAllUsers(req, res) {
    try {
        const query = `SELECT username, email FROM accounts`;
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
        const query = `SELECT username, email FROM accounts where username = '${username}'`;
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
        const { username, password, email, isAdmin } = req.body;
        // if isAdmin = true, use trigger to insert into PCS admin table 
        const query = `INSERT INTO accounts VALUES ('${username}', '${password}', '${email}')`;
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

module.exports = {
    handleGetAllUsers,
    handleGetUser,
    handleCreateUser,
    handleDeleteUser,
}
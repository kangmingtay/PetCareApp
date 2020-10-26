const pool = require("../db");

async function handleGetAllUsers(req, res) {
    try {
        const query = `SELECT username, email FROM accounts`;
        const allUser = await pool.query(query);
        console.log(allUser);

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
        if (singleUser.rowCount == 0) {
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
        console.log(req.body)
        const { username, password, email } = req.body;
        const query = `INSERT INTO accounts VALUES ('${username}', '${password}', '${email}')`;
        const createUser = await pool.query(query);
        let resp = {};
        if (createUser.rowCount == 1) {
            resp['message'] = "User created!"
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
}
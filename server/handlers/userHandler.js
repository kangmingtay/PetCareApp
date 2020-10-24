const pool = require("../db");

async function handleGetAllUsers(req, res) {
    try {
        const query = `SELECT * FROM accounts`;
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

module.exports = {
    handleGetAllUsers
}
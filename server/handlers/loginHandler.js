const pool = require("../db");

async function handleLogin(req, res) {
    try {
        const { username, password } = req.body;
        console.log(req.body)
        const query = `SELECT * FROM accounts where username = '${username}'`;
        const singleUser = await pool.query(query);
        
        let resp = {}
        if (singleUser.rowCount == 0) {
            resp['message'] = "User does not exist!";
        } else if (password != singleUser.rows[0].password) {
            resp["message"] = "Invalid Password!";
        } else {
            resp["message"] = "Login Successful";
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
    handleLogin,
}
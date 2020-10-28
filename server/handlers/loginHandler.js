const pool = require("../db");

async function handleLogin(req, res) {
    try {
        const { username, password } = req.body;
        const query = `SELECT password, is_admin FROM accounts where username = '${username}'`;
        const singleUser = await pool.query(query);
        console.log(singleUser.rows)
        let resp = {success: false}
        if (singleUser.rowCount === 0) {
            resp["message"] = "User does not exist!";
        } else if (password !== singleUser.rows[0].password) {
            resp["message"] = "Invalid Password!";
        } else {
            resp["success"] = true;
            resp["message"] = "Login Successful";
            resp['isAdmin'] = singleUser.rows[0].is_admin;
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
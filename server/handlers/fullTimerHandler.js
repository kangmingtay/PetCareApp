const pool = require("../db");

async function handleCreateFullTimer(req, res) {
    try {
        const { username } = req.body;
        const query = `INSERT INTO Full_Timer(cname) VALUES ('${username}')`;
        const createFullTimer = await pool.query(query);
        let resp = {};
        if (createFullTimer.rowCount === 1) {
            resp['message'] = "Full Timer created!"
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

module.exports = {
    handleCreateFullTimer,
}
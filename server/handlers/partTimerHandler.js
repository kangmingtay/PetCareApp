const pool = require("../db");

async function handleCreatePartTimer(req, res) {
    try {
        const { username } = req.body;
        const query = `INSERT INTO Part_Timer(cname) VALUES ('${username}')`;
        const createPartTimer = await pool.query(query);
        let resp = {};
        if (createPartTimer.rowCount === 1) {
            resp['message'] = "Part Timer created!"
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
    handleCreatePartTimer,
}
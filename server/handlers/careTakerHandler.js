const pool = require("../db");

async function handleGetExpectedSalary(req, res) {
    try {
        const { username } = req.params;
        const query = `
            SELECT 
                to_char(date, 'MM-YYYY') mm_yyyy,
                CASE
                    WHEN '${username}' IN (SELECT username FROM part_timer) THEN SUM(payment_amt / (end_date - start_date + 1)) * 0.75
                    WHEN '${username}' IN (SELECT username FROM full_timer) AND COUNT(*) <= 60 THEN 3000
                    WHEN '${username}' IN (SELECT username FROM full_timer) THEN 3000 + (COUNT(*) - 60) / COUNT(*) * SUM(payment_amt / (end_date - start_date + 1)) * 0.8
                END salary,
                SUM(payment_amt / (end_date - start_date + 1)) revenue
            FROM Schedule NATURAL JOIN Bids
            WHERE cname = '${username}' AND date <= end_date AND date >= start_date AND is_selected 
            GROUP BY to_char(date, 'MM-YYYY')
            ORDER BY to_char(date, 'MM-YYYY');
        `;
        const monthlySalary = await pool.query(query);
        const resp = { 
            success: true,
            results: monthlySalary.rows 
        };
        return res.status(200).json(resp);
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message,
        })
    }
}

async function handleGetCareTakerCalendar(req, res) {
    try {
        const { username } = req.params;
        const query = `SELECT to_char(date, 'DD-MM-YYYY') date_, pname, pet_name
        FROM Schedule NATURAL JOIN Bids
        WHERE cname = '${username}' AND date <= end_date AND date >= start_date AND date >= current_date AND is_selected
        ORDER BY date ASC;`;
        const Calendar = await pool.query(query);
        const resp = { 
            success: true,
            results: Calendar.rows 
        };
        return res.status(200).json(resp);
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message,
        })
    }
}

module.exports = {
    handleGetExpectedSalary,
    handleGetCareTakerCalendar
}
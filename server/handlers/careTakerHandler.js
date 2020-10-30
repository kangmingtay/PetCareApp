const pool = require("../db");

/**
 * @Returns (Expected salary for that month, Revenue generated for that month) 
 */
async function handleGetExpectedSalary(req, res) {
    try {
        const { username } = req.params;
        const { month } = req.body; // needs to be in format MM-YYYY
        const query = `
            SELECT 
                --to_char(date, 'MM-YYYY') mm_yyyy,
                CASE
                    WHEN '${username}' IN (SELECT cname FROM part_timer) THEN SUM(payment_amt / (end_date - start_date + 1)) * 0.75
                    WHEN '${username}' IN (SELECT cname FROM full_timer) AND COUNT(*) <= 60 THEN 3000
                    WHEN '${username}' IN (SELECT cname FROM full_timer) THEN 3000.0 + 1.0 * (COUNT(*) - 60) / COUNT(*) * SUM(payment_amt / (end_date - start_date + 1)) * 0.8
                END salary,
                SUM(payment_amt / (end_date - start_date + 1)) revenue
            FROM Schedule NATURAL JOIN Bids
            WHERE cname = '${username}' AND date <= end_date AND date >= start_date AND is_selected 
            GROUP BY to_char(date, 'MM-YYYY')
            HAVING to_char(date, 'MM-YYYY') = '${month}';
            --ORDER BY to_char(date, 'MM-YYYY')
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


/**
 * @Returns (pet owner name, pet name) - list of pet appointments for given date.
 */
async function handleGetCareTakerCalendar(req, res) {
    try {
        const { username } = req.params;
        const { date } = req.body; // 'DD-MM-YYYY'
        const query = `SELECT pname, pet_name
        FROM Schedule NATURAL JOIN Bids
        WHERE cname = '${username}' AND date <= end_date AND date >= start_date AND date = TO_DATE('${date}','DD-MM-YYYY') AND is_selected
        `;
        const CareTakerCalendar = await pool.query(query);
        const resp = { 
            success: true,
            results: CareTakerCalendar.rows 
        };
        return res.status(200).json(resp);
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message,
        })
    }
}

async function handleGetLeaves(req, res) {
    try {
        const { username } = req.params;
        const { year } = req.body;
        const query = `
        SELECT to_char(date, 'DD-MM-YYYY') FROM leaves where to_char(date, 'YYYY') = '${year}' AND cname = '${username}'
        `;
        const leaves = await pool.query(query);
        const resp = { 
            success: true,
            results: leaves.rows 
        };
        return res.status(200).json(resp);
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message,
        })
    }
}

async function handleGetAvailability(req, res) {
    try {
        const { username } = req.params;
        const { year } = req.body;
        const query = `
        SELECT to_char(date, 'DD-MM-YYYY') FROM availability where cname = '${username}'
        `;
        const availability = await pool.query(query);
        const resp = { 
            success: true,
            results: availability.rows 
        };
        return res.status(200).json(resp);
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message,
        })
    }
}


/**
    Either update leaves or availability of a caretaker depending on full_timer or part_timer status
 */
async function handlerUpsertLeavesAvailability(req, res) {
    //disabling selection of dates before current year should be done in frontend.
    try {
        const { username } = req.params;
        const { dates } = req.body;
        //date array, dates should be this format: dates = '{1997-1-1, 1997-6-19, 1997-12-31}';
        const query = `
        SELECT specify_leaves('${username}'::VARCHAR(256), '${dates}'::date[])
        FROM full_timer
        WHERE cname = '${username}';
        
        SELECT specify_availability('${username}'::VARCHAR(256), '${dates}'::date[])
        FROM part_timer
        WHERE cname = '${username}';
        `;
        const Schedule = await pool.query(query);
        const resp = { 
            success: true,
            results: Schedule.rows 
        };
        return res.status(200).json(resp);
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message,
        })
    }
}

async function handleGetCategories(req, res) {
    try {
        const { username } = req.params;
        const query = `SELECT category FROM prefers WHERE cname = '${username}';`;
        const Categories = await pool.query(query);
        const resp = { 
            success: true,
            results: Categories.rows 
        };
        return res.status(200).json(resp);
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message,
        })
    }
}

async function handleDeleteCategory(req, res) {
    try {
        const { username } = req.params;
        const { category} = req.body;
        if (category == null) throw new Error("category is undefined");
        const query = `DELETE FROM prefers WHERE cname = '${username}' AND category = '${category}';`;
        await pool.query(query);
        const resp = { 
            success: true,
            message: `'${category}' has successfully been deleted from '${username}'`,
        };
        return res.status(200).json(resp);
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message,
        })
    }
}

async function handleUpdateCategory(req, res) {
    try {
        const { username } = req.params;
        const { category_from, category_to} = req.body;
        if (category_from == null || category_to == null) throw new Error("'category_from' and 'category_to' are undefined");
        const query = `UPDATE prefers SET category = '${category_to}' WHERE cname = '${username}' AND category = '${category_from}';`;
        await pool.query(query);
        const resp = { 
            success: true,
            message: `'${category_from}' has successfully been updated to '${category_to}'`,
        };
        return res.status(200).json(resp);
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message,
        })
    }
}

async function handleAddCategory(req, res) {
    try {
        const { username } = req.params;
        const { category} = req.body;
        if (category == null) throw new Error("category is undefined");
        const query = `INSERT INTO prefers(cname,category) VALUES ('${username}', '${category}');`;
        await pool.query(query);
        const resp = {
            success: true,
            message: `Added '${category}' successfully`,
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
    handleGetCareTakerCalendar,
    handlerUpsertLeavesAvailability,
    handleUpdateCategory,
    handleAddCategory,
    handleDeleteCategory,
    handleGetCategories,
    handleGetLeaves,
    handleGetAvailability
}
const pool = require("../db");

/**
 * GET: http://localhost:8888/api/caretakers/expectedSalary/zw?month=10-2021
 * @param {*} req.query.month = 'MM-YYYY' 
 * @Returns {salary: , revenue: }
 */
async function handleGetExpectedSalary(req, res) {
    try {
        const { username } = req.params;
        const month = req.query.month;
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
 * GET: http://localhost:8888/api/caretakers/calendar/shannon?date=02-10-2021
 * @param {*} req.query.date = 'DD-MM-YYYY' 
 * @Returns list of {pname: , pet_name: }
 */
async function handleGetCareTakerCalendar(req, res) {
    try {
        const { username } = req.params;
        const date = req.query.date;
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

/**
 * GET: http://localhost:8888/api/caretakers/leaves/shannon?year=2021
 * @param {*} req.query.year = 'YYYY' 
 * @Returns list of {leave: }
 */
async function handleGetLeaves(req, res) {
    try {
        const { username } = req.params;
        const year = req.query.year;
        const query = `
        SELECT to_char(date, 'DD-MM-YYYY') leave FROM leaves where to_char(date, 'YYYY') = '${year}' AND cname = '${username}'
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

/**
 * GET: http://localhost:8888/api/caretakers/availability/zw?year=2021
 * @param {*} req.query.year = 'YYYY' 
 * @Returns list of {available: }
 */
async function handleGetAvailability(req, res) {
    try {
        const { username } = req.params;
        const year = req.query.year;
        const query = `
        SELECT to_char(date, 'DD-MM-YYYY') available FROM availability where to_char(date, 'YYYY') = '${year}' AND cname = '${username}'
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
 * Either inserts leaves or availability of a caretaker depending on full_timer or part_timer status
 *
 * POST: http://localhost:8888/api/caretakers/requestDays/zw?dates={01-01-2023, 06-06-2023, 12-31-2023}
 * @param {*} req.query.dates = '{DD-MM-YYYY, DD-MM-YYY, DD-MM-YYYY....}' 
 */
async function handlerInsertLeavesAvailability(req, res) {
    //disabling selection of dates before current year should be done in frontend.
    try {
        const { username } = req.params;
        const dates = req.query.dates;
        // const { dates } = req.body;
        const query = `
        SELECT specify_leaves('${username}'::VARCHAR(256), '${dates}'::date[])
        FROM full_timer
        WHERE cname = '${username}';
        
        SELECT specify_availability('${username}'::VARCHAR(256), '${dates}'::date[])
        FROM part_timer
        WHERE cname = '${username}';
        `;
        await pool.query(query);
        const resp = { 
            success: true,
            message: "successfully applied dates",
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
 * Either deletes leaves or availability of a caretaker depending on full_timer or part_timer status
 *
 * DELETE: http://localhost:8888/api/caretakers/requestDays/zw?dates={01-01-2023, 06-06-2023, 12-31-2023}
 * @param {*} req.query.dates = '{DD-MM-YYYY, DD-MM-YYY, DD-MM-YYYY....}' 
 */
async function handlerDeleteLeavesAvailability(req, res) {
    //disabling selection of dates before current year should be done in frontend.
    try {
        const { username } = req.params;
        // const { dates } = req.body;
        const dates = req.query.dates;
        const query = `
        DELETE FROM leaves
            WHERE cname = '${username}' 
            AND date = ANY('${dates}'::date[])
            AND '${username}' IN (SELECT cname FROM full_timer)
            AND date > CURRENT_DATE;
        
        DELETE FROM availability
            WHERE cname = '${username}' 
            AND date = ANY('${dates}'::date[])
            AND date NOT IN (SELECT date FROM schedule WHERE cname = '${username}')
            AND '${username}' IN (SELECT cname FROM part_timer)
            AND date > CURRENT_DATE;
        `;
        await pool.query(query);
        const resp = { 
            success: true,
            message: "successfuly deleted dates",
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
 * GET: http://localhost:8888/api/caretakers/prefers/zw
 * @Returns list of {category: }
 */
async function handleGetPreferences(req, res) {
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

/**
 * DELETE: http://localhost:8888/api/caretakers/prefers/zw?category=dog
 * @param {*} req.query.category = 'pet_category' 
 */
async function handleDeletePreferences(req, res) {
    try {
        const { username } = req.params;
        const category = req.query.category;
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

/**
 * PUT: http://localhost:8888/api/caretakers/prefers/zw?category_from=dog&category_to=cat
 * @param {*} req.query.category_from = 'pet_category' 
 * @param {*} req.query.category_to = 'pet_category' 
 */
async function handleUpdatePreferences(req, res) {
    try {
        const { username } = req.params;
        const category_from = req.query.category_from;
        const category_to = req.query.category_to;
        // const { category_from, category_to} = req.body;
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

/**
 * POST: http://localhost:8888/api/caretakers/prefers/zw?category=dog
 * @param {*} req.query.category = 'pet_category' 
 */
async function handleCreatePreferences(req, res) {
    try {
        const { username } = req.params;
        const category = req.query.category;
        // const { category} = req.body;
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

/**
 * 
 */
async function handleSelectBid(req, res) {
    try {
        const { username } = req.params;
        const { pname, pet_name, start_date, end_date} = req.query;
        /**
         * check every day in between start_date and end_date is
         * full_timer: not in leaves
         * part_timer: not in 
         */
        const query = `INSERT INTO prefers(cname,category) VALUES ('${username}', '${category}');`;
        await pool.query(query);
        const resp = {
            success: true,
            message: `Selected bid successfully`,
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
    handlerInsertLeavesAvailability,
    handleUpdatePreferences,
    handleCreatePreferences,
    handleDeletePreferences,
    handleGetPreferences,
    handleGetLeaves,
    handleGetAvailability,
    handlerDeleteLeavesAvailability
}
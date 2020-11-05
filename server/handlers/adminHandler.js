const pool = require('../db');

// Count pet days in a month
async function handleGetPetDays(req, res) {
  try {
    const { month } = req.params;
    const { year } = req.params;
    const count = await pool.query(`
      SELECT SUM(pet_count) AS days FROM schedule 
      WHERE EXTRACT(MONTH FROM date) = ${month} 
        AND EXTRACT(YEAR FROM date) = ${year}`);
    res.json(count.rows);
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
}

// Count pet days for each caretaker in a month
async function handleGetCaretakerDays(req, res) {
  try {
    const { month } = req.params;
    const { year } = req.params;
    const count = await pool.query(`
      SELECT cname, COALESCE(days, 0) AS pet_days
      FROM care_takers NATURAL LEFT JOIN (SELECT cname, SUM(pet_count) AS days
        FROM schedule
        WHERE EXTRACT(MONTH FROM date) = ${month} 
          AND EXTRACT(YEAR FROM date) = ${year}
        GROUP BY cname) AS pet_days
      `);
    res.json(count.rows);
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
}

// Find distinct pets
async function handleGetPets(req, res) {
  try {
    const { month } = req.params;
    const { year } = req.params;
    const count = await pool.query(`
      SELECT DISTINCT pet_name FROM bids 
        WHERE (EXTRACT(MONTH FROM start_date) = ${month} OR EXTRACT(MONTH FROM end_date) = ${month}) 
        AND (EXTRACT(YEAR FROM start_date) = ${year} OR EXTRACT(YEAR FROM end_date) = ${year})`);
    res.json(count.rows);
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
}

// Find revenue for each caretaker
async function handleGetRevenue(req, res) {
  try {
    const { month } = req.params;
    const { year } = req.params;
    const count = await pool.query(`
      SELECT cname, COALESCE(salary, 0) salary, COALESCE(revenue, 0) revenue
      FROM care_takers NATURAL LEFT JOIN (
          SELECT cname, SUM(payment_amt / (end_date - start_date + 1)) revenue,
              CASE
                  WHEN cname IN (SELECT cname FROM part_timer) THEN SUM(payment_amt / (end_date - start_date + 1)) * 0.75
                  WHEN cname IN (SELECT cname FROM full_timer) AND COUNT(*) <= 60 THEN 3000
                  WHEN cname IN (SELECT cname FROM full_timer) THEN 3000.0 + 1.0 * (COUNT(*) - 60) / COUNT(*) * SUM(payment_amt / (end_date - start_date + 1)) * 0.8
              END salary
          FROM schedule NATURAL LEFT JOIN bids 
          WHERE date <= end_date AND date >= start_date AND is_selected
          GROUP BY cname, to_char(date, 'MM-YYYY')
          HAVING to_char(date, 'MM-YYYY') = '10-2021'
          ) AS revenue`);
    res.json(count.rows);
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
}

// Find rating for each caretaker
async function handleGetRating(req, res) {
  try {
    const count = await pool.query(`SELECT * FROM care_takers`);
    res.json(count.rows);
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
}

// Count pet days within one month
async function handleGetBidsInMonth(req, res) {
  try {
    const { cname } = req.params;
    const { start_date } = req.params;
    const { end_date } = req.params;
    const count = await pool.query(
      `SELECT * FROM bids WHERE cname = ${cname} AND is_selected = true AND end_date > ${month} AND start_date <= DATE($3) + interval '1 day'`,
      [cname, start_date, end_date]
    );
    res.json(count.rows);
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
}

// Count all bids within one month (including bids that are only partially within the month)
async function handleGetBidsInRange(req, res) {
  try {
    const { start_date } = req.params;
    const { end_date } = req.params;
    const count = await pool.query(
      "SELECT * FROM bids WHERE is_selected = true AND end_date > $1 AND start_date <= DATE($2) + interval '1 day'",
      [start_date, end_date]
    );
    res.json(count.rows);
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
}

// Count bids for one care taker within one month (including bids that are only partially within the month)
async function handleGetBidsForUser(req, res) {
  try {
    const { cname } = req.params;
    const { start_date } = req.params;
    const { end_date } = req.params;
    const count = await pool.query(
      "SELECT * FROM bids WHERE cname = $1 AND is_selected = true AND end_date > $2 AND start_date <= DATE($3) + interval '1 day'",
      [cname, start_date, end_date]
    );
    res.json(count.rows);
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
}

// Count bids for one care taker within one month (including bids that are only partially within the month)
async function handleGetPayment(req, res) {
  try {
    const { cname } = req.params;
    const { start_date } = req.params;
    const { end_date } = req.params;
    const count = await pool.query(
      'SELECT SUM(CASE ' +
        'WHEN end_date >= $3 AND start_date <= $2 THEN ($3::date - $2::date + 1) * payment_amt ' +
        'WHEN end_date <= $3 AND start_date > $2 THEN (end_date::date - start_date::date + 1) * payment_amt ' +
        'WHEN end_date <= $3 AND end_date >= $2 AND start_date <= $2 THEN (end_date::date - $2::date + 1) * payment_amt ' +
        'WHEN end_date >= $3 AND start_date <= $3 AND start_date >= $2 THEN ($3::date - start_date::date + 1) * payment_amt ' +
        'ELSE 0' +
        'END) AS salary ' +
        'FROM bids ' +
        'WHERE cname = $1 AND is_selected = true',
      [cname, start_date, end_date]
    );
    res.json(count.rows);
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
}

module.exports = {
  handleGetPetDays,
  handleGetCaretakerDays,
  handleGetPets,
  handleGetRevenue,
  handleGetRating,
  handleGetBidsInRange,
  handleGetBidsInMonth,
  handleGetBidsForUser,
  handleGetPayment,
};

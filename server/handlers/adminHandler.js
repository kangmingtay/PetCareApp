const pool = require('../db');

// Count pet days in a month
async function handleGetAllDays(req, res) {
  try {
    if (Object.keys(req.query).length !== 2) {
      throw Error('Missing request params');
    }
    var date = new Date();
    const month = req.query.month === '' ? date.getMonth() + 1 : req.query.month;
    const year = req.query.year === '' ? date.getFullYear() : req.query.year;
    const query = await pool.query(`
      SELECT COALESCE(SUM(pet_count), 0) AS days FROM schedule 
      WHERE EXTRACT(MONTH FROM date) = ${month} 
        AND EXTRACT(YEAR FROM date) = ${year}`);
    const resp = { results: query.rows };
    return res.status(200).json(resp);
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
}

// Count pet days for each caretaker in a month
async function handleGetPetDays(req, res) {
  try {
    if (Object.keys(req.query).length !== 2) {
      throw Error('Missing request params');
    }
    var date = new Date();
    const month = req.query.month === '' ? date.getMonth() + 1 : req.query.month;
    const year = req.query.year === '' ? date.getFullYear() : req.query.year;
    const query = await pool.query(`
      SELECT cname, COALESCE(days, 0) AS pet_days
      FROM care_takers NATURAL LEFT JOIN (SELECT cname, SUM(pet_count) AS days
        FROM schedule
        WHERE EXTRACT(MONTH FROM date) = ${month} 
          AND EXTRACT(YEAR FROM date) = ${year}
        GROUP BY cname) AS pet_days
      `);
    const resp = { results: query.rows };
    return res.status(200).json(resp);
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
    if (Object.keys(req.query).length !== 2) {
      throw Error('Missing request params');
    }
    var date = new Date();
    const month = req.query.month === '' ? date.getMonth() + 1 : req.query.month;
    const year = req.query.year === '' ? date.getFullYear() : req.query.year;
    const query = await pool.query(`
      SELECT DISTINCT pet_name, pname FROM bids 
        WHERE (EXTRACT(MONTH FROM start_date) = ${month} OR EXTRACT(MONTH FROM end_date) = ${month}) 
        AND (EXTRACT(YEAR FROM start_date) = ${year} OR EXTRACT(YEAR FROM end_date) = ${year})`);
    const resp = { results: query.rows };
    return res.status(200).json(resp);
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
    if (Object.keys(req.query).length !== 2) {
      throw Error('Missing request params');
    }
    var date = new Date();
    const month = req.query.month === '' ? date.getMonth() + 1 : req.query.month;
    const year = req.query.year === '' ? date.getFullYear() : req.query.year;
    const query = await pool.query(`
    SELECT SUM(COALESCE(salary, 0)) salary, SUM(COALESCE(revenue, 0)) revenue
    FROM
        (SELECT cname, COALESCE(SUM(payment_amt / (end_date - start_date + 1)), 0) revenue,
            CASE
                WHEN cname IN (SELECT cname FROM part_timer) THEN SUM(payment_amt / (end_date - start_date + 1)) * 0.75
                WHEN cname IN (SELECT cname FROM full_timer) AND COUNT(*) <= 60 THEN 3000
                WHEN cname IN (SELECT cname FROM full_timer) THEN 3000.0 + 1.0 * (COUNT(*) - 60) / COUNT(*) * SUM(payment_amt / (end_date - start_date + 1)) * 0.8
            END salary
        FROM schedule NATURAL JOIN bids 
        WHERE EXTRACT(MONTH FROM date) = ${month} AND EXTRACT(YEAR FROM date) = ${year}
            AND date <= end_date AND date >= start_date AND is_selected
        GROUP BY cname
    
        UNION 
    
        SELECT cname, 0 AS revenue, 
            CASE
                WHEN cname IN (SELECT cname FROM full_timer) THEN 3000
                ELSE 0
            END salary
        FROM
            (SELECT cname
            FROM care_takers
    
            EXCEPT
    
            SELECT cname
            FROM part_timer NATURAL JOIN schedule 
            WHERE EXTRACT(MONTH FROM date) = ${month} AND EXTRACT(YEAR FROM date) = ${year}) AS new) AS revenue`);

    const resp = { results: query.rows };
    return res.status(200).json(resp);
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
    const query = await pool.query(`SELECT * FROM care_takers`);
    const resp = { results: query.rows };
    return res.status(200).json(resp);
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
}

async function handleGetCaretakers(req, res) {
  try {
    if (Object.keys(req.query).length !== 2) {
      throw Error('Missing request params');
    }
    var date = new Date();
    const month = req.query.month === '' ? date.getMonth() + 1 : req.query.month;
    const year = req.query.year === '' ? date.getFullYear() : req.query.year;

    const query = `
      SELECT cname, email, COALESCE(days, 0) AS pet_days, COALESCE(salary, 0) salary, COALESCE(revenue, 0) revenue, rating, isFullTimer
      FROM
          (SELECT cname, email, rating
          FROM care_takers C LEFT JOIN accounts A ON C.cname = A.username
          ORDER BY username ASC) AS rating
      
      NATURAL LEFT JOIN
      
      (SELECT cname, SUM(pet_count) AS days
      FROM schedule
      WHERE EXTRACT(MONTH FROM date) = ${month}
          AND EXTRACT(YEAR FROM date) = ${year}
      GROUP BY cname)
      AS pet_days
      
      NATURAL LEFT JOIN
      


      (SELECT cname, COALESCE(SUM(payment_amt / (end_date - start_date + 1)), 0) revenue,
          CASE
              WHEN cname IN (SELECT cname FROM part_timer) THEN SUM(payment_amt / (end_date - start_date + 1)) * 0.75
              WHEN cname IN (SELECT cname FROM full_timer) AND COUNT(*) <= 60 THEN 3000
              WHEN cname IN (SELECT cname FROM full_timer) THEN 3000.0 + 1.0 * (COUNT(*) - 60) / COUNT(*) * SUM(payment_amt / (end_date - start_date + 1)) * 0.8
          END salary
      FROM schedule NATURAL JOIN bids 
      WHERE EXTRACT(MONTH FROM date) = ${month} AND EXTRACT(YEAR FROM date) = ${year}
          AND date <= end_date AND date >= start_date AND is_selected
      GROUP BY cname

      UNION 

      SELECT cname, 0 AS revenue, 
          CASE
              WHEN cname IN (SELECT cname FROM full_timer) THEN 3000
              ELSE 0
          END salary
      FROM
          (SELECT cname
          FROM care_takers

          EXCEPT

          SELECT cname
          FROM part_timer NATURAL JOIN schedule 
          WHERE EXTRACT(MONTH FROM date) = ${month} AND EXTRACT(YEAR FROM date) = ${year}) AS new) AS revenue



      NATURAL LEFT JOIN
      
      (SELECT cname, 1 AS isFullTimer FROM full_timer) AS fulltime`;
    const allUser = await pool.query(query);

    const resp = { results: allUser.rows };
    return res.status(200).json(resp);
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
}

// Find pets care for by a caretaker
async function handleGetCaredFor(req, res) {
  try {
    if (Object.keys(req.query).length !== 3) {
      throw Error('Missing request params');
    }
    var date = new Date();
    const month = req.query.month === '' ? date.getMonth() + 1 : req.query.month;
    const year = req.query.year === '' ? date.getFullYear() : req.query.year;
    const username = req.query.username;
    const query = await pool.query(`
      SELECT cname, pet_name, pname, COUNT(date) AS days
      FROM (SELECT DISTINCT cname, pet_name, pname, date
          FROM schedule NATURAL LEFT JOIN bids
          WHERE cname = '${username}'
          AND EXTRACT(MONTH FROM date) = ${month}
          AND EXTRACT(YEAR FROM date) = ${year}) AS pets
      GROUP BY cname, pet_name, pname`);
    const resp = { results: query.rows };
    return res.status(200).json(resp);
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
}

module.exports = {
  handleGetAllDays,
  handleGetPetDays,
  handleGetPets,
  handleGetRevenue,
  handleGetRating,
  handleGetCaretakers,
  handleGetCaredFor,
};

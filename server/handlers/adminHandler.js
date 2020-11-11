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
          HAVING to_char(date, 'MM-YYYY') = '${month}-${year}'
          ) AS revenue`);

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
      SELECT cname, email, COALESCE(days, 0) AS pet_days, COALESCE(salary, 0) salary, COALESCE(revenue, 0) revenue, rating
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
      
      (SELECT cname, SUM(payment_amt / (end_date - start_date + 1)) revenue,
          CASE
              WHEN cname IN (SELECT cname FROM part_timer) THEN SUM(payment_amt / (end_date - start_date + 1)) * 0.75
              WHEN cname IN (SELECT cname FROM full_timer) AND COUNT(*) <= 60 THEN 3000
              WHEN cname IN (SELECT cname FROM full_timer) THEN 3000.0 + 1.0 * (COUNT(*) - 60) / COUNT(*) * SUM(payment_amt / (end_date - start_date + 1)) * 0.8
          END salary
      FROM schedule NATURAL LEFT JOIN bids 
      WHERE date <= end_date AND date >= start_date AND is_selected
      GROUP BY cname, to_char(date, 'MM-YYYY')
      HAVING to_char(date, 'MM-YYYY') = '${month}-${year}'
      ) AS revenue`;
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

// // Count pet days within one month
// async function handleGetBidsInMonth(req, res) {
//   try {
//     const { cname } = req.params;
//     const { start_date } = req.params;
//     const { end_date } = req.params;
//     const count = await pool.query(`SELECT * FROM bids WHERE cname = ${cname} AND is_selected = true AND end_date > ${month} AND start_date <= DATE($3) + interval '1 day'`, [
//       cname,
//       start_date,
//       end_date,
//     ]);
//     res.json(count.rows);
//   } catch (err) {
//     return res.status(400).send({
//       success: false,
//       message: err.message,
//     });
//   }
// }

// // Count all bids within one month (including bids that are only partially within the month)
// async function handleGetBidsInRange(req, res) {
//   try {
//     const { start_date } = req.params;
//     const { end_date } = req.params;
//     const count = await pool.query("SELECT * FROM bids WHERE is_selected = true AND end_date > $1 AND start_date <= DATE($2) + interval '1 day'", [start_date, end_date]);
//     res.json(count.rows);
//   } catch (err) {
//     return res.status(400).send({
//       success: false,
//       message: err.message,
//     });
//   }
// }

// // Count bids for one care taker within one month (including bids that are only partially within the month)
// async function handleGetBidsForUser(req, res) {
//   try {
//     const { cname } = req.params;
//     const { start_date } = req.params;
//     const { end_date } = req.params;
//     const count = await pool.query("SELECT * FROM bids WHERE cname = $1 AND is_selected = true AND end_date > $2 AND start_date <= DATE($3) + interval '1 day'", [cname, start_date, end_date]);
//     res.json(count.rows);
//   } catch (err) {
//     return res.status(400).send({
//       success: false,
//       message: err.message,
//     });
//   }
// }

// // Count bids for one care taker within one month (including bids that are only partially within the month)
// async function handleGetPayment(req, res) {
//   try {
//     const { cname } = req.params;
//     const { start_date } = req.params;
//     const { end_date } = req.params;
//     const count = await pool.query(
//       'SELECT SUM(CASE ' +
//         'WHEN end_date >= $3 AND start_date <= $2 THEN ($3::date - $2::date + 1) * payment_amt ' +
//         'WHEN end_date <= $3 AND start_date > $2 THEN (end_date::date - start_date::date + 1) * payment_amt ' +
//         'WHEN end_date <= $3 AND end_date >= $2 AND start_date <= $2 THEN (end_date::date - $2::date + 1) * payment_amt ' +
//         'WHEN end_date >= $3 AND start_date <= $3 AND start_date >= $2 THEN ($3::date - start_date::date + 1) * payment_amt ' +
//         'ELSE 0' +
//         'END) AS salary ' +
//         'FROM bids ' +
//         'WHERE cname = $1 AND is_selected = true',
//       [cname, start_date, end_date]
//     );
//     res.json(count.rows);
//   } catch (err) {
//     return res.status(400).send({
//       success: false,
//       message: err.message,
//     });
//   }
// }

module.exports = {
  handleGetAllDays,
  handleGetPetDays,
  handleGetPets,
  handleGetRevenue,
  handleGetRating,
  handleGetCaretakers,
  // handleGetBidsInRange,
  // handleGetBidsInMonth,
  // handleGetBidsForUser,
  // handleGetPayment,
};

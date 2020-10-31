const pool = require("../db");

/**
 * @Query startDate, endDate (YYYY/MM/DD) and petCategory
 * @Returns List of caretakers whose schedule/availability fits that range
 */
async function handleGetListOfCTs(req, res) {
  try {
    console.log(req.query);

    const { startDate, endDate, petCategory} = req.query;

    const queryOverall = `
    SELECT cname
    FROM (
      SELECT DISTINCT F.cname, L.date
      FROM full_timer F, prefers P, (SELECT generate_series(TO_DATE('${startDate}', 'YYYY/MM/DD'), TO_DATE('${endDate}', 'YYYY/MM/DD'),'1 day'::interval) AS date) AS L
      WHERE F.cname = P.cname AND P.category = '${petCategory}'
      EXCEPT
      SELECT DISTINCT L1.cname, L1.date
      FROM leaves L1
      WHERE L1.date >= '${startDate}' AND L1.date <= '${endDate}'
      EXCEPT
      SELECT S.cname, S.date
      FROM schedule S
      WHERE S.pet_count = 5
    ) AS FT
    GROUP BY FT.cname
    HAVING DATE_PART('day', '${endDate}'::timestamp - '${startDate}'::timestamp)+1 = COUNT(*)
    UNION
    SELECT cname
    FROM (
      SELECT DISTINCT A.cname, A.date
      FROM availability A, prefers P
      WHERE A.date >= '${startDate}' AND A.date <= '${endDate}'
      AND P.cname = A.cname AND P.category = '${petCategory}'
      EXCEPT
      SELECT DISTINCT S.cname, S.date
      FROM schedule S
      WHERE S.pet_count = 2
    ) AS PT
    GROUP BY PT.cname
    HAVING DATE_PART('day', '${endDate}'::timestamp - '${startDate}'::timestamp)+1 = COUNT(*);
    `;

    const allCareTakers = await pool.query(queryOverall);

    const resp = { 
      success: true,
      results: allCareTakers.rows 
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
  handleGetListOfCTs
}
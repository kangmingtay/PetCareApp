const pool = require("../db");

/**
 * @Query startDate, endDate (YYYY/MM/DD) and petCategory
 * @Returns List of caretakers whose schedule/availability fits that range
 */
async function handleGetListOfCTs(req, res) {
  try {
    console.log(req.query);

    const { startDate, endDate, petCategory, cName} = req.query;

    const queryOverall = `
    SELECT cname
    FROM (
      SELECT DISTINCT F.cname, L.date
      FROM full_timer F, prefers P, (SELECT generate_series(TO_DATE('${startDate}', 'DD-MM-YYYY'), TO_DATE('${endDate}', 'DD-MM-YYYY'),'1 day'::interval) AS date) AS L
      WHERE F.cname = P.cname AND P.category LIKE '${petCategory}' AND P.cname LIKE '${cName}'
      EXCEPT
      SELECT DISTINCT L1.cname, L1.date
      FROM leaves L1
      WHERE L1.date >= TO_DATE('${startDate}', 'DD-MM-YYYY') AND L1.date <= TO_DATE('${endDate}', 'DD-MM-YYYY')
      EXCEPT
      SELECT S.cname, S.date
      FROM schedule S
      WHERE S.pet_count = 5
    ) AS FT
    GROUP BY FT.cname
    HAVING TO_DATE('${endDate}', 'DD-MM-YYYY') - TO_DATE('${startDate}', 'DD-MM-YYYY')+1 = COUNT(*)
    UNION
    SELECT cname
    FROM (
      SELECT DISTINCT A.cname, A.date
      FROM availability A, prefers P
      WHERE A.date >= TO_DATE('${startDate}', 'DD-MM-YYYY') AND A.date <= TO_DATE('${endDate}', 'DD-MM-YYYY')
      AND P.cname = A.cname AND P.category LIKE '${petCategory}' AND P.cname LIKE '${cName}'
      EXCEPT
      SELECT DISTINCT S.cname, S.date
      FROM schedule S
      WHERE S.pet_count = 2
    ) AS PT
    GROUP BY PT.cname
    HAVING TO_DATE('${endDate}', 'DD-MM-YYYY') - TO_DATE('${startDate}', 'DD-MM-YYYY')+1 = COUNT(*);
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
const pool = require("../db");

/**
 * Gets a list of caretakers that can take care of the petCategory, and given date range (optional cname input)
 * GET: http://127.0.0.1:8888/api/catalogue/?startDate=1-10-2021&endDate=1-10-2021&pName=p1&petCategory=%&cName=%
 * @param {startDate, endDate, petCategory, cName, pName} req.query Date(DD-MM-YYYY), petCategory(% for all), cName(% for all)
 */
async function handleGetListOfCTs(req, res) {
  try {
    console.log('cHandler',req.query);

    const { startDate, endDate, petCategory, cName, pName, address, petName } = req.query;

    const queryOverall = `
    WITH cte_valid_caretakers AS (
      SELECT cname
      FROM (
        SELECT DISTINCT F.cname, L.date
        FROM full_timer F, prefers P, accounts A, pets PET,
        (SELECT generate_series(TO_DATE('${startDate}', 'DD-MM-YYYY'), TO_DATE('${endDate}', 'DD-MM-YYYY'),'1 day'::interval) AS date) AS L
        WHERE F.cname = P.cname AND P.cname = A.username
        AND PET.pet_name = '${petName}' AND PET.pname = '${pName}'
        AND PET.category = P.category
        AND P.cname LIKE '${cName}'
        AND A.address LIKE '${address}' AND F.cname != '${pName}'
        AND NOT EXISTS (
          SELECT DISTINCT L1.date
          FROM leaves L1
          WHERE L.date = L1.date AND F.cname = L1.cname
          AND L1.date >= TO_DATE('${startDate}', 'DD-MM-YYYY') AND L1.date <= TO_DATE('${endDate}', 'DD-MM-YYYY')
        )
        AND NOT EXISTS (
          SELECT S.date
          FROM schedule S
          WHERE L.date = S.date AND F.cname = S.cname
          AND S.pet_count = 5
        )
      ) AS FT
      GROUP BY FT.cname
      HAVING TO_DATE('${endDate}', 'DD-MM-YYYY') - TO_DATE('${startDate}', 'DD-MM-YYYY')+1 = COUNT(*)
      UNION
      SELECT cname
      FROM (
        SELECT DISTINCT A.cname, A.date
        FROM availability A, prefers P, accounts AC, pets PET
        WHERE A.date >= TO_DATE('${startDate}', 'DD-MM-YYYY') AND A.date <= TO_DATE('${endDate}', 'DD-MM-YYYY')
        AND P.cname = A.cname AND A.cname = AC.username
        AND PET.pet_name = '${petName}' AND PET.pname = '${pName}'
        AND PET.category = P.category
        AND P.cname LIKE '${cName}'
        AND AC.address LIKE '${address}' AND P.cname != '${pName}'
        AND NOT EXISTS (
          SELECT DISTINCT S.cname
          FROM schedule S, care_takers C
          WHERE A.cname = S.cname AND S.date = A.date
          AND S.cname = C.cname AND ((C.rating <= 2 AND S.pet_count = 2) OR (C.rating > 2 AND S.pet_count = CEILING(C.rating)))
        )
      ) AS PT
      GROUP BY PT.cname
      HAVING TO_DATE('${endDate}', 'DD-MM-YYYY') - TO_DATE('${startDate}', 'DD-MM-YYYY')+1 = COUNT(*)
    )
    SELECT CVC.cname,
      CASE
        WHEN CT.rating IS NULL
          THEN -1
        ELSE
          ROUND(CT.rating::numeric, 2)
      END AS rating
    , P.category,
      CASE
        WHEN CT.rating IS NOT NULL
          THEN
          ROUND(PC.base_price + (PC.base_price * (CEILING(CT.rating) - 1) / 4)::numeric, 2)
          * (TO_DATE('${endDate}', 'DD-MM-YYYY') - TO_DATE('${startDate}', 'DD-MM-YYYY') + 1)
        ELSE
          ROUND(PC.base_price::numeric, 2) * (TO_DATE('${endDate}', 'DD-MM-YYYY') - TO_DATE('${startDate}', 'DD-MM-YYYY') + 1)
      END AS minprice,
      A.address
    FROM cte_valid_caretakers CVC, care_takers CT, prefers P, pet_categories PC, accounts A
    WHERE CVC.cname = CT.cname AND CT.cname = P.cname AND P.cname = A.username
    AND P.category = PC.category
    AND PC.category = (
      SELECT P1.category
      FROM pets P1
      WHERE '${petName}' = P1.pet_name
    )
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

/**
 * <For display in dropdown menu before being able to bid>
 * Gets a list of pets matching pname that are available to be put inside bid for that given date range
 * GET: http://127.0.0.1:8888/api/catalogue/p1?startDate=1-11-2021&endDate=1-11-2021
 * @param {pname} req.params
 * @param {startDate, endDate, petCategory} req.query Date(DD-MM-YYYY), petCategory(% for all)
 */
async function handleGetPetsForDateRange(req, res) {
  try {
    console.log(req.params, req.query);
    const { pname } = req.params;
    const { startDate, endDate } = req.query;
    console.log(pname, startDate);
    const query = `
    SELECT P.pet_name
      FROM pets P
      WHERE P.pname = '${pname}'
      AND P.pet_name NOT IN (
        SELECT B.pet_name
        FROM bids B
        WHERE P.pet_name = B.pet_name AND '${pname}' = B.pname
        AND ( (B.start_date <= TO_DATE('${endDate}', 'DD-MM-YYYY') AND B.end_date >= TO_DATE('${endDate}', 'DD-MM-YYYY')) 
        OR (TO_DATE('${startDate}', 'DD-MM-YYYY') <= B.end_date AND TO_DATE('${startDate}', 'DD-MM-YYYY') >= B.start_date)
        OR (TO_DATE('${startDate}', 'DD-MM-YYYY') <= B.start_date AND TO_DATE('${endDate}', 'DD-MM-YYYY') >= B.end_date) )
      )
      ;
    `;

    const allPetsForDateRange = await pool.query(query);

    const resp = { 
      success: true,
      results: allPetsForDateRange.rows 
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
 * (pet_name guaranteed to not be in bids(for that date range) category guaranteed to match both pet_name and care_taker's preference)
 * Checks if payment_amt bid by petowner matches base threshold price
 * of given category WITH multiplier added on based of the bidded caretaker's rating
 * 
 * PaymentAmt must be >= base_price + base_price * (CEILING(rating) - 1) / 4
 * 
 * If success, insert the bid
 * Else, raise exception
 * POST: http://127.0.0.1:8888/api/catalogue/cpt15
 * @param {cname} req.params
 * @param {startDate, endDate, pName, petName, paymentAmt, transactionType} req.body
 */
async function handleInsertBid(req, res) {
  try {
    console.log(req.params, req.body);
    const { cname } = req.params;
    const { startDate, endDate, pName, petName, paymentAmt, transactionType } = req.body;

    const query = `
    SELECT 
    check_valid_amount_before_insert('${pName}', '${petName}', '${cname}', '${startDate}', '${endDate}', '${paymentAmt}', '${transactionType}');
    `;

    const insertBid = await pool.query(query);
    let resp = {};
    if (insertBid.rowCount === 1) {
      resp['message'] = "Bid successfully inserted!"
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
  handleGetListOfCTs,
  handleGetPetsForDateRange,
  handleInsertBid
}
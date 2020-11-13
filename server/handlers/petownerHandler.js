const pool = require("../db");

async function handleUpdateReviewsAndRating(req, res) {
  try {
      const { pname } = req.params;
      const { review, rating, cname, pet_name, start_date, end_date} = req.body;
      console.log(req.params, req.query);
      const query = `UPDATE bids SET review = '${review}', rating = ${rating}
      WHERE pname = '${pname}' AND cname = '${cname}'
      AND pet_name = '${pet_name}' AND start_date = TO_DATE('${start_date}', 'DD-MM-YYYY')
      AND end_date = TO_DATE('${end_date}', 'DD-MM-YYYY');`;
      const updateResult = await pool.query(query);
      console.log(updateResult);
      let resp = {};
      if (updateResult.rowCount === 1) {
          resp = { 
              success: true,
              message: `Review and Rating has been successfully updated`,
          };
      } else 
          resp = { 
              success: false,
              message: `Error with insertion of review and rating`,
          };
      return res.status(200).json(resp);
  } catch (err) {
      return res.status(400).send({
          success: false,
          message: err.message,
      })
  }
}

async function handleGetPetsHistory(req, res) {
  try {
    console.log(req.params, req.query);
    const { pname } = req.params;
    const { currDate } = req.query;
    console.log(pname, currDate);
    const query = `
    SELECT B.pet_name, B.cname, B.start_date, B.end_date, B.rating, B.review
    FROM bids B
    WHERE B.pname = '${pname}' AND TO_DATE('${currDate}', 'DD-MM-YYYY') >= B.start_date AND B.is_selected = true;
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

module.exports = {
  handleUpdateReviewsAndRating,
  handleGetPetsHistory,
}
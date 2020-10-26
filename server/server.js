const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8888;

// configure routes
var loginRouter = require("./routes/login.js");
var userRouter = require("./routes/user.js");

// configure middleware
app.use(express.static("./public"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// initialise routes
app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World! Welcome to Furry Fantasy API Server!");
});

// Count all bids
app.get("/count", async (req, res) => {
  try {
    const count = await pool.query("SELECT * FROM bids");
    res.json(count.rows);
    console.log(count.rowCount);
  } catch (error) {
    console.error(error.message);
  }
});

// Count all bids within one month (including bids that are only partially within the month)
app.get("/count_in_range/:start_date/:end_date", async (req, res) => {
  try {
    const { start_date } = req.params;
    const { end_date } = req.params;
    const count = await pool.query(
      "SELECT * FROM bids WHERE is_selected = true AND end_date > $1 AND start_date <= DATE($2) + interval '1 day'",
      [start_date, end_date]
    );
    res.json(count.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Count bids for one care taker within one month (including bids that are only partially within the month)
app.get(
  "/count_care_taker_bids/:cname/:start_date/:end_date",
  async (req, res) => {
    try {
      const { cname } = req.params;
      const { start_date } = req.params;
      const { end_date } = req.params;
      const count = await pool.query(
        "SELECT * FROM bids WHERE cname = $1 AND is_selected = true AND end_date > $2 AND start_date <= DATE($3) + interval '1 day'",
        [cname, start_date, end_date]
      );
      res.json(count.rows);
    } catch (error) {
      console.error(error.message);
    }
  }
);

// Count bids for one care taker within one month (including bids that are only partially within the month)
app.get(
  "/count_care_taker_payment/:cname/:start_date/:end_date",
  async (req, res) => {
    try {
      const { cname } = req.params;
      const { start_date } = req.params;
      const { end_date } = req.params;
      const count = await pool.query(
        "SELECT SUM(CASE " +
          "WHEN end_date >= $3 AND start_date <= $2 THEN ($3::date - $2::date + 1) * payment_amt " +
          "WHEN end_date <= $3 AND start_date > $2 THEN (end_date::date - start_date::date + 1) * payment_amt " +
          "WHEN end_date <= $3 AND end_date >= $2 AND start_date <= $2 THEN (end_date::date - $2::date + 1) * payment_amt " +
          "WHEN end_date >= $3 AND start_date <= $3 AND start_date >= $2 THEN ($3::date - start_date::date + 1) * payment_amt " +
          "ELSE ('2015-12-25'::date - '2015-12-26'::date)" +
          "END) " +
          "FROM bids " +
          "WHERE cname = $1 AND is_selected = true",
        [cname, start_date, end_date]
      );
      res.json(count.rows);
    } catch (error) {
      console.error(error.message);
    }
  }
);

app.listen(port, () => {
  console.log(`Furry Fantasy server listening at http://localhost:${port}`);
});

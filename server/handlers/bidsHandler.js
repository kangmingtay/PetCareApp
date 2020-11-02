const pool = require("../db");

// Possible things care taker may want to see from bids

// Sort
// Payment_amont
// Start date(think u did this alr)
// End date
// Duration
// Payment_per_day
// Price_above_base_per_day (price per day more than the base price of pet)

// Filter
// Pet owner
// By month
// By year

const handleGetAllBids = async (req, res) => {
    try{
        const q = 'SELECT * FROM bids';
        const allBids = await pool.query(q);
        const resp = { results: allBids.rows };
        return res.status(200).json(resp);
    }
    catch(err) {
        return res.status(400).send({
            success: false,
            message: err.message   
        });
    }
}

const handleGetAllReviews = async (req, res) => {
    try{
        const q = 'SELECT cname, end_date, review FROM bids WHERE is_selected IS TRUE ORDER BY end_date DESC';
        const allReviews = await pool.query(q);
        const resp = { results: allReviews.rows };
        return res.status(200).json(resp);
    }
    catch(err) {
        return res.status(400).send({
            success: false,
            message: err.message  
        });
    }
}

const handleGetOneReview = async (req, res) => {
    try{
        const { username } = req.params;
        const q = `SELECT end_date, review FROM bids WHERE is_selected IS TRUE AND cname = '${username}' ORDER BY end_date DESC`;
        const oneReview = await pool.query(q);
        const resp = { results: oneReview.rows };
        return res.status(200).json(resp);
    }
    catch(err) {
        return res.status(400).send({
            success: false,
            message: err.message  
        });
    }
}

const handleGetPetOwnerBids = async (req, res) => {
    try{
        const { username } = req.params;
        const q = `SELECT * FROM bids WHERE pname = '${username}' ORDER BY end_date DESC`; 
        const pastOrders = await pool.query(q);
        const resp = { results: pastOrders.rows };
        return res.status(200).json(resp);
    }
    catch(err) {
        return res.status(400).send({
            success: false,
            message: err.message  
        });
    }
}

const handleGetCaretakerBids = async (req, res) => {
    try{
        const { username } = req.params;
        const q = `SELECT * FROM bids WHERE cname = '${username}' ORDER BY end_date DESC`; 
        const pastJobs = await pool.query(q);
        const resp = { results: pastJobs.rows };
        return res.status(200).json(resp);
    }
    catch(err) {
        return res.status(400).send({
            success: false,
            message: err.message  
        });
    }
}

// Possible things care taker may want to see from bids

// Sort
// Payment_amont
// Start date(think u did this alr)
// End date
// Duration
// Payment_per_day
// Price_above_base_per_day (price per day more than the base price of pet)

// Filter
// Pet owner
// By month
// By year

const handleGetCareTakerBidsSortByAnything = async (req, res) => {
    try{
        const { username, sort, order } = req.params;
        const q = `SELECT * FROM bids WHERE cname = '${username}' ORDER BY ${sort} ${order}`; 
        const pastJobs = await pool.query(q);
        const resp = { results: pastJobs.rows };
        return res.status(200).json(resp);
    }
    catch(err) {
        return res.status(400).send({
            success: false,
            message: err.message  
        });
    }
}

const handleGetCareTakerBidsFilterSortByAnything = async (req, res) => {
    try{
        const { username, filter, by, sort, order } = req.params;
        const q = `SELECT * FROM bids WHERE cname = '${username}' AND ${filter} = '${by}' ORDER BY ${sort} ${order}`; 
        const pastJobs = await pool.query(q);
        const resp = { results: pastJobs.rows };
        return res.status(200).json(resp);
    }
    catch(err) {
        return res.status(400).send({
            success: false,
            message: err.message  
        });
    }
}

const handleGetCareTakerBidsFilterByAnything = async (req, res) => {
    try{
        const { username, filter, by } = req.params;
        const q = `SELECT * FROM bids WHERE cname = '${username}' AND ${filter} = '${by}'`; 
        const pastJobs = await pool.query(q);
        const resp = { results: pastJobs.rows };
        return res.status(200).json(resp);
    }
    catch(err) {
        return res.status(400).send({
            success: false,
            message: err.message  
        });
    }
}

module.exports = {
    handleGetAllBids,
    handleGetAllReviews,
    handleGetOneReview,
    handleGetPetOwnerBids,
    handleGetCaretakerBids,
    handleGetCareTakerBidsSortByAnything,
    handleGetCareTakerBidsFilterByAnything,
    handleGetCareTakerBidsFilterSortByAnything
}
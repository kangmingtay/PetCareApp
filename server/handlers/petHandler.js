const pool = require("../db");

const handleCreatePet = async (req, res) => {
    try {
        const { username } = req.params;
        const petname = req.query.petName;
        const category = req.query.category;
        const care_req = req.query.care_req;
        const image = req.query.image;
        const query = `INSERT INTO pets VALUES ('${petname}', '${category}', '${username}', '${care_req}', '${image}')`;
        const createPet = await pool.query(query);
        let resp = {};
        if (createPet.rowCount === 1) {
            resp['message'] = `Pet ${petname} created!`
            resp['success'] = true
        }
        return res.status(200).json(resp);
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message,
        });
    }
}

const handleUpdatePet = async (req, res) => {
    try{
        const { pname, pet_name } = req.params;
        const tmp = await pool.query(`SELECT * FROM pets WHERE (pname, pet_name) = ('${pname}', '${pet_name}')`);
        const current = { results: tmp.rows};
        const category = (req.query.category === undefined) ? current.results[0].category : req.query.category;
        const care_req = (req.query.care_req === undefined) ? current.results[0].care_req : req.query.care_req;
        const image = (req.query.image === undefined) ? current.results[0].image : req.query.image;
        const query = `UPDATE pets SET category = '${category}', care_req = '${care_req}', image = '${image}' WHERE (pname, pet_name) = ('${pname}', '${pet_name}')`
        const updatePet = await pool.query(query);
        let resp = {};
        if (updatePet.rowCount === 1) {
            resp['message'] = `Pet ${pet_name} updated!`
            resp['success'] = true
        }
        return res.status(200).json(resp);
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message,
        });
    }
}

const handleGetPet = async (req, res) => {
    try{
        const { pname } = req.params;
        const query = `SELECT * FROM pets WHERE pname = '${pname}'`;
        const getPet = await pool.query(query);
        const resp = { results: getPet.rows };
        return res.status(200).json(resp);
    } catch(err) {
        return res.status(400).send({
            success: false,
            message: err.message,
        });
    }
}

const handleGetPetCategories = async (req, res) => {
    try{
        const query = 'SELECT category FROM pet_categories';
        const getCategories = await pool.query(query);
        const resp = { results: getCategories.rows };
        return res.status(200).json(resp);
    } catch(err) {
        return res.status(400).send({
            success: false,
            message: err.message,
        });
    }
}

const handleDeletePet = async (req, res) => {
    try{
        const { pname, petname} = req.params;
        const query = `DELETE FROM pets where (pet_name, pname) = ('${petname}', '${pname}')`
        const deletePet = await pool.query(query);
        let resp = {};
        if (deletePet.rowCount === 1) {
            resp['message'] = `Pet ${petname} deleted!`
            resp['success'] = true
        }
        return res.status(200).json(resp);
    } catch(err) {
        return res.status(400).send({
            success: false,
            message: err.message,
        });
    }
}

const handleGetPetInBids = async (req, res) => {
    try {
        const { pname, petname } = req.params
        const query = `SELECT * FROM bids WHERE (pname, pet_name) = ('${pname}', '${petname}')`
        const getBids = await pool.query(query);
        console.log(getBids.rows)
        let haveBids
        if (getBids.rowCount === 1) {
            haveBids = false
        } else {
            haveBids = true
        }
        const resp = { results: haveBids }
        return res.status(200).json(resp);
    } catch(err) {
        return res.status(400).send({
            success: false,
            message: err.message,
        });
    }
}

module.exports = {
    handleCreatePet,
    handleUpdatePet,
    handleGetPet,
    handleDeletePet,
    handleGetPetCategories,
    handleGetPetInBids
}
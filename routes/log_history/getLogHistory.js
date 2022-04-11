/*
    Path: /api/history
*/

const express = require('express'); // express library const

const router = express.Router(); // call router from express library

const { getHistory } = require('../../controllers/log_history/logHistoryController'); // file from folder controllers
const { validateJWT } = require('../../middlewares/validateJWT');


router.get('/:idus', validateJWT ,getHistory);


module.exports = router;
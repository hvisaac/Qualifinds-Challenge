const currencyController = require('../controllers/currencys');
const express = require ('express'); 

const router = express.Router();

router.get("/all", currencyController.findAllCurrencys);
router.get("/:id", currencyController.findByID);
router.post("/add", currencyController.addcurrency);

module.exports = router;
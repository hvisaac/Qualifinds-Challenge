const queryController = require('../controllers/querys');
const express = require ('express'); 

const router = express.Router();

router.get("/all", queryController.findAllQuerys);
router.get("/:id", queryController.findByID);
router.post("/add", queryController.addquery);

module.exports = router;
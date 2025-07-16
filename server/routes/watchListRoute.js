const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddlwere');
const watchListController = require('../controllers/watchListControllers');


 router.post('/addWatchList',authMiddleware, watchListController.addToWatchList);
 router.get('/getWatchList/:userId',authMiddleware, watchListController.getwatchList);
 router.delete('/removewatchList/:userId/:productId',authMiddleware, watchListController.removeWatchList);
  
 module.exports = router;

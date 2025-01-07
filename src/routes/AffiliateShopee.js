const express = require('express');
const AffiliateShopeeController = require('../controller/AffiliateShopeeController');
const router = express.Router();

router.get('/links-afiliado', AffiliateShopeeController.getLinks);

module.exports = router;
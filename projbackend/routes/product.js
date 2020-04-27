const express = require(express);

const router = express.Router();

//form other controller

const{isSignedIn,isAuthenticated,isAdmin} = require('../controllers/auth');

const{getUserById} = require('../controllers/user');

const{getProductById} = require('../controllers/product');


router.param('userId',getUserById);
router.param('productId',getProductById);


//actual routes

router.post('/product/create/:userId',isSignedIn ,isAuthenticated, isAdmin )

module.exports = router;
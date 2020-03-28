var express = require('express')
const { check , validationResult } = require('express-validator');

//for using the routes
var router = express.Router()

//Importing from controller

const {signout,signup} = require('../controllers/auth')

router.post('/signup',[
    check("name",'name should be atleast 5 char').isLength({ min:5 }),
    check('email','Email is required').isEmail(),
    check('password','Password should be 5 char').isLength({
        min:5
    }),
],signup)
router.get('/signout',signout)

module.exports = router;
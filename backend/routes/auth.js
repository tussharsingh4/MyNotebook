const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const router = express.Router()
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = 'TussharIsAmazing'

// ye pe post method se authentication banaya hai acche se
//create a user using POST "/api/auth/createuser" idhar user create karke auth me jana hai
//No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    //check whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email }) //ye promise hai isiliye yaha pe await dala. taki intezar karna pade
        if (user) {
            return req.status(400).json({success, error: "Sorry a user with this email already exist" })
        }// create a new user
        const salt = await bcrypt.genSalt(10) //ye bhi promise deta hai to rookne ke liye dena jaroori hai
        const secPas = await bcrypt.hash(req.body.password, salt) //await isiliye cz ye promise return karega

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPas
        })
        const data = { //yaha hum id le rahe hai bcz usse dhoondhna fastest hoga mongo se
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({success, authToken })
        //res.json(user)
    } catch (err) {
        console.log(error.message)
        res.status(500).send("Some error occurred")
    }
})

//Route-2Authenticate a user using "/api/auth/login"

router.post('/login', [
    body('email', 'Check email format').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success = false
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            success = false
            return res.status(400).json({ errors: "Login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            success=false
            return res.status(400).json({ errors: "Please login with correct credentials" })
        }
        const data = {
            user: {
                id: user.id,
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success=true
        res.json({success, authToken })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }

})

//Route 3 get logged in user's details using: POST "/api/auth/login" .login Required
//authtoken me id maujood hai usko nikalna hai. header bhej ke data nikalna hoga
//middlewar - function jo call hoga jab login wagerah ka request aega


router.post('/getuser', fetchUser, async (req, res) => {
    try {
        userId=req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server error")
    }

})

module.exports = router
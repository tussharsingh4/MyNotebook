var jwt = require('jsonwebtoken');
const JWT_SECRET = 'TussharIsAmazing'

const fetchUser = (req, res, next) =>{
    //get user from jwttoken and append and add id for the request
    const token = req.header('auth-Token') //jab request bhejunga to authtoken ke naam se bhejunga
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"})
    }

    try {
    const data  = jwt.verify(token, JWT_SECRET)
    req.user=data.user
    next()
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
}



module.exports=fetchUser;
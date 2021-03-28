const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.TOKEN_SECRET;

const checkAdmin = (req, res, next) => {
    // const token = req.cookies.jwt;
    const token = req.headers.cookie.slice(4);
    console.log(token);
    

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                //res.status(500).send('ERROR: Token received, but unable to connect to protected route.');
            } else {
                //res.status(200).send('SUCCESS: Connected to protected route');
                res.status(200);
                next();
            }
        });
    
    } else {
        res.status(403).send('Not logged in');
        /*
        re.status(200);
        next();
        */
    }

};

module.exports = checkAdmin;
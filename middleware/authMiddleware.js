// const jwt = require("jsonwebtoken");

// module.exports = (requiredRole) => (req, res, next) => {
//     try {
//         // Check for authorization header
//         const token = req.headers.authorization.split(" ")[1];
//         // Verify the token
//         // console.log(token,"this is token")
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'this is dummy text');
//         console.log(requiredRole,"requiredRole") 
//         // Store user data in the request object
//         req.userData = { userId: decodedToken.userId, userType: decodedToken.userType };
        
//         // Check if the user has the required role
//         if (requiredRole && decodedToken.userType !== 'customer') {
//             return res.status(403).json({
//                 message: 'Access forbidden: insufficient privileges'
//             });
//         }
        
//         // Proceed to the next middleware or route handler
//         next();
        
//     } catch (err) {
//         return res.status(401).json({
//             message: 'Authentication failed'
//         });
//     }
// }



// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         const decodedToken = jwt.verify(token, 'this is dummy text'); 
//         req.userData = { userId: decodedToken.userId };
//         if(decodedToken.userType == 'admin'){
//             next();
//         }
//         else{
//             return res.status(401).json({
//                 msg:'not admin'
//             })
//         }
//         // next();
//     } catch (err) {
//         return res.status(401).json({
//             message: 'Authentication failed'
//         });
//     }
// }


const jwt = require("jsonwebtoken");

module.exports = (requiredRole) => (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        req.userData = { userId: decodedToken.userId, userType: decodedToken.userType };

        // Check if the user has the required role (if specified)
        if (requiredRole && decodedToken.userType !== requiredRole) {
            return res.status(403).json({
                message: 'Access forbidden: insufficient privileges'
            });
        }

        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Authentication failed'
        });
    }
}

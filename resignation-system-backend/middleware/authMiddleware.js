

const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    // if(!token) return res.status(401).json({ message: 'Access Denied' });

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: 'Invalid Token'});
    }

    
};

exports.isHR = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized. Please login first.' });
    }
    
    if (req.user.role !== 'HR') {
        return res.status(403).json({ message: 'Access denied. Only HR can perform this action.' });
    }

    next();
}




// exports.isHR = (req,res,next) => {
//     if(req.user.role !== 'HR') return res.status(403).json({ message: 'Access denied' });
//     next();
// }
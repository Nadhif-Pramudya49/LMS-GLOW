const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        console.log(`Checking role: ${req.user.role} against required: ${roles}`);
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `Role ${req.user.role} is not authorized to access this resource` 
            });
        }
        next();
    };
};

const blacklist = new Set(); // Use a persistent store like Redis for production

// Middleware to check if the token is blacklisted
const checkBlacklist = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (blacklist.has(token)) {
        return res.status(401).json({ msg: 'Token has been blacklisted, please log in again.' });
    }
    next();
};

module.exports = { checkBlacklist, blacklist };

const roles = {
    admin: {
        permissions: ['read', 'write', 'delete','update']
    },
    customer: {
        permissions: ['read']
    }
};

const checkRole = (role) => {
    return (req, res, next) => {
        console.log(req.user.role)
        if (req.user && roles[req.user.role] && roles[req.user.role].permissions.includes(role)) {
            return next();
        } else {
            return res.status(403).send('Forbidden');
        }
    };
};

module.exports = {
    checkRole
};
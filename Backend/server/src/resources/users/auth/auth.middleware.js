const {errUnauthorized} = require ('../../../errors');
const auth =require('./auth.service');

const needsAuthToken = async (req,res,next) => {
    try {
        const header = req.headers['authorization'];
        if (!header) {
            errUnauthorized(`Missing auth header`);
        }
        if (!header.startsWith("Bearer ")) {
            errUnauthorized(`Authorization header doesn't strat with "Bearer"`);
        }
        const token = header.slice("Bearer ".length);
        const {email} = auth.decodeToken(token);
        req.userEmail=email;
        
        next();
    } catch(e) {
        next(e);
    }
}

module.exports = {
    needsAuthToken,
}
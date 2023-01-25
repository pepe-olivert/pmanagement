const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const JWT_SECRET = "topsecret"; 
const JWT_EXPIRATION = "1d";

const {errUnauthorized} =require ('../../../errors')


const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password,salt);
}

const comparePassword = async (password,dbPasword) => {
    return bcrypt.compare(password, dbPasword);
}

const createToken = (email,userType,uid,uname) => {
    const token = jwt.sign({email}, JWT_SECRET, {expiresIn: JWT_EXPIRATION});
    const utype= userType;
    
    return {
        accessToken: token,
        userType: userType,
        userid: uid,
        username: uname,
        tokenType: "Bearer",
        expiresIn: JWT_EXPIRATION,
    };

    
}

const decodeToken = (token) => {
    try{
        const result = jwt.verify (token,JWT_SECRET);
        return result;

    }
    catch(e) {
        switch(e.name){
            case "JsonWebTokenError":{
                errUnauthorized(`Ẁrong token`);
                break;
            }
            case "TokenExpiredError":{
                errUnauthorized(`Token expired` );
                break;
            }
            default:
                throw e;
        }
    }

    
}

module.exports = {
    encryptPassword,
    comparePassword,
    createToken,
    decodeToken,
}
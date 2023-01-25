//const { needsAuthToken } = require("./auth/auth.middleware");
const { catchErrors, TeamMgmtApiError } = require("../../errors");
const users = require("./users.service");



const login = async (req, res) => {
  const loginData = req.body;

  const token = await users.authenticateUser(loginData);
  res.status(200).json(token);
};

const register = async (req, res) => {
  const userData = req.body;
  try {
    console.log("user.controller - register");
    await users.createUser(userData);
  } catch (e) {
    switch (e.name) {
      case "MongoServerError": {
        switch (e.code) {
          case 11000:
            throw new TeamMgmtApiError(400, `User exists`);
          default:
            throw e;
        }
      }
      default:
        throw e;
    }
  }
  res.status(200).json({ status: `User created` });
};

const checkUserExists = async (req, res) => {
  const { username } = req.params;
  //TODO: authenticate user
  const userId = await users.findUserByUsername(username);
  res.status(200).json(userId);
};

const changepass = async (req, res) => {
 
  const  data  = req.body;

  //console.log(data);
  

  const cambiado = await users.cambiarContra(data)
  res.status(200).json(cambiado);

}


const addRoutesTo = (app) => {
  app.post("/login", catchErrors(login));
  app.post("/register", catchErrors(register));
  app.post("/changepass", catchErrors(changepass));
  app.get("/users/:username", catchErrors(checkUserExists));
  app.get("")

};

module.exports = {
  addRoutesTo,
};
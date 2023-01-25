const User = require('./users.model');


const auth = require('./auth/auth.service');
const { errMalformed, errUnauthorized } = require('../../errors');

const createUser = async ({ username, email, password: plaintextPassword, name, surname, rol }) => {

  const encryptedPassword = await auth.encryptPassword(plaintextPassword);
  console.log(`user.service - createUser: ${username}, ${email}, ${plaintextPassword}`)
  return await User.create({ username, email, password: encryptedPassword, name, rol });
}

const authenticateUser = async ({ email, password }) => {
  if (!email || !password) {
    errMalformed(`Missing email or password`);
  }
  const user = await User.findOne({ email }).select("+password").lean().exec();
  if (!user) {
    errUnauthorized(`Wrong email or password`);
  }
  const passwordMatches = await auth.comparePassword(password, user.password);
  if (!passwordMatches) {
    errUnauthorized(`Wrong email or password`);
  }

  const uid = JSON.stringify(user._id);

  const token = auth.createToken(email, user.rol, uid, user.username);
  return token;
}

const cambiarContra = async (data) => {

  const id = data.user;
  const password = data.oldPassword;
  const newPassword = data.newPassword;
  //console.log(data);

  if (!id || !password) {
    errMalformed(`Missing user or password`);
  }
  const user = await User.findOne({_id:id }).select("+password").lean().exec();
  console.log(user);
  if (!user) {
    errUnauthorized(`Wrong user or password`);
  }
  const passwordMatches = await auth.comparePassword(password, user.password);
  if (!passwordMatches) {
    errUnauthorized(`Wrong user or password`);
  }




  nueva = await auth.encryptPassword(newPassword);

  const correo = JSON.stringify(user.email);



  const filter = { email: user.email };

  const update = { password: nueva };

  const opts = { new: true };

  const doc = User.findOneAndUpdate(filter, update, opts);


  return doc;





}

const findUserByUsername = async (username) => {
  const user = await User.findOne({ username }).lean().exec();
  if (!user) {
    errUnauthorized(`Wrong email or password`);
  }
  return user._id;
}


module.exports = {
  createUser,
  authenticateUser,
  findUserByUsername,
  cambiarContra,
}
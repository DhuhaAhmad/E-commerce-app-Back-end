const User = require("../models/User");
const bcrypt = require("bcryptjs");
const NotExistEmailError = require("../utils/NotExistEmailError");
const WrongPasswordError = require("../utils/WrongPasswordError");
const {blacklist} = require("../middlewares/checkBlackList")

const createUser = async (firstName, lastName, email, password) => {
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("User is already Exist");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10); //generate random string of data
    hashedPassword = await bcrypt.hash(password, salt);

    const newUser = User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    return newUser;
  } catch (error) {
    throw new Error("Error creating user", error);
  }
};

const logIn = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new NotExistEmailError("This email is not exist");
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      throw new WrongPasswordError("Wrong password");
    }
    return user;
  } catch (error) {
    throw new Error("Login failed: " + error.message);
  }
};

const logOut = async (token) => {
  if (token) {
    blacklist.add(token); //adding token to blacklist
    console.log(blacklist)

    return { success: true, msg: "Logged out successfully" };
  }

  return { success: false, msg: "No token provided" };
};

module.exports = {
  createUser,
  logIn,
  logOut
};

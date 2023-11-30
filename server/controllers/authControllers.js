const User = require("../models/user");
const { hashPassword, comparePasswords } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json("test is working");
};

//register endpoint

const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      userType,
      language,
    } = req.body;

    //basic checks to see if required fields are empty
    if (
      !firstName ||
      !lastName ||
      !username ||
      !password ||
      !email ||
      !userType
    ) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields." });
    }

    //using bcrypt to hash the password, this function is in the helpers folder
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      userType,
      language,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

//login endpoint
const loginUser = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    let email, username;
    //checking if the response is a email or username
    if (usernameOrEmail.includes("@")) {
      email = usernameOrEmail;
    } else {
      username = usernameOrEmail;
    }

    // check if user or email exists
    const user =
      (await User.findOne({ username })) || (await User.findOne({ email }));

    if (!user) {
      return res.json({
        error: "No user with that username/email found",
      });
    }

    //check if passwords match
    const match = await comparePasswords(password, user.password);

    if (!match) {
      res.json({
        error: "passwords don't match",
      });
    }

    //if the passwords match, set the jwt
    if (match) {
      jwt.sign(
        {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          userType: user.userType,
          language: user.language,
          id: user._id,
        },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

//getProfile endpoint, using jwt to verify user
const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
};

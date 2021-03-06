const User = require("../model/user");
const bycrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res) => {
  try {
    //get user input
    const { first_name, last_name, email, password, role } = req.body;
    // validate user input
    if (!(first_name && last_name && email && password)) {
      res.status(400).send("All inputs are required");
    }
    // check if user already exists
    const oldUser = await User.findOne({ email });
    // if (oldUser) {
    //   //   res.status(409).send("User already exists. Please login");
    // }

    // encrypt user password
    const encryptedPassword = await bycrypt.hash(password, 10);

    // create user into database

    const user = await User.create({
      first_name,
      last_name,
      role,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    // create token

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    //save user token
    user.token = token;
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};

// login api
exports.signin = async (req, res) => {
  try {
    // get user input
    const { email, password } = req.body;
    // validate user input
    if (!(email, password)) {
      res.status(409).send("Inputs required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });
    if (user && (await bycrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      res.status(200).send(user);
    }
    res.status(400).send("Invalid credentials");
  } catch (error) {
    console.log(error);
  }
};

// welcome api

exports.welcome = async (req, res) => {
  res.status(200).send("Welcome 🙌");
};

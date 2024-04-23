const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//steps
//Existing user check
//Hashed passwords
//User credentials
//Token Generate

//To get all users
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  res.status(200).json(users);
};

//To get one user
const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

//signup user
const signupUser = async (req, res) => {
  const { username, email, password, userType, secretKey } = req.body;
  // if(req.file)
  // {
  // Access uploaded file from req.file
  // }

  try {
    const user = await User.signup(
      username,
      email,
      password,
      userType,
      secretKey
    );

    //create a token
    const token = createToken(user._id);
    res.status(200).json({ user: user, token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.loginUser(email, password);

    //create token
    // if(user)
    // {
        if (!user) {
            return res.status(401).json({ error: "Incorrect credentials" });
          }
      
          // If password verification fails, return an error
          const match = await bcrypt.compare(password, user.password);
          if (!match) {
            return res.status(401).json({ error: "Incorrect password" });
          }
      
          // If both email/secretKey and password are correct, generate token
          const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.SECRET
          );
      
          res.status(200).json({ user: user, token: token });
    // }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//login college
const loginCollege = async (req, res) => {
  const { email, password, secretKey } = req.body;

  try {
    const user = await User.loginCollege(email, password, secretKey);
    // If user is null, it means either email or secretKey is incorrect
    if (!user) {
      return res.status(401).json({ error: "Incorrect credentials" });
    }

    // If password verification fails, return an error
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // If both email/secretKey and password are correct, generate token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.SECRET
    );

    res.status(200).json({ user: user, token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update profile
const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Check if a file for user profile was uploaded
    if (req.file) {
      updateData.userProfile = req.file.filename;
    }

    // console.log("Update data", updateData)

    const user = await User.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
    });
    if (!user) {
      return res.status(400).json({ error: "No such user" });
    }

    // Generate token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.SECRET
    );

    res.status(200).json({ user: user, token: token });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { id } = req.params; // Assuming userId is passed as a URL parameter
    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Increment the registered field by 1
    user.registered += 1;
    // Save the updated user document
    await user.save();
    // Send a success response
    res
      .status(200)
      .json({ message: "User registration count updated successfully" });
  } catch (error) {
    console.error("Error updating user registration count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  signupUser,
  loginUser,
  loginCollege,
  getUsers,
  getUser,
  updateProfile,
  registerUser,
};

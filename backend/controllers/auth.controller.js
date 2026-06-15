const jwt = require("jsonwebtoken")



const user = require("../modules/user.modules.js")
const bcrypt = require("bcryptjs");
const User = require("../modules/user.modules.js");

//-----------------------------------------New user Register user-----------------------------
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //---------------- Check existing user
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    //------------------------------ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


//---------------------------------------Login USER ------------------------------------


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ------------------Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // ------------------------Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // ------------------------Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//---------------------------------logout -------------------------------------------


const logout = (req, res) => {
  try {
    // 1. Clear the token cookie
    res.clearCookie('token'); 
    
    // 2. Send success response
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};







module.exports = {
  registerUser,
  loginUser,
  logout,
};
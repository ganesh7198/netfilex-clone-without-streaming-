import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../Utils/generateToken.js";

export const signupController = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    // 1️⃣ Required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide full information",
      });
    }

    // 2️⃣ Normalize input
    username = username.trim();
    email = email.toLowerCase().trim();

    // 3️⃣ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // 4️⃣ Password validation
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // 5️⃣ Username validation
    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({
        success: false,
        message: "Username must be 3–20 characters",
      });
    }

    // 6️⃣ Check existing user (single query 🔥)
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    // 7️⃣ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 8️⃣ Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      image: "https://i.imgur.com/6VBx3io.png",
    });
	
		generateTokenAndSetCookie(newUser._id,res);


    // 9️⃣ Safe response
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        image: newUser.image,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error, please try again later",
    });
  }
};


export const loginController = async (req, res) => {
  try {
    let { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2️⃣ Normalize email
    email = email.toLowerCase().trim();

    // 3️⃣ Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // 4️⃣ Find user (SAME DOCUMENT)
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 5️⃣ Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 6️⃣ Generate JWT
    generateTokenAndSetCookie(user._id, res);

    // 7️⃣ Success response
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        image: user.image,
      },
    });
  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const logoutController=async(req,res)=>{
    try{
		res.clearCookie("jwt-netflix");
		res.status(201).json({sucess:true,message:"logout sucessfully"});

	}catch(error){
          console.log('error on the logoutcontroller',error.message)
		  res.status(500).json({sucess:false,message:"internal server error"});
	}
}
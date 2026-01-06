import jwt from "jsonwebtoken";
import User from "../Models/user.model.js"

export const protectedRoute = async (req, res, next) => {
  try {
    // 1️⃣ Get token from cookies
    const token = req.cookies["jwt-netflix"];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded = { userId, iat, exp }
    if (!decoded?.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }

    // 3️⃣ Find user in DB
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found",
      });
    }

    // 4️⃣ Attach user to request
    req.user = user;

    // 5️⃣ Continue
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Token expired or invalid",
    });
  }
};

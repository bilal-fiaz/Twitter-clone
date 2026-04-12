import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // to get this we need to use cookie-parser middleware in our server.js file
    if (!token) {
      return res.status(401).json({
        error: "Not authorized, no token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        error: "Not authorized, invalid token ",
      });
    };
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({
        error: "Not authorized, user not found",
      });
    };
    req.user = user; // to make the user data available in the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

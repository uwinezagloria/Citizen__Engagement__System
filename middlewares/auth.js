import jwt from "jsonwebtoken";
import customError from "./customError.js";

// Middleware to check if user is authenticated
const auth = (req, res, next) => {
  // Get token from headers
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new customError("No token provided", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user to request
    next();
  } catch (error) {
    return next(new customError("Invalid token", 401));
  }
};

export default auth;

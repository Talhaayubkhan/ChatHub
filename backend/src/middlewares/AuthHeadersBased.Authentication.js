/**
 * Authentication Middleware
 * Handles user authentication for HTTP requests and Socket.IO connections
 */

import { BadRequest, Unauthenticated, Unauthorized } from "../errors/index.js";
import { User } from "../models/User.Models.js";
import { verifyJWT } from "../utils/index.js";

/**
 * Middleware to authenticate users via Bearer token or signed cookies
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
const isAuthenticated = async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  // Extract token from Authorization header or signed cookies
  token =
    authHeader && authHeader.startsWith("Bearer")
      ? authHeader.split(" ")[1]
      : req.signedCookies.token;

  if (!token) {
    throw new Unauthenticated("Authentication failed: No token provided");
  }

  try {
    const checkTokenPayload = verifyJWT(token);

    if (!checkTokenPayload?.userId) {
      throw new Unauthenticated("Authentication failed: Invalid token payload");
    }

    const userId = checkTokenPayload.userId;

    if (!userId) {
      throw new Unauthenticated("Authentication failed: Invalid token payload");
    }
    
    req.user = { userId };

    next();
  } catch (error) {
    throw new Unauthenticated("Authentication failed. Please login again.");
  }
};

/**
 * Socket.IO authentication middleware
 * Authenticates socket connections using JWT tokens from cookies
 * @param {Error} err - Error from cookie parser
 * @param {Socket} socket - Socket.IO socket object
 * @param {Function} next - Socket.IO next middleware function
 */
const socketAuthentication = async (err, socket, next) => {
  try {
    if (err) {
      return next(err);
    }
    
    const authSocket = socket.request.signedCookies?.token;
    
    if (!authSocket) {
      return next(
        new Unauthenticated("Authentication failed: No token provided.")
      );
    }

    let socketTokenDecoded;
    try {
      socketTokenDecoded = verifyJWT(authSocket, process.env.JWT_SECRET);
    } catch (tokenError) {
      console.error(
        "Invalid Token during socket authentication:",
        tokenError?.message
      );
      return next(
        new Unauthorized("Authentication failed: Invalid or expired token.")
      );
    }

    const { userId } = socketTokenDecoded;
    
    if (!userId) {
      console.error(
        "Socket Authentication Failed: No userId in the token payload."
      );
      return next(
        new Unauthenticated("Authentication failed: Invalid token payload.")
      );
    }

    const user = await User.findById(userId);
    
    if (!user) {
      console.error(
        "Socket Authentication Failed: User not found for the provided token."
      );
      return next(new Unauthorized("Authentication failed: User not found."));
    }

    socket.user = user;

    return next();
  } catch (error) {
    console.error("Error during socket authentication:", error.message);
    return next(new BadRequest("Authentication failed. Please try again."));
  }
};

export { isAuthenticated, socketAuthentication };

import { BadRequest, Unauthenticated, Unauthorized } from "../errors/index.js";
import { User } from "../models/User.Models.js";
import { verifyJWT } from "../utils/index.js";

const isAuthenticated = async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  token =
    authHeader && authHeader.startsWith("Bearer")
      ? authHeader.split(" ")[1]
      : req.signedCookies.token;
  // console.log("Received Token:", token); // Add this log

  if (!token) {
    // console.log("No token found");
    throw new Unauthenticated("Authentication failed: No token provided");
  }

  try {
    const checkTokenPayload = verifyJWT(token);
    // console.log("Token Payload:", checkTokenPayload);

    if (!checkTokenPayload?.userId) {
      // console.log("Invalid user ID in token payload");
      throw new Unauthenticated("Authentication failed: Invalid token payload");
    }

    const userId = checkTokenPayload.userId;

    if (!userId) {
      // console.log("No user ID found in token payload");
      throw new Unauthenticated("Authentication failed: Invalid token payload");
    }
    req.user = { userId };

    next();
  } catch (error) {
    // console.error("Error during token verification:", error.message);
    throw new Unauthenticated("Authentication failed. Please login again.");
  }
};

const socketAuthentication = async (err, socket, next) => {
  try {
    if (err) {
      return next(err);
    }
    const authSocket = socket.request.signedCookies?.token;
    if (!authSocket) {
      // console.warn(
      //   "Socket Authentication Failed: No token provided in signed cookies"
      // );
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
    // console.info(
    //   `Socket Authentication Success: User ${user.name} authenticated successfully.`
    // );

    return next();
  } catch (error) {
    console.error("Error during socket authentication:", error.message);
    return next(new BadRequest("Authentication failed. Please try again."));
  }
};

export { isAuthenticated, socketAuthentication };

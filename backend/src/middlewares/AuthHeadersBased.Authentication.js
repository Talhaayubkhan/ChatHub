import { Unauthenticated, Unauthorized } from "../errors/index.js";
import { verifyJWT } from "../utils/index.js";

const isAuthenticated = async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  token =
    authHeader && authHeader.startsWith("Bearer")
      ? authHeader.split(" ")[1]
      : req.signedCookies.token;
  console.log("Received Token:", token); // Add this log

  if (!token) {
    console.log("No token found");
    throw new Unauthenticated("Authentication failed: No token provided");
  }

  try {
    const checkTokenPayload = verifyJWT(token);
    console.log("Token Payload:", checkTokenPayload);
    if (
      !checkTokenPayload ||
      typeof checkTokenPayload !== "object" ||
      !checkTokenPayload.userId ||
      !checkTokenPayload?.user?.userId
    ) {
      console.log("Invalid user ID in token payload");
      throw new Unauthenticated("Authentication failed: Invalid token payload");
    }

    const userId = checkTokenPayload?.user?.userId;
    if (!userId) {
      console.log("No user ID found in token payload");
      throw new Unauthenticated("Authentication failed: Invalid token payload");
    }
    req.user = { userId };

    next();
  } catch (error) {
    onsole.error("Error during token verification:", error.message);
    throw new Unauthenticated("Authentication failed. Please login again.");
  }
};

//  Middleware to restrict access based on user roles
// const authPermisson = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user?.role)) {
//       throw new Unauthorized("You are not Access to this resource!");
//     }
//     next();
//   };
// };

export { isAuthenticated };

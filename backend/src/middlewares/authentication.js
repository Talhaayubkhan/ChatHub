import { Unauthenticated, Unauthorized } from "../errors/index.js";
import { verifyJWT } from "../utils/index.js";
// import jwt from "jsonwebtoken";

const isAuthenticatedUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new Unauthenticated("Authentication token Invalid!");
  }

  try {
    const decodedToken = await verifyJWT(token);
    // console.log(decodedToken);
    if (!decodedToken) {
      throw new Unauthenticated("Token is Invalid!, try again");
    }

    req.user = {
      name: decodedToken.name,
      userId: decodedToken.userId,
      role: decodedToken.role,
    };
    next();
  } catch (error) {
    throw new Unauthenticated(
      "Error while Authenticating Token: " + error.message
    );
  }
};

//  Middleware to restrict access based on user roles
const authorizedPermission = (...roles) => {
  // Check if user's role is included in the list of allowed roles
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new Unauthorized({
        success: false,
        message: "Only Admin can access this resource",
      });
    }
    next();
  };
};

export { isAuthenticatedUser, authorizedPermission };

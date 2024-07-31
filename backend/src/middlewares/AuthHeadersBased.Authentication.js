import { Unauthenticated, Unauthorized } from "../errors/index.js";
import { verifyJWT } from "../utils/index.js";

const isAuthenticated = async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split("")[1];
  } else if (req.signedCookies.token) {
    token = req.signedCookies.token;
  }
  console.log("Token:", token);

  if (!token) {
    throw new Unauthenticated("Authentication Token Invalid");
  }

  try {
    const checkTokenPayload = verifyJWT(token);
    console.log(checkTokenPayload);

    const userId = checkTokenPayload?.user?.userId || checkTokenPayload?.user;
    if (!userId) {
      throw new Unauthenticated("Invalid user ID");
    }
    req.user = {
      userId,
    };

    next();
  } catch (error) {
    throw new Unauthenticated(
      "Error while verifying authentication token: " + error.message
    );
  }
};

//  Middleware to restrict access based on user roles
const authPermisson = (...roles) => {
  return (req, res, next) => {
    // console.log(req.user?.role);
    if (!roles.includes(req.user?.role)) {
      throw new Unauthorized("You are not Access to this resource!");
    }
    next();
  };
};

export { isAuthenticated, authPermisson };

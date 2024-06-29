import { Unauthenticated, Unauthorized } from "../errors/index.js";
import { verifyJWT } from "../utils/index.js";

const isAuthenticated = async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  } else {
    throw new Unauthenticated("You must be logged in");
  }

  if (!token) {
    throw new Unauthenticated("Authentication Token Invalid");
  }

  try {
    const checkTokenPayload = verifyJWT(token);
    // console.log(checkTokenPayload);
    if (!checkTokenPayload) {
      throw new Unauthenticated("Payload Token Invalid");
    }

    const userId = checkTokenPayload.user?.userId || checkTokenPayload?.userId;
    const role = checkTokenPayload.user?.role || checkTokenPayload?.role;

    if (!userId && !role) {
      throw new Unauthenticated("Invalid Payload Token ");
    }
    req.user = {
      userId,
      role,
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

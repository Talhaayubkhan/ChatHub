import { Unauthenticated, Unauthorized } from "../errors/index.js";
import { verifyJWT } from "../utils/index.js";

const isAuthenticated = async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  if (authHeader || authHeader.startsWith("Bearer ")) {
    token = authHeader.split("")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  } else {
    throw new Unauthenticated("Authentication header Invalid");
  }

  if (!token) {
    throw new Unauthenticated("Authentication Token Invalid");
  }

  try {
    const checkTokenPayload = verifyJWT(token);
    if (!checkTokenPayload) {
      throw new Unauthenticated("Payload Token Invalid");
    }
    req.user = {
      userId: checkTokenPayload.user?.userId,
      role: checkTokenPayload.user?.role,
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
    if (!roles.includes(req.user.role)) {
      throw new Unauthorized("You are not Access to this resource!");
    }
    next();
  };
};

export { isAuthenticated, authPermisson };

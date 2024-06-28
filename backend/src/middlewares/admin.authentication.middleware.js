import { Unauthenticated, Unauthorized } from "../errors/index.js";
import { verifyJWT } from "../utils/index.js";
const isAuthenticatedAdmin = (req, res, next) => {
  let adminToken;

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    adminToken = authHeader.split(" ")[1];
  } else if (req.cookies["admin-token"]) {
    adminToken = req.cookies["admin-token"];
  } else {
    throw new Unauthenticated("Admin Authentication header Invalid");
  }

  if (!adminToken) {
    throw new Unauthenticated("Admin Authentication Token Invalid");
  }

  try {
    const checkAdminTokenPayload = verifyJWT(adminToken);
    //     console.log("Admin Token is = ", checkAdminTokenPayload);

    if (!checkAdminTokenPayload) {
      throw new Unauthenticated("Admin Payload Token Invalid");
    }

    const role = checkAdminTokenPayload?.role;

    if (!role && role !== "admin") {
      throw new Unauthorized("Unauthorized to access admin resource");
    }

    req.user = {
      role,
    };

    next();
  } catch (error) {
    throw new Unauthenticated(
      "Error while verifying admin authentication token: " + error.message
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

export { isAuthenticatedAdmin, authPermisson };

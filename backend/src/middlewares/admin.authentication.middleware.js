import { Unauthenticated, Unauthorized } from "../errors/index.js";
import { verifyJWT } from "../utils/index.js";

const isAuthenticatedAdmin = (req, res, next) => {
  let adminToken;

  const authHeader = req.headers.authorization;

  adminToken =
    authHeader && authHeader.startsWith("Bearer")
      ? authHeader.split(" ")[1]
      : req.signedCookies["admin-token"];

  if (!adminToken) {
    throw new Unauthenticated(
      "Missing or invalid admin authentication header. Please ensure the header is in the format"
    );
  }

  try {
    const checkAdminTokenPayload = verifyJWT(adminToken);
    //     console.log("Admin Token is = ", checkAdminTokenPayload);

    if (!checkAdminTokenPayload) {
      throw new Unauthenticated("Admin Payload Token Invalid");
    }

    const { secretKey, username } = checkAdminTokenPayload;

    if (!secretKey || secretKey !== process.env.ADMIN_SECRET_KEY) {
      throw new Unauthorized("Unauthorized to access admin resource");
    }

    if (!username) {
      throw new Unauthorized("Username is required");
    }
    req.user = {
      secretKey,
      username,
    };

    next();
  } catch (error) {
    throw new Unauthenticated(
      "Error while verifying admin authentication token: " + error.message
    );
  }
};

// //  Middleware to restrict access based on user roles
// const authPermisson = (...roles) => {
//   return (req, res, next) => {
//     // console.log(req.user?.role);
//     if (!roles.includes(req.user?.role)) {
//       throw new Unauthorized("You are not Access to this resource!");
//     }
//     next();
//   };
// };

export { isAuthenticatedAdmin };

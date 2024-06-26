import jwt from "jsonwebtoken";
import Unauthenticated from "../errors/UnauthenticatedError.js";
import { StatusCodes } from "http-status-codes";

// Function to create a JWT token based on the provided payload
const createJWT = ({ payload }) => {
  // Generate JWT token with payload, secret key, and expiration time
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  if (!token) {
    throw new Unauthenticated("Failed to Create JWT Token");
  }

  return token;
};

// Function to verify and decode a JWT token
const verifyJWT = (token) => {
  try {
    // Verify and decode the JWT token using the secret key
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    // If decoding fails (decodeToken is falsy), throw an UnauthenticatedError indicating verification failure
    if (!decodeToken) {
      throw new Unauthenticated("Failed to Verify JWT Token");
    }

    // Return the decoded payload if token is valid
    return decodeToken;
  } catch (error) {
    // If decoding fails, throw an UnauthenticatedError indicating verification failure
    throw new Unauthenticated("Failed to Verify JWT Token");
  }
};

// Function to set JWT token in a cookie and send it back to the client as part of the response
const cookieResponse = ({ res, user, clear = false }) => {
  if (!clear) {
    // Generate JWT token for the user payload
    const token = createJWT({ payload: user });

    if (!token) {
      throw new Unauthenticated(
        "Failed to Create JWT Token in Cookie Response"
      );
    }

    // Set the JWT token in a cookie named "token" in the response
    res.cookie("token", token, {
      // Make the cookie accessible only via HTTP(S) requests
      httpOnly: true,
      // Set cookie as secure if in production environment
      secure: process.env.NODE_ENV === "production",
      success: true,
      // Set cookie expiration time (24 hours)
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      sameSite: "lax", // Set SameSite attribute to "Lax" for CSRF protection
    });
  } else {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: 0,
      sameSite: "lax", // Set SameSite attribute to "Lax" for CSRF protection
    });
  }
};

// for admin only

const setAdminTokenCookie = ({ res, user: adminUser, clear = false }) => {
  if (!clear) {
    const adminToken = createJWT({ payload: adminUser });

    if (!adminToken) {
      throw new Unauthenticated("Failed to Create JWT Token");
    }

    res.cookie("admin-token", adminToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      success: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      sameSite: "lax", // Set SameSite attribute to "Lax" for CSRF protection
    });
  } else {
    res.cookie("admin-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      sameSite: "lax", // Set SameSite attribute to "Lax" for CSRF protection
    });
  }
};

export { createJWT, verifyJWT, cookieResponse, setAdminTokenCookie };

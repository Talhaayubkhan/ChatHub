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
const verifyJWT = ({ token }) => {
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
const cookieResponse = ({ res, user }) => {
  // Generate JWT token for the user payload
  const token = createJWT({ payload: user });

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
    // signed: true, // Sign the cookie for added security
  });

  // Send a success response along with the user data
  res.status(StatusCodes.CREATED).send({ user });
};

export { createJWT, verifyJWT, cookieResponse };

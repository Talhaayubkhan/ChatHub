import jwt from "jsonwebtoken";
import Unauthenticated from "../errors/UnauthenticatedError.js";
import { StatusCodes } from "http-status-codes";

// Function to create a JWT token based on the provided payload
export const createJWT = ({ payload }) => {
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
export const verifyJWT = (token) => {
  // Verify and decode the JWT token using the secret key
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

  // If decoding fails (decodeToken is falsy), throw an UnauthenticatedError indicating verification failure
  if (!decodeToken) {
    throw new Unauthenticated("Failed to Verify JWT Token");
  }

  // Return the decoded payload if token is valid
  return decodeToken;
};

// Function to set JWT token in a cookie and send it back to the client as part of the response
export const cookieResponse = ({ res, user }) => {
  // Generate JWT token for the user payload
  const token = createJWT({ payload: user });

  // Set the JWT token in a cookie named "token" in the response
  res.cookie("token", token, {
    httpOnly: true, // Make the cookie accessible only via HTTP(S) requests
    // secure: process.env.NODE_ENV === "production", // Set cookie as secure if in production environment
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // Set cookie expiration time (24 hours)
    sameSite: "lax", // Set SameSite attribute to "Lax" for CSRF protection
    // signed: true, // Sign the cookie for added security
  });

  // Send a success response along with the user data
  res.status(StatusCodes.CREATED).send({ user });
};

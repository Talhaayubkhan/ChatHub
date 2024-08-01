import jwt from "jsonwebtoken";
import Unauthenticated from "../errors/UnauthenticatedError.js";

// Function to create a JWT token based on the provided payload
const createJWT = ({ payload }) => {
  // Generate JWT token with payload, secret key, and expiration time
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  console.log("Generated Token:", token); // Add this log

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
    console.log("Verified Token Payload:", decodeToken); // Add this log

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
    console.log("Stored Token in Cookie:", token); // Add this log

    if (!token) {
      throw new Unauthenticated(
        "Failed to Create JWT Token in Cookie Response"
      );
    }

    // Set the JWT token in a cookie named "token" in the response
    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      sameSite: "None", // Set SameSite attribute to "Lax" for CSRF protection
      signed: true,
    });
  } else {
    res.cookie("token", "", {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: true,
      expires: new Date(0),
      sameSite: "None", // Set SameSite attribute to "Lax" for CSRF protection
      signed: true,
    });
  }
};

// for admin only

const setAdminTokenCookie = ({ res, user: adminUser, expireToken = false }) => {
  if (!expireToken) {
    const adminToken = createJWT({ payload: adminUser });

    if (!adminToken) {
      throw new Unauthenticated("Failed to Create JWT Token");
    }

    res.cookie("admin-token", adminToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      sameSite: "None", // Set SameSite attribute to "Lax" for CSRF protection
      signed: true,
    });
  } else {
    res.cookie("admin-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      sameSite: "None", // Set SameSite attribute to "Lax" for CSRF protection
      signed: true, // Mark cookie as signed
    });
  }
};

export { createJWT, verifyJWT, cookieResponse, setAdminTokenCookie };

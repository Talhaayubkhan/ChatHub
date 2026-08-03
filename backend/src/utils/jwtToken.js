/**
 * JWT Token Utilities
 * Handles token creation, verification, and cookie management
 */

import jwt from "jsonwebtoken";
import Unauthenticated from "../errors/UnauthenticatedError.js";

/**
 * Create a JWT token based on the provided payload
 * @param {Object} payload - The data to encode in the token
 * @returns {string} - JWT token
 */
const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  if (!token) {
    throw new Unauthenticated("Failed to Create JWT Token");
  }

  return token;
};

/**
 * Verify and decode a JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} - Decoded token payload
 */
const verifyJWT = (token) => {
  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodeToken) {
      throw new Unauthenticated("Failed to Verify JWT Token");
    }

    return decodeToken;
  } catch (error) {
    console.error("Error Verifying JWT Token:", error.message);
    throw new Unauthenticated("Failed to Verify JWT Token");
  }
};

/**
 * Set JWT token in a cookie and send it back to the client
 * @param {Object} options - Options object
 * @param {Response} options.res - Express response object
 * @param {Object} options.user - User payload for token
 * @param {boolean} options.expireToken - Whether to expire the token
 */
const cookieResponse = ({ res, user, expireToken = false }) => {
  if (!expireToken) {
    const token = createJWT({ payload: user });

    if (!token) {
      throw new Unauthenticated(
        "Failed to Create JWT Token in Cookie Response"
      );
    }

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      sameSite: "lax",
      secure: false, // Set to true in production with HTTPS
      signed: true,
    });
  } else {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "lax",
      secure: false,
      signed: true,
    });
  }
};

/**
 * Set admin token cookie
 * @param {Object} options - Options object
 * @param {Response} options.res - Express response object
 * @param {Object} options.user - Admin user payload
 * @param {boolean} options.expireToken - Whether to expire the token
 */
const setAdminTokenCookie = ({ res, user: adminUser, expireToken = false }) => {
  if (!expireToken) {
    const adminToken = createJWT({ payload: adminUser });
    res.cookie("admin-token", adminToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      sameSite: "lax",
      secure: false, // Set to true in production with HTTPS
      signed: true,
    });
  } else {
    res.cookie("admin-token", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "lax",
      secure: false,
      signed: true,
    });
  }
};

export { createJWT, verifyJWT, cookieResponse, setAdminTokenCookie };

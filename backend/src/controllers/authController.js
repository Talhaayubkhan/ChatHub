import { User } from "../models/User.Models.js";
import { StatusCodes } from "http-status-codes";
import { BadRequest, Unauthenticated } from "../errors/index.js";
import { cookieResponse, generateToken } from "../utils/index.js";
const registerUser = async (req, res) => {
  // We use req.body to access the data sent by the client in the request body
  // IMPORTANT NOTE: req.body is used to access the data sent by the client in the request body, which is essential for operations like user registration.
  const { name, username, email, password, bio } = req.body;
  console.log(req.body);

  if (!name || !username || !email) {
    throw new BadRequest(
      "Please provide a name, username, email, and password"
    );
  }

  const avatar = {
    public_id: "sdfs",
    url: "asd",
  };

  const user = await User.create({
    name,
    username,
    email,
    bio,
    password,
    avatar,
  });

  // Extract necessary user data to be included in the JWT token payload
  const tokenUser = generateToken(user);
  // Generate a JWT token for the user and set it in an HTTP-only, secure cookie in the response
  cookieResponse({ res, user: tokenUser });
  // res.status(StatusCodes.CREATED).json({ message: "successfully registered" });
};

const login = async (req, res) => {
  res.send("Login");
};

export { login, registerUser };

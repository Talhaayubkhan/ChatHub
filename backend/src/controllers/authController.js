import { User } from "../models/User.Models.js";
import { StatusCodes } from "http-status-codes";

const registerUser = async (req, res) => {
  // We use req.body to access the data sent by the client in the request body
  // IMPORTANT NOTE: req.body is used to access the data sent by the client in the request body, which is essential for operations like user registration.
  const { name, username, email, password, bio } = req.body;

  // check user name, username, email, password for authentication purposes
  if (!name || !username || !email) {
    throw new Error("Invalid authentication credentials");
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

  res
    .status(StatusCodes.CREATED)
    .json({ message: "successfully registered", user: user });
};

const login = async (req, res) => {
  res.send("Login");
};

export { login, registerUser };

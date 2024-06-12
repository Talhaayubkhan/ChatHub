import { User } from "../models/User.Models.js";
import { StatusCodes } from "http-status-codes";
import { BadRequest, Unauthenticated } from "../errors/index.js";
import { cookieResponse, generateToken } from "../utils/index.js";

const registerUser = async (req, res) => {
  // We use req.body to access the data sent by the client in the request body
  // IMPORTANT NOTE: req.body is used to access the data sent by the client in the request body, which is essential for operations like user registration.
  const { name, username, email, password, bio } = req.body;
  // console.log(req.body);

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

const loginUser = async (req, res) => {
  const { email, username, password } = req.body;

  const user = await User.findOne({
    $or: [{ email: email }, { username: username }],
  }).select("+password");

  if (!user) {
    throw new Unauthenticated(`Not foun a user with that ${email}`);
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new Unauthenticated("Invalid Password, Please try again");
  }

  const tokenUser = generateToken(user);
  cookieResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).send({ user: tokenUser });
};
const logoutUser = async (req, res) => {
  return res
    .cookie("token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    })
    .json({
      message: "You have been logged out",
      sucess: true,
    });
};

const getUserProfile = async (req, res) => {
  try {
    const getUser = await User.findById(req.user);

    res.status(StatusCodes.OK).json({
      sucess: true,
      getUser,
    });
  } catch (error) {
    console.error(
      "An error occurred while processing the request" || error?.message
    );
  }
};
const searchChatUser = async (req, res) => {
  try {
    const { name } = req.query;

    return res.status(StatusCodes.OK).json({
      sucess: true,
      message: name,
    });
  } catch (error) {
    console.error(
      "An error occurred while processing the request" || error?.message
    );
  }
};
export { loginUser, registerUser, logoutUser, getUserProfile, searchChatUser };

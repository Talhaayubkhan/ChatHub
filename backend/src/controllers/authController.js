import { User } from "../models/User.Models.js";

const registerUser = async (req, res) => {
  const avatar = {
    public_id: "sdfs",
    url: "asd",
  };
  const user = await User.create({
    name: "John",
    username: "john_khan",
    password: "password",
    avatar,
  });
  res.status(201).json({ message: "successfully registered", user: user });
};

const login = async (req, res) => {
  res.send("Login");
};

export { login, registerUser };

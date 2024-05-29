const newUser = async (req, res) => {
  res.send("Welcome to the new user");
};

const login = async (req, res) => {
  res.send("Login");
};

export { login, newUser };

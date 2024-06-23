export const generateToken = (user) => {
  return { name: user.name, userId: user._id, role: user.role };
};

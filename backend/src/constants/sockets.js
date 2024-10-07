// Initialize a Map to store user IDs and their corresponding socket IDs
const userSocketIDs = new Map();

// Function to retrieve socket IDs of given users
const getAllSocketIDs = (users = []) => {
  const sockets = users.map((user) => userSocketIDs.get(user.toString()));

  return sockets;
};

export { userSocketIDs, getAllSocketIDs };

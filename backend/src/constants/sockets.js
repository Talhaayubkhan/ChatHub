// Initialize a Map to store user IDs and their corresponding socket IDs
const userSocketIDs = new Map();

// Function to retrieve socket IDs of given users
const getAllSocketIDs = (users = []) => {
  // console.log("users:", typeof users);

  if (!Array.isArray(users)) {
    console.error("Expected users to be an array, but got:", typeof users);
    return [];
  }
  const sockets = users.map((user) => userSocketIDs.get(user.toString()));
  return sockets;
};

export { userSocketIDs, getAllSocketIDs };

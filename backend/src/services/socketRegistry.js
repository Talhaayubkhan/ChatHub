export const createSocketRegistry = () => {
  const socketsByUser = new Map();

  const addSocket = (userId, socketId) => {
    if (!userId || !socketId) return;

    const key = String(userId);
    const sockets = socketsByUser.get(key) ?? new Set();
    sockets.add(socketId);
    socketsByUser.set(key, sockets);
  };

  const removeSocket = (userId, socketId) => {
    if (!userId || !socketId) return;

    const key = String(userId);
    const sockets = socketsByUser.get(key);
    if (!sockets) return;

    sockets.delete(socketId);
    if (sockets.size === 0) socketsByUser.delete(key);
  };

  const getSocketIds = (userIds = []) => [
    ...new Set(
      userIds.flatMap((userId) => [
        ...(socketsByUser.get(String(userId)) ?? []),
      ])
    ),
  ];

  const clear = () => socketsByUser.clear();

  return { addSocket, removeSocket, getSocketIds, clear };
};

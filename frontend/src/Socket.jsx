import { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";
import server from "./constants/config";

// Create a context for the socket connection
const SocketContext = createContext();

// Custom hook to easily access the SocketContext
export const useSocket = () => useContext(SocketContext);

// SocketProvider component to wrap parts of the app that need socket access
export const SocketProvider = ({ children }) => {
  // Memoize the socket instance to ensure it's created only once, avoid re-render again and again!
  const socket = useMemo(
    () =>
      io(server, {
        withCredentials: true,
      }),
    []
  );
  // console.log(socket);
  // Provide the socket instance to all children components
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

// Export the SocketProvider and useSocket hook for use in other components
// export { SocketProvider, useSocket };

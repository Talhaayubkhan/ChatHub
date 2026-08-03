import { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";
import server from "./constants/config";

// Create a context for the socket connection
const SocketContext = createContext();

/**
 * Custom hook to access the socket instance from anywhere in the app.
 * @returns {Object} The socket instance
 */
export const useSocket = () => useContext(SocketContext);

/**
 * SocketProvider component wraps parts of the app that need socket access.
 * Creates a single socket instance and provides it to all children components.
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components
 */
export const SocketProvider = ({ children }) => {
  // Memoize the socket instance to ensure it's created only once (prevents re-renders)
  const socket = useMemo(
    () =>
      io(server, {
        withCredentials: true,
      }),
    []
  );

  // Provide the socket instance to all children components
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

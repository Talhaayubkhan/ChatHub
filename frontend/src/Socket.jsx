import { createContext, useContext, useEffect, useMemo } from "react";
import io from "socket.io-client";
import server from "./constants/config";
import { createManagedSocket } from "./lib/chatState";

// Create a context for the socket connection
const SocketContext = createContext();

// Custom hook to easily access the SocketContext
export const useSocket = () => useContext(SocketContext);

// SocketProvider component to wrap parts of the app that need socket access
export const SocketProvider = ({ children }) => {
  const managedSocket = useMemo(() => createManagedSocket(io, server), []);

  useEffect(() => () => managedSocket.dispose(), [managedSocket]);

  return (
    <SocketContext.Provider value={managedSocket.socket}>
      {children}
    </SocketContext.Provider>
  );
};

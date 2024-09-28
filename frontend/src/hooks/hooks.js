import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useErrors = (errorList = []) => {
  useEffect(() => {
    // Iterate over each error object in the array
    errorList.forEach(({ isError, error, fallback }) => {
      // If there's an error
      if (isError && error) {
        // If a fallback function is provided, execute it
        if (fallback) {
          fallback();
        } else {
          // Display error notification
          const errorMessage =
            error?.data?.message || error?.message || "Something went wrong";
          toast.error(errorMessage);

          // Optionally log the error for debugging (you can remove this if not needed)
          // console.error("Error:", error);
        }
      }
    });
  }, [errorList]);
};

// Custom hook for handling friend request mutations with feedback and error handling
const useSendFriendRequest = (mutationHook) => {
  // State to track whether the friend request process is loading
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  // State to store the response data from the mutation
  const [responseData, setResponseData] = useState(null);

  // Extract the mutation function from the provided hook
  const [mutateRequest] = mutationHook();

  // Function to execute the friend request mutation with feedback and error handling
  const executeSendFriendRequest = async (loadingMessage, ...args) => {
    // Set loading state to true before the request starts
    setIsRequestLoading(true);

    // Display a loading toast message while the request is being processed
    const toastId = toast.loading(
      loadingMessage || "Processing your request..."
    );

    try {
      // Execute the mutation function with provided arguments (e.g., user ID)
      const response = await mutateRequest(...args);

      // If the request is successful, show a success message and store the response data
      if (response.data) {
        toast.success(
          response.data.message || "Friend request sent successfully!",
          {
            id: toastId,
          }
        );
        setResponseData(response.data);
      } else {
        // If the request fails, show the error message from the response
        toast.error(
          response.error?.data?.message || "Failed to send friend request.",
          {
            id: toastId,
          }
        );
      }
    } catch (error) {
      // If an unexpected error occurs, display a generic error message
      toast.error("An unexpected error occurred. Please try again.", {
        id: toastId,
      });
    } finally {
      // Set loading state to false after the request completes
      setIsRequestLoading(false);
    }
  };

  // Return the function to execute the request, loading state, and response data
  return [executeSendFriendRequest, isRequestLoading, responseData];
};

// Custom hook to manage socket event listeners
// Parameters:
// - socket: The socket instance
// - eventHandlers: An object mapping socket events to handler functions
const useSocketEventListeners = (socket, eventHandlers) => {
  useEffect(() => {
    if (!socket || !eventHandlers) {
      toast.error("Socket or event handlers are not provided!"); // Display toast error
      return;
    }
    // Convert the eventHandlers object into an array of [event, handler] pairs
    const handlerEntries = Object.entries(eventHandlers);

    // Attach event listeners to the socket
    handlerEntries.forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    // Cleanup function to remove the event listeners when the component unmounts or dependencies change
    return () => {
      handlerEntries.forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [socket, eventHandlers]);
};

export { useErrors, useSendFriendRequest, useSocketEventListeners };

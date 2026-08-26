const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again.";

const getApiErrorMessage = (
  error,
  statusMessages = {},
  fallback = DEFAULT_ERROR_MESSAGE
) => {
  const apiMessage = error?.response?.data?.message;
  if (typeof apiMessage === "string" && apiMessage.trim()) {
    return apiMessage.trim();
  }

  return statusMessages[error?.response?.status] || fallback;
};

export { DEFAULT_ERROR_MESSAGE, getApiErrorMessage };

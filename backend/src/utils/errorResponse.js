const INTERNAL_ERROR_MESSAGE =
  "An unexpected error occurred. Please try again later.";

export const toErrorResponse = (error) => {
  const statusCode = Number(error?.statusCode);
  const isOperational = statusCode >= 400 && statusCode <= 599;

  return {
    statusCode: isOperational ? statusCode : 500,
    body: {
      success: false,
      message: isOperational
        ? error.message || "Request failed"
        : INTERNAL_ERROR_MESSAGE,
    },
  };
};

export { INTERNAL_ERROR_MESSAGE };

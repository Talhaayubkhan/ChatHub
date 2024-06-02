class CustomApiError extends Error {
  constructor(message) {
    super(message);
    this.timestamp = new Date();
  }
}

export default CustomApiError;

class CustomErrorHandler extends Error {
  constructor(message, httpCode = 500) {
    super(message, httpCode);
    this.httpCode = httpCode;
    this.message = message;
  }
}

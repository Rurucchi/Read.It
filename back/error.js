class CustomError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

export default CustomError;

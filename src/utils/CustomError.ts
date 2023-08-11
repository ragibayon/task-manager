class CustomError extends Error {
  constructor(message: string, public errorCode: number) {
    super(message);
    this.name = 'CustomError';
  }
}
export default CustomError;

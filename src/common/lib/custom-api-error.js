import httpStatus from 'http-status';
import { ERROR_CODES } from '../constants/error-codes.js';

const { INTERNAL_SERVER_ERROR } = httpStatus;

class CustomAPIError extends Error {
  constructor({
    message = ERROR_CODES.INTERNAL_SERVER_ERROR.message,
    status = INTERNAL_SERVER_ERROR,
    errorCode = ERROR_CODES.INTERNAL_SERVER_ERROR.errorCode,
    meta = {},
  }) {
    super(message);
    this.status = status;
    this.errorCode = errorCode;
    this.meta = meta;
    this.name = this.constructor.name;
  }
}

export default CustomAPIError;

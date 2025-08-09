import httpStatus from 'http-status';
import { RESPONSE_MESSAGES } from '../constants/responseMessages.js';

const { INTERNAL_SERVER_ERROR } = httpStatus;

/**
 * Handles all errors that occur during the request, including async errors.
 *
 * If the error has a status property, that status is used. Otherwise, a 500
 * error is sent.
 *
 * The error is logged to the console for debugging purposes.
 *
 * The response is a JSON object with a message, status, and errorCode. The
 * message is the error message if it exists, otherwise it is a generic
 * "Something went wrong" message. The status is "failed", and the errorCode is
 * the error's errorCode if it exists, otherwise it is undefined.
 *
 * @param {Error} err The error that occurred
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Express next function
 */
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack); // Log the error for debugging

  const statusCode = err.status || INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    message: err.message ? err.message : 'Something went wrong',
    status: RESPONSE_MESSAGES.FAILED,
    errorCode: err.errorCode,
    meta: err.meta,
  });
};

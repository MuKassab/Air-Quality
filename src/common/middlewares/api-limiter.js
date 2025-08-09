import httpStatus from 'http-status';
import { CustomAPIError, getRedisClient } from '../lib/index.js';
import { ERROR_CODES } from '../constants/index.js';

const { TOO_MANY_REQUESTS } = httpStatus;

export const apiRateLimiter = async (req, res, next) => {
  const redis = getRedisClient();

  // must be done after authentication to achieve the required effect
  // otherwise assume it is the same guest user
  const userId = req.user ? req.user.id : 'guest';
  const key = `user:${userId}:requests`;

  const currentCount = await redis.incr(key);

  if (currentCount === 1) {
    // Set expiration for the key if it's the first request
    await redis.expire(key, 60); // Set expiration time to 1 minute (60 seconds)
  }

  if (currentCount > 10) {
    // If the count exceeds 10, throw an error
    // return res.status(TOO_MANY_REQUESTS).json({ error: 'Rate limit exceeded' });
    throw new CustomAPIError({
      message: ERROR_CODES.RATE_LIMIT_EXCEEDED.message,
      status: TOO_MANY_REQUESTS,
      errorCode: ERROR_CODES.RATE_LIMIT_EXCEEDED.errorCode,
      meta: { userId },
    });
  }

  // Continue with the request
  return next();
};

/**
 * Request logger middleware.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const doneAt = new Date();
    const duration = doneAt - start;

    // eslint-disable-next-line no-console
    console.log(
      `[${doneAt}]- ${req.method} ${req.originalUrl} - Status: ${res.statusCode} - Duration: ${duration}ms`,
    );
  });

  next();
};

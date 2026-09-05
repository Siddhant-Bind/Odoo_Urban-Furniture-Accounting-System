export default function errorHandler(error, _req, res, _next) {
  const status = error.statusCode || error.status || 500;
  if (status >= 500) console.error(error);
  res.status(status).json({ error: error.message || 'Internal server error' });
}

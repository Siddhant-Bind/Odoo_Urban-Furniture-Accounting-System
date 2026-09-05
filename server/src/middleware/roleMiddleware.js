export default function requireRole(...roles) {
  return (req, _res, next) => roles.includes(req.user?.role) ? next() : next(Object.assign(new Error('You do not have permission for this action'), { statusCode: 403 }));
}

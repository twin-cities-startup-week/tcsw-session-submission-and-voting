const rejectUnauthenticated = (req, res, next) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // They were authenticated! User may do the next thing
    // Note! They may not be Authorized to do all things
    next();
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};

const requireAdmin = (req, res, next) => {
  // check if logged in
  if (req.isAuthenticated() && req.user.admin === true) {
    // They were authenticated! User may do the next thing
    // Note! They may not be Authorized to do all things
    next();
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};

const getIpAddress = (req) => {
  let result;
  if (process.env.NODE_ENV === 'development') {
    result = '127.0.0.1';
  } else if (req.connection && req.connection.remoteAddress) {
    result = req.connection.remoteAddress;
  } else if (req.headers) {
    result = req.headers['x-forwarded-for'];
  }
  return result;
};

module.exports = { rejectUnauthenticated, requireAdmin, getIpAddress };

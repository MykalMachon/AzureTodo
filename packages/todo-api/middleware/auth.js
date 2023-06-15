
const getUser = (req) => {
  try {
    const header = req.headers['x-ms-client-principal'];
    const principal = Buffer
      .from(header, 'base64')
      .toString('ascii');

    if (principal) {
      return JSON.parse(principal);
    }
  } catch (error) {
    req.log.error('Cannot get user', error);
  }
  return undefined;
}

const auth = (req, res, next) => {
  const user = getUser(req);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}

export default auth;
const checkAdmin = (req, res, next) => {
  const { isAdmin } = req.logedInUserData;
  if (!isAdmin) {
    res.status(401);
    throw new Error('Not authorized as admin');
  }
  next();
};
export default checkAdmin;

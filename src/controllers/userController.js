export const userMeHandler = async (req, res, next) => {
  const user = req.user;
  res.status(200).json({ user: user });
};

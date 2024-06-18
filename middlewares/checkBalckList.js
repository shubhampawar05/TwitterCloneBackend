const checkBlacklist = (req, res, next) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
  if (token && tokenBlacklist.includes(token)) {
    return res.status(401).json({ message: "Token has been logged out" });
  }
  next();
};

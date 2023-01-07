import jwt from "jsonwebtoken";

const config = process.env;

const verifyToken = (req, res, next) => {
    console.log(req.headers.authorization)
  const token =
    req.body.admin_token || req.query.admin_token || req.headers["authorization"];

  if (!token) {
    return res.status(200).send({ status: "error", msg: "Admin Token is required for authorization!", data: []});
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], config.ACCESS_TOKEN_SECRET);
    req.admin = decoded;
    console.log("===req.admin", req.admin)
  } catch (err) {
    return res.status(200).send({ status: "error", msg: "Invalid Admin Token!", data: []});
  }
  return next();
};

export default verifyToken;
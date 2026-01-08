import jwt from "jsonwebtoken";

const generateToken = (id, name, email) => {
  return jwt.sign({ id, name, email }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
};

export default generateToken;

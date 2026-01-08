import jwt from "jsonwebtoken";
import Company from "../models/company.models.js";

export const protectCompany = async (req, res, next) => {
  // To retrive the token during the job posting by thr company
  const token = req.headers.token;

  if (!token) {
    return res.json({ success: false, message: "Not authorized, Login again" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // decodedToken is an object like { id: '...', iat: ..., exp: ... }
    const companyId =
      decodedToken && decodedToken.id ? decodedToken.id : decodedToken;

    req.company = await Company.findById(companyId).select("-password");

    next();
  } catch (error) {
    res.json({ status: 404, success: false, message: error.message });
  }
};

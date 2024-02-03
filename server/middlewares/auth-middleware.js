const jwt = require("jsonwebtoken");
const Patient = require("../models/patientModel");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }

  // Assuming token is in the format "Bearer <jwtToken>, Removing the "Bearer" prefix"
  const jwtToken = token.replace("Bearer", "").trim();
  console.log("token from auth middleware", jwtToken);

  try {
    const isVerified = jwt.verify(jwtToken, "hitanshu");

    const patientData = await Patient.findOne({
      username: isVerified.name,
    }).select({
      password: 0,
    });
    console.log(patientData);

    req.patient = patientData;
    req.token = token;
    req.patientID = patientData._id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

module.exports = authMiddleware;

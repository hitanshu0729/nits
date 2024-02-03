const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const patientSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    // required: true,
    // unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  medicalHistory: {
    type: String,
    // required: true,
  },
});

patientSchema.pre("save", async function (next) {
  const patient = this;

  if (!patient.isModified("password")) {
    return next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(patient.password, saltRound);
    patient.password = hash_password;
    return next();
  } catch (error) {
    return next(error);
  }
});

patientSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

patientSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign(
      {
        userId: this._id.toString(),
        username: this.username,
      },
      "hitanshu",
      {
        expiresIn: "2d",
      }
    );

    return token;
  } catch (error) {
    console.error(error);
  }
};

module.exports = mongoose.model("Patient", patientSchema);

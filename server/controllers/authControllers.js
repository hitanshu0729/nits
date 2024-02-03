const doctorModel = require("../models/doctorModel.js");

module.exports = registerController = async (req, res) => {
  try {
    const { name, qualification, address, phone, email, specialization } =
      req.body;

    if (!name) {
      return res.status(400).send({ msg: "Name is required!" });
    }
    if (!qualification) {
      return res.status(400).send({ msg: "qualification is required!" });
    }
    if (!address) {
      return res.status(400).send({ msg: "address. is required!" });
    }
    if (!phone) {
      return res.status(400).send({ msg: "phone is required!" });
    }
    if (!email) {
      return res.status(400).send({ msg: "email is required!" });
    }
    if (!specialization) {
      return res.status(400).send({ msg: "specialization is required!" });
    }
    const user = await doctorModel.findOne({ email: email });

    if (user) {
      return res.status(200).send({
        success: false,
        msg: `User with the username ${email} already exists`,
      });
    }

    const newUser = await new doctorModel({
      name,
      qualification,
      address,
      phone,
      email,
      specialization,
    }).save();

    res.status(201).send({
      success: true,
      msg: "User registered successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};

module.exports = searchdoctor = async (req, res) => {
  const query = req.query.query;

  try {
    const doctors = await doctorModel.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { specialization: { $regex: query, $options: "i" } },
        { qualification: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

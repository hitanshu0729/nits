require("dotenv").config();
const authRoutes = require("./routes/authRoute.js");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.urlencoded({ extended: true }));
const Patient = require("./models/patientModel");
const connectDb = require("./utils/db");
// const authControllers = require("./controllers/auth-controller");
const corsOptions = {
  // origin: "http://localhost:5173",
  origin: (origin, callback) => {
    // Check if the origin is allowed
    const allowedOrigins = [
      "http://localhost:5174",
      "http://localhost:5173",
      "http://localhost:4173",
      "https://thapatechnical.site",
      "https://www.thapatechnical.site",
    ];
    const isAllowed = allowedOrigins.includes(origin);
    callback(null, isAllowed ? origin : false);
  },
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));

app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.post("/registering", async (req, res, next) => {
  try {
    console.log(req.body);
    const {
      username,
      password,
      name,
      email,
      phone,
      age,
      gender,
      medicalHistory,
    } = req.body;

    // Check if email already exists
    const patientExist = await Patient.findOne({ email });

    if (patientExist) {
      return res.status(400).json({
        message: "Patient with this email already exists",
      });
    }

    // Create a new patient
    const patientCreated = await Patient.create({
      username,
      password,
      name,
      email,
      phone,
      age,
      gender,
      medicalHistory,
    });
    res.status(201).json({
      msg: "Registration successful",
      token: await patientCreated.generateToken(),
      patientId: patientCreated._id.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find the patient based on username
    const patient = await Patient.findOne({ username });

    if (!patient) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Validate password
    const isPasswordValid = await patient.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate and send JWT token
    const token = await patient.generateToken();

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// app.get("");
const PORT = 5001;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});

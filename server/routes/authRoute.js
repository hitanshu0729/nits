const express = require("express");
const authControllers = require("../controllers/authControllers.js");

const registerController = authControllers.registerController;
const searchdoctor = authControllers.searchdoctor;

const router = express.Router();

const app = express();

app.use(express.json());

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//   },
// });

// const upload = multer({ storage: storage });

// app.post('/upload-assignment/:registrationNumber', upload.single('pdf'), async (req, res) => {
//   try {
//     const { registrationNumber } = req.params;
//     const { filename, path } = req.file;

//     const student = await studentModel.findOne({ registrationNumber:registrationNumber.toUpperCase() });
//     if (!student) {
//       return res.status(404).json({ success: false, msg: 'Student not found' });
//     }

//     student.assignment.push({ filename, path });
//     await student.save();

//     res.status(200).json({ success: true, msg: 'Assignment uploaded successfully', filename, path });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, msg: 'Internal server error' });
//   }
// });

router.post("/registerdoctor", registerController);
//router.post('/addmarks',addmarks)
// router.get('/result/:registrationNumber',result)
// router.post('/addsubjects',addsubjects)
// router.get('/dashboard',dashboard)
// router.get('/student-details/:registrationNumber',studentdetails)
router.get("/search-doctors", searchdoctor);
// router.get('/student-subjects/:registrationNumber',getStudentSubjects)
// router.put('/update/:registrationNumber',updatestudent)
//router.post('/upload-assignment',upload.single('assignmentFile'),uploadassign)

module.exports = router;

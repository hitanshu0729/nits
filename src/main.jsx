import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import Contact from "./components/Contact/Contact.jsx";
import User from "./components/User/User.jsx";

import MedicineRecommendation from "./components/medicine/recommend.jsx";
import DiseasePredictor from "./components/disease/predict.jsx";
import MentalHealthAssessment from "./components/mentalhealth/mentalhealth.jsx";
import SkinDiseasePredictor from "./components/skin/skin.jsx";
import MedicalChatbot from "./components/chatbot/chatbot.jsx";
import Register from "./components/authentication/Register.jsx";
import { AuthProvider } from "./components/store/auth.jsx";
import Login from "./components/authentication/Login.jsx";
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout/>,
//     children: [
//       {
//         path: "",
//         element: <Home />
//       },
//       {
//         path: "about",
//         element: <About />
//       },
//       {
//         path: "contact",
//         element: <Contact />
//       }
//     ]
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/home" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="user/:userid" element={<User />} />

      <Route
        path="/medicine-recommendation"
        element={<MedicineRecommendation />}
      />
      <Route path="/diseasePredictor" element={<DiseasePredictor />} />
      <Route path="/mentalhealth" element={<MentalHealthAssessment />} />
      <Route path="/skindiseasepredictor" element={<SkinDiseasePredictor />} />
      <Route path="/medicalchatbot" element={<MedicalChatbot />} />
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AuthProvider>
);

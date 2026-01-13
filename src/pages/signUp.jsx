import React, { useState } from "react";
import AuthLayout from "../components/Layouts/AuthLayout";
import FormSignUp from "../components/Fragments/FormSignUp";
import axios from "axios";
import AppSnackbar from "../components/Elements/AppSnackbar";

function signUp() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleRegister = async (values) => {
    try {
      const response = await axios.post("https://jwt-auth-eight-neon.vercel.app/register", values);
      
      setSnackbar({ 
        open: true, 
        message: response.data.message || "Register Berhasil", 
        severity: "success" 
      });
    } catch (err) {
      setSnackbar({ 
        open: true, 
        message: err.response?.data?.message || "Email sudah pernah digunakan sebelumnya", 
        severity: "error" 
      });
    }
  };

  return (
    <AuthLayout>
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
      </div>

      <FormSignUp onSubmit={handleRegister} />

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </AuthLayout>
  );
}

export default signUp;
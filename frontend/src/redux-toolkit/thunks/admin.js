// thunks/admin.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import server from "../../constants/config";

const adminLogin = createAsyncThunk("admin/login", async ({ secretKey }) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${server}/api/v1/admin/login`, // Update the endpoint if needed
      { secretKey }, // Only send secretKey
      config
    );

    console.log("Admin login successful:", data.message);
    return data.message;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      "Admin login failed due to a server issue.";
    console.error("Error during admin login:", errorMessage);
    toast.error(errorMessage);
    throw new Error(errorMessage); // Ensure the error is handled properly
  }
});

const getVerifiedAdmin = createAsyncThunk("admin/getAdminData", async () => {
  try {
    const { data } = await axios.get(`${server}/api/v1/admin/`, {
      withCredentials: true,
    });

    return data.admin;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      "Failed to fetch admin data due to a server issue.";
    console.error("Error during fetching admin:", errorMessage);
    toast.error(errorMessage);
  }
});

const adminLogOut = createAsyncThunk("admin/logout", async () => {
  try {
    const { data } = await axios.get(`${server}/api/v1/admin/logout`, {
      withCredentials: true,
    });

    return data.message;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      "Admin logout failed due to a server issue.";
    console.error("Error during admin logout:", errorMessage);
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
});

export { adminLogin, getVerifiedAdmin, adminLogOut };

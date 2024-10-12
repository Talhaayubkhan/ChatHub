import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import server from "../../constants/config";

const adminLogin = createAsyncThunk(
  "admin/login",
  async ({ secretKey, username }) => {
    try {
      const axiosConfig = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${server}/api/v1/admin/login`,
        { secretKey, username },
        axiosConfig
      );
      console.log("Admin login successful:", data.message);
      return data.message;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Admin login failed due to a server issue.";
      console.error("Error during admin login:", errorMessage);
      toast.error(errorMessage);
      throw new Error(errorMessage); // To ensure the error gets handled appropriately in Redux
    }
  }
);

export { adminLogin };

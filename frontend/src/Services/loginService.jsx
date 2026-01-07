import axios from "axios";

async function loginService({ email, password }) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/login",
      { email, password },
      { withCredentials: true }
    );

    return response.data; // ✅ IMPORTANT
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
}

export default loginService;

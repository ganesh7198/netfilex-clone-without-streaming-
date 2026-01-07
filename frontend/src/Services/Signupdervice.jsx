import axios from "axios";
async function Signupdervice({username,email,password}){
	try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/signup",
      { username, email, password }
    );

    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Signup failed. Please try again.",
    };
  }
 }

 export default Signupdervice;
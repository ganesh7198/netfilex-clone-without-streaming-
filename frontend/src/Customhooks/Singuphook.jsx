import Signupdervice from "../Services/Signupdervice";
import { useState} from "react";
import { useNavigate } from "react-router-dom";

function Signuphook(){
const navigate = useNavigate();

const [form, setForm] = useState({
  username: "",
  email: "",
  password: "",
});

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

function handleChange(e) {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
}

function validate() {
  if (!form.username) return "Username is required";

  if (!form.email) return "Email is required";
  if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Enter a valid email";

  if (!form.password) return "Password is required";
  if (form.password.length < 6) return "Password must be at least 6 characters";

  return null;
}

async function handleSubmit(e) {
  e.preventDefault();

  const validationError = validate();
  if (validationError) {
    setError(validationError);
    return;
  }

  setLoading(true);
  setError("");

  const result = await Signupdervice(form);

  setLoading(false);

  if (!result.success) {
    setError(result.message);
    return;
  }

  console.log("Signup Success:", result.data);

  // optional: redirect to login
  navigate("/home");
}

return {
  form,
  loading,
  error,
  handleChange,
  handleSubmit,
};
}

export default Signuphook;
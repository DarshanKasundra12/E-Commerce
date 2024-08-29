import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './styles.css';

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();
  const signupFormRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (signupFormRef.current && !signupFormRef.current.contains(e.target)) {
        navigate("/");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navigate]);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setData({ ...data, password });

    if (password.length === 0) {
      setPasswordStrength("");
    } else if (password.length < 6) {
      setPasswordStrength("Weak");
    } else if (password.length < 10) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Strong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true while waiting for server response
    try {
      const url = "http://localhost:3001/api/signup";
      const { data: res } = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(res.message);
      navigate("/");
      setData({ // Clear form data after successful signup
        email: "",
        password: "",
        passwordConfirmation: "",
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false); // Set loading back to false
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup_container">
      <div className="signup_form_container" ref={signupFormRef}>
        <div className="left">
          <h1>Welcome To ECommerce</h1>
        </div>
        <div className="right">
          <form className="form_container" onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="input"
            />
            <div className="password_container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handlePasswordChange}
                value={data.password}
                required
                className="input"
              />
              <i
                className={`password_toggle fas ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={toggleShowPassword}
              ></i>
            </div>
            {passwordStrength && (
              <div className="password_strength">{passwordStrength}</div>
            )}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="passwordConfirmation"
              onChange={handleChange}
              value={data.passwordConfirmation}
              required
              className="input"
            />
            {error && <div className="error_msg">{error}</div>}
            <button type="submit" className="green_btn" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

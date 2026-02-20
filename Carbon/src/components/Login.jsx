import React, { useState } from 'react'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
import { URL } from '../constant';
import { FaArrowLeft } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [eye, setEye] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !pass) { toast.error("All information are required"); return; }
    try {
      const data = await fetch(`${URL}/auth/login`, {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, pass }),
        credentials: "include",
      });
      const res = await data.json();
      if (res.success == 1) {
        toast.success(res.message);
        window.location.href = "/Dashboard";
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

   const backtoHome = () => {
      window.location.href = "/"
  }


  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap');

        .login-page {
          background: #0a1a0f;
          font-family: 'Syne', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .login-layout {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4rem;
          max-width: 1000px;
          width: 100%;
        }

        /* Card */
        .login-card {
          flex: 1;
          background: #0f2d18;
          border: 1px solid #1e3d25;
          border-radius: 1.5rem;
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          max-width: 420px;
          width: 100%;
        }

        /* Logo */
        .login-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.75rem;
          text-decoration: none;
        }

        .login-logo img {
          width: 28px;
          height: 28px;
          object-fit: contain;
        }

        .login-logo span {
          font-size: 1.3rem;
          font-weight: 800;
          color: #4ade80;
          letter-spacing: -0.03em;
        }

        .login-logo span::before {
          content: '◈ ';
          font-size: 0.9rem;
          color: #22c55e;
        }

        .login-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: #f0fdf4;
          letter-spacing: -0.03em;
          margin: 0 0 0.4rem 0;
        }

        .login-title span { color: #4ade80; }

        .login-subtitle {
          color: #4b7a5a;
          font-size: 0.85rem;
          font-weight: 600;
          margin: 0 0 2rem 0;
        }

        /* Fields */
        .login-field {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 0.5rem;
        }

        .login-input {
          background: #0a1a0f;
          border: 1px solid #1e3d25;
          border-radius: 999px;
          padding: 0.75rem 1.25rem;
          color: #f0fdf4;
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem;
          outline: none;
          width: 100%;
          transition: border-color 0.2s;
        }

        .login-input::placeholder { color: #4b7a5a; }
        .login-input:focus { border-color: #22c55e; }

        .login-pass-wrap {
          display: flex;
          align-items: center;
          background: #0a1a0f;
          border: 1px solid #1e3d25;
          border-radius: 999px;
          padding: 0 1.25rem;
          transition: border-color 0.2s;
        }

        .login-pass-wrap:focus-within { border-color: #22c55e; }

        .login-pass-wrap input {
          flex: 1;
          background: none;
          border: none;
          padding: 0.75rem 0;
          color: #f0fdf4;
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem;
          outline: none;
        }

        .login-pass-wrap input::placeholder { color: #4b7a5a; }

        .login-eye {
          color: #4b7a5a;
          font-size: 1.1rem;
          cursor: pointer;
          transition: color 0.2s;
          flex-shrink: 0;
        }

        .login-eye:hover { color: #4ade80; }

        /* Button */
        .login-btn {
          background: #22c55e;
          color: #0a1a0f;
          border: none;
          padding: 0.8rem;
          border-radius: 999px;
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          cursor: pointer;
          width: 100%;
          margin-top: 0.75rem;
          transition: background 0.2s, transform 0.15s;
        }

        .login-btn:hover { background: #4ade80; transform: translateY(-2px); }

        /* Divider */
        .login-divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 1.5rem 0;
        }

        .login-divider-line {
          flex: 1;
          height: 1px;
          background: #1e3d25;
        }

        .login-divider span {
          font-size: 0.75rem;
          font-weight: 700;
          color: #4b7a5a;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* Signup link */
        .login-signup-link {
          text-align: center;
          font-size: 0.85rem;
          color: #4b7a5a;
          font-weight: 600;
        }

        .login-signup-link a {
          color: #4ade80;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        /* Illustration */
        .login-illustration {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-illustration img {
          width: 100%;
          max-width: 380px;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 0 40px #22c55e22);
        }

        @media (max-width: 768px) {
          .login-illustration { display: none; }
          .login-layout { justify-content: center; }
          .login-card { max-width: 100%; }
        }

        @media (max-width: 480px) {
          .login-page { padding: 1.5rem; }
          .login-card { padding: 2rem 1.5rem; }
        }

        

            .about-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #4ade80;
          background: #0f2d18;
          border: 1px solid #1e3d25;
          padding: 0.3rem 0.85rem;
          border-radius: 999px;
          margin-bottom: 1.5rem;
        }
          
        .mb{
            cursor:pointer;
            display:flex;
            align-items:center;
            width:170px;
            justify-content:space-between;
            position:absolute;
           top:30px;
           left:10px;
            height:40px;
          }
            .mb:hover{
              transform: translateY(-1px);
          box-shadow: 0 20px 50px rgba(34, 197, 94, 0.15);
          border-color: #22c55e;
            }
      `}</style>

      <div className="login-page">
        <button className="about-badge mb" onClick={backtoHome}>
                    <FaArrowLeft/> Back to home
         </button>
        <div className="login-layout">

          {/* Card */}
          <div className="login-card">

            <div className="login-logo">
              <img src="leaf.png" alt="EcoTracker" />
              <span>EcoTracker</span>
            </div>

            <h1 className="login-title">Welcome <span>Back</span></h1>
            <p className="login-subtitle">Log in to continue your green journey</p>

            <form onSubmit={handleSubmit}>
              <div className="login-field">
                <input
                  type="email"
                  className="login-input"
                  placeholder="Email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <div className="login-pass-wrap">
                  <input
                    type={eye ? "text" : "password"}
                    placeholder="Password"
                    name="pass"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {eye
                    ? <FiEyeOff className="login-eye" onClick={() => setEye(false)} />
                    : <FiEye className="login-eye" onClick={() => setEye(true)} />
                  }
                </div>
              </div>

              <button type="submit" className="login-btn">Log In</button>
            </form>

            <div className="login-divider">
              <div className="login-divider-line" />
              <span>or</span>
              <div className="login-divider-line" />
            </div>

            <p className="login-signup-link">
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>

          </div>

          {/* Illustration */}
          <div className="login-illustration">
            <img src="signup.png" alt="Login illustration" />
          </div>

        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </>
  );
};

export default Login;

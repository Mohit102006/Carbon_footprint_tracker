import React, { useState } from 'react'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { URL } from '../constant';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [otp, setOtp] = useState('');
  const [otpsent, setOtpsent] = useState(false);
  const [verifyotp, setVerifyotp] = useState(false);
  const [eye, setEye] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !pass) { toast.error("All information are required"); return; }
    try {
      const data = await fetch(`${URL}/auth/signup`, {
        method: "POST", headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email, pass })
      });
      await data.json();
      toast.success("Registered successfully");
    } catch (error) { toast.error(error); }
  };

  const handleOtp = async (e) => {
    e.preventDefault();
    if (!name || !email) { toast.error("All information are required"); return; }
    try {
      const res = await fetch(`${URL}/auth/sendotp`, {
        method: "POST", headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.success == 1) { toast.success(data.message); setOtpsent(true); }
      else toast.error(data.message);
    } catch (error) { toast.error(error); }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${URL}/auth/verifyOtp`, {
        method: "POST", headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();
      if (data.success == 1) { toast.success(data.message); setVerifyotp(true); }
      else toast.error(data.message);
    } catch (error) { toast.error(error); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap');

        .reg-page {
          background: #0a1a0f;
          font-family: 'Syne', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .reg-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4rem;
          width: 100%;
          max-width: 1100px;
        }

        .reg-illustration {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .reg-illustration-glow {
          position: absolute;
          width: 340px;
          height: 340px;
          background: radial-gradient(circle, #22c55e1a 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .reg-illustration img {
          width: 100%;
          max-width: 380px;
          object-fit: contain;
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 0 30px #22c55e22);
        }

        .reg-card {
          flex: 1;
          max-width: 440px;
          width: 100%;
          background: #0f2d18;
          border: 1px solid #1e3d25;
          border-radius: 1.5rem;
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
        }

        .reg-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .reg-logo img {
          width: 28px;
          height: 28px;
          object-fit: contain;
        }

        .reg-logo-text {
          font-size: 1.3rem;
          font-weight: 800;
          color: #4ade80;
          letter-spacing: -0.03em;
        }

        .reg-logo-text::before {
          content: '◈ ';
          font-size: 0.9rem;
          color: #22c55e;
        }

        .reg-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: #f0fdf4;
          letter-spacing: -0.03em;
          margin: 0 0 0.4rem 0;
        }

        .reg-title span { color: #4ade80; }

        .reg-subtitle {
          font-size: 0.85rem;
          color: #4b7a5a;
          margin: 0 0 2rem 0;
          font-weight: 600;
        }

        .reg-steps {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.75rem;
        }

        .reg-step {
          height: 4px;
          flex: 1;
          border-radius: 999px;
          background: #1e3d25;
          transition: background 0.4s;
        }

        .reg-step.active { background: #22c55e; }

        .reg-field {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .reg-input {
          background: #0a1a0f;
          border: 1px solid #1e3d25;
          border-radius: 999px;
          padding: 0.75rem 1.25rem;
          color: #f0fdf4;
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
          box-sizing: border-box;
        }

        .reg-input::placeholder { color: #4b7a5a; }
        .reg-input:focus { border-color: #22c55e; }
        .reg-input:disabled { opacity: 0.45; cursor: not-allowed; }

        .reg-pass-wrap {
          display: flex;
          align-items: center;
          background: #0a1a0f;
          border: 1px solid #1e3d25;
          border-radius: 999px;
          padding: 0 1.25rem;
          transition: border-color 0.2s;
        }

        .reg-pass-wrap:focus-within { border-color: #22c55e; }

        .reg-pass-wrap input {
          flex: 1;
          background: none;
          border: none;
          padding: 0.75rem 0;
          color: #f0fdf4;
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem;
          outline: none;
        }

        .reg-pass-wrap input::placeholder { color: #4b7a5a; }

        .reg-eye {
          color: #4b7a5a;
          cursor: pointer;
          font-size: 1.1rem;
          transition: color 0.2s;
          flex-shrink: 0;
        }

        .reg-eye:hover { color: #4ade80; }

        .reg-btn {
          background: #22c55e;
          color: #0a1a0f;
          border: none;
          padding: 0.8rem 1.75rem;
          border-radius: 999px;
          font-family: 'Syne', sans-serif;
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          width: 100%;
          margin-top: 0.25rem;
        }

        .reg-btn:hover { background: #4ade80; transform: translateY(-2px); }

        .reg-login {
          text-align: center;
          margin-top: 1.5rem;
          font-size: 0.85rem;
          color: #4b7a5a;
          font-weight: 600;
        }

        .reg-login a {
          color: #4ade80;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .reg-login a:hover { color: #86efac; }

        @media (max-width: 820px) {
          .reg-illustration { display: none; }
          .reg-inner { justify-content: center; }
          .reg-card { max-width: 480px; }
        }

        @media (max-width: 500px) {
          .reg-page { padding: 1.5rem; }
          .reg-card { padding: 2rem 1.5rem; border-radius: 1.25rem; }
        }
      `}</style>

      <div className="reg-page">
        <div className="reg-inner">

          {/* Illustration */}
          <div className="reg-illustration">
            <div className="reg-illustration-glow" />
            <img src="signup.png" alt="Sign up" />
          </div>

          {/* Card */}
          <div className="reg-card">

            <div className="reg-logo">
              <img src="leaf.png" alt="leaf" />
              <span className="reg-logo-text">EcoTracker</span>
            </div>

            <h1 className="reg-title">Create your <span>account</span></h1>
            <p className="reg-subtitle">Join EcoTracker and start your green journey</p>

            {/* Step progress bar */}
            <div className="reg-steps">
              <div className="reg-step active" />
              <div className={`reg-step${otpsent ? ' active' : ''}`} />
              <div className={`reg-step${verifyotp ? ' active' : ''}`} />
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="reg-field">
                <input
                  type="text"
                  className="reg-input"
                  placeholder="Username"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  className="reg-input"
                  placeholder="Email"
                  disabled={otpsent}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                {!otpsent ? (
                  <button className="reg-btn" onClick={handleOtp}>Send OTP</button>
                ) : !verifyotp ? (
                  <>
                    <input
                      type="text"
                      className="reg-input"
                      placeholder="Enter OTP"
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <button className="reg-btn" onClick={verifyOtp}>Verify OTP</button>
                  </>
                ) : (
                  <>
                    <div className="reg-pass-wrap">
                      <input
                        type={eye ? "text" : "password"}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      {eye
                        ? <FiEyeOff className="reg-eye" onClick={() => setEye(false)} />
                        : <FiEye className="reg-eye" onClick={() => setEye(true)} />
                      }
                    </div>
                    <button className="reg-btn" onClick={handleSubmit}>Sign Up</button>
                  </>
                )}
              </div>
            </form>

            <p className="reg-login">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          pauseOnFocusLoss
        />
      </div>
    </>
  );
};

export default Register;

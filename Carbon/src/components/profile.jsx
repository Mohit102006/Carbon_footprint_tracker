import React, { useState, useEffect } from 'react'
import { FiLogOut } from 'react-icons/fi';
import { FaFileExport, FaUser, FaEnvelope, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { URL } from '../constant';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileImage } from '../redux/profileSlice';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ReportArea from "../components/ReportArea";

const AVATARS_ROW1 = ["/a1.png", "/a2.png", "/a3.png", "/a4.png", "/a5.png"];
const AVATARS_ROW2 = ["/ag1.png", "/ag2.png", "/ag3.png", "/ag4.png", "/ag5.png"];

const Profile = () => {
  const dispatch   = useDispatch();
  const profileImg = useSelector(state => state.profile.profileImg);

  const [hovered,     setHovered]     = useState(false);
  const [name,        setName]        = useState("");
  const [email,       setEmail]       = useState("");
  const [date,        setDate]        = useState("");
  const [pop,         setPop]         = useState(false);
  const [img,         setImg]         = useState("");
  const [pimg,        setPimg]        = useState("");
  const [passPop,     setPassPop]     = useState(false);
  const [oldPass,     setOldPass]     = useState("");
  const [newPass,     setNewPass]     = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [downloadPDF, setDownloadPDF] = useState(false);
  const [showOld,     setShowOld]     = useState(false);
  const [showNew,     setShowNew]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selImg,      setSelImg]      = useState("");

  useEffect(() => {
    const getRes = async () => {
      try {
        const res  = await fetch(`${URL}/consumption/getDetails`, { method: "GET", credentials: "include" });
        const data = await res.json();
        if (data.success == 1) {
          setName(data.name); setEmail(data.email);
          setDate(data.date); setPimg(data.pi);
        }
      } catch (_) {}
    };
    getRes();
  }, []);

  const handleSaveImage = async () => {
    try {
      const res  = await fetch(`${URL}/profile/setImage`, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ig: img })
      });
      const data = await res.json();
      if (data.success == 1) {
        setTimeout(() => toast.success("Profile image updated!"), 100);
        dispatch(setProfileImage(data.proimg));
        setPimg(data.proimg); setPop(false);
      }
    } catch (_) { toast.error("Failed to save image"); }
  };

  const setLogout = async () => {
    try {
      const res  = await fetch(`${URL}/auth/logout`, { method: "POST", credentials: "include" });
      const data = await res.json();
      if (data.success == 1) {
        toast.success("Logged out successfully");
        setTimeout(() => { window.location.href = "/login"; }, 1000);
      } else { toast.error("Logout failed"); }
    } catch (_) { toast.error("Logout error"); }
  };

  const changePass = async () => {
    if (!oldPass || !newPass || !confirmPass) { toast.warning("Fill all fields"); return; }
    if (newPass !== confirmPass) { toast.error("Passwords do not match"); return; }
    try {
      const res  = await fetch(`${URL}/auth/changePass`, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, oldPass, newPass })
      });
      const data = await res.json();
      if (data.success == 1) {
        toast.success("Password changed successfully");
        setPassPop(false); setOldPass(""); setNewPass(""); setConfirmPass("");
      } else { toast.error(data.message); }
    } catch (_) { toast.error("Something went wrong"); }
  };

  const PasswordInput = ({ value, onChange, show, toggle, placeholder }) => (
    <div className="prof-pass-wrap">
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="prof-pass-input"
      />
      <span className="prof-pass-eye" onClick={toggle}>
        {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </span>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap');

        .prof-root {
          font-family: 'Syne', sans-serif;
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .prof-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 2rem 2rem 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        /* ── Main card ── */
        .prof-card {
          width: 100%;
          max-width: 520px;
          background: rgba(15,45,24,0.75);
          border: 1px solid #1e3d25;
          border-radius: 1.5rem;
          padding: 2.5rem 2rem 2rem;
          backdrop-filter: blur(10px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        /* Avatar */
        .prof-avatar-wrap {
          position: relative;
          width: 96px;
          height: 96px;
        }

        .prof-avatar {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #22c55e;
          box-shadow: 0 0 24px rgba(34,197,94,0.25);
        }

        .prof-avatar-btn {
          position: absolute;
          bottom: -4px;
          right: -4px;
          background: #22c55e;
          color: #0a1a0f;
          border: 2px solid #0a1a0f;
          border-radius: 999px;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          padding: 0.2rem 0.55rem;
          cursor: pointer;
          font-family: 'Syne', sans-serif;
          transition: background .2s;
          white-space: nowrap;
        }

        .prof-avatar-btn:hover { background: #4ade80; }

        /* Info rows */
        .prof-info {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0;
          border: 1px solid #1e3d25;
          border-radius: 1rem;
          overflow: hidden;
        }

        .prof-info-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.9rem 1.25rem;
          border-bottom: 1px solid #1e3d25;
          gap: 1rem;
        }

        .prof-info-row:last-child { border-bottom: none; }

        .prof-info-left {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          color: #4b7a5a;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          flex-shrink: 0;
        }

        .prof-info-left svg { font-size: 0.9rem; }

        .prof-info-value {
          font-size: 0.9rem;
          font-weight: 700;
          color: #86efac;
          text-align: right;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 240px;
        }

        /* Actions */
        .prof-actions {
          display: flex;
          gap: 0.75rem;
          width: 100%;
          flex-wrap: wrap;
        }

        .prof-btn {
          flex: 1;
          min-width: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border: none;
          border-radius: 0.85rem;
          font-family: 'Syne', sans-serif;
          font-size: 0.85rem;
          font-weight: 800;
          cursor: pointer;
          letter-spacing: 0.03em;
          transition: background .2s, transform .15s;
          position: relative;
          overflow: hidden;
        }

        .prof-btn:hover { transform: translateY(-2px); }

        .prof-btn-logout {
          background: #1a0a0a;
          color: #f87171;
          border: 1px solid #3d1e1e;
        }

        .prof-btn-logout:hover { background: #2d1010; border-color: #ef4444; }

        .prof-btn-export {
          background: #0f2d18;
          color: #4ade80;
          border: 1px solid #1e3d25;
        }

        .prof-btn-export:hover { border-color: #22c55e; background: #163d22; }

        .prof-btn-pass {
          width: 100%;
          background: none;
          border: 1px solid #1e3d25;
          color: #4b7a5a;
          border-radius: 0.85rem;
          font-family: 'Syne', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          padding: 0.6rem;
          letter-spacing: 0.04em;
          transition: border-color .2s, color .2s;
        }

        .prof-btn-pass:hover { border-color: #22c55e; color: #4ade80; }

        /* ── Modal backdrop ── */
        .prof-modal-bg {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(4px);
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        /* ── Avatar picker modal ── */
        .prof-avatar-modal {
          background: #0f2d18;
          border: 1px solid #1e3d25;
          border-radius: 1.5rem;
          padding: 1.75rem;
          width: 100%;
          max-width: 540px;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .prof-modal-title {
          font-size: 1rem;
          font-weight: 800;
          color: #f0fdf4;
          letter-spacing: -0.01em;
          margin: 0;
          text-align: center;
        }

        .prof-avatar-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.75rem;
        }

        .prof-avatar-opt {
          aspect-ratio: 1;
          border-radius: 50%;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid #1e3d25;
          transition: border-color .2s, transform .2s;
        }

        .prof-avatar-opt:hover   { border-color: #22c55e; transform: scale(1.08); }
        .prof-avatar-opt.chosen  { border-color: #4ade80; box-shadow: 0 0 12px rgba(74,222,128,0.4); }

        .prof-avatar-opt img { width: 100%; height: 100%; object-fit: cover; }

        .prof-modal-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
        }

        .prof-modal-save {
          background: #22c55e;
          color: #0a1a0f;
          border: none;
          padding: 0.65rem 1.75rem;
          border-radius: 999px;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 0.85rem;
          cursor: pointer;
          transition: background .2s;
        }

        .prof-modal-save:hover { background: #4ade80; }

        .prof-modal-cancel {
          background: #0a1a0f;
          color: #4b7a5a;
          border: 1px solid #1e3d25;
          padding: 0.65rem 1.75rem;
          border-radius: 999px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: border-color .2s, color .2s;
        }

        .prof-modal-cancel:hover { border-color: #22c55e; color: #86efac; }

        /* ── Password modal ── */
        .prof-pass-modal {
          background: #0f2d18;
          border: 1px solid #1e3d25;
          border-radius: 1.5rem;
          padding: 1.75rem;
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .prof-pass-wrap {
          display: flex;
          align-items: center;
          background: #0a1a0f;
          border: 1px solid #1e3d25;
          border-radius: 0.75rem;
          padding: 0 1rem;
          transition: border-color .2s;
        }

        .prof-pass-wrap:focus-within { border-color: #22c55e; }

        .prof-pass-input {
          flex: 1;
          background: none;
          border: none;
          padding: 0.75rem 0;
          color: #f0fdf4;
          font-family: 'Syne', sans-serif;
          font-size: 0.875rem;
          outline: none;
        }

        .prof-pass-input::placeholder { color: #4b7a5a; }

        .prof-pass-eye {
          color: #4b7a5a;
          cursor: pointer;
          font-size: 1.1rem;
          transition: color .2s;
          flex-shrink: 0;
        }

        .prof-pass-eye:hover { color: #4ade80; }

        @media (max-width: 500px) {
          .prof-scroll { padding: 1.25rem 1rem 2rem; }
          .prof-card   { padding: 2rem 1.25rem 1.75rem; }
          .prof-avatar-grid { grid-template-columns: repeat(5, 1fr); gap: 0.5rem; }
          .prof-info-value  { max-width: 160px; font-size: 0.82rem; }
        }
      `}</style>

      {/* ── Avatar picker modal ── */}
      <AnimatePresence>
        {pop && (
          <motion.div className="prof-modal-bg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="prof-avatar-modal"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 0.25 }}
            >
              <p className="prof-modal-title">Choose Profile Avatar</p>
              <div className="prof-avatar-grid">
                {[...AVATARS_ROW1, ...AVATARS_ROW2].map((src) => (
                  <div
                    key={src}
                    className={`prof-avatar-opt${selImg === src ? ' chosen' : ''}`}
                    onClick={() => { setImg(src); setSelImg(src); }}
                  >
                    <img src={src} alt="" />
                  </div>
                ))}
              </div>
              <div className="prof-modal-actions">
                <button className="prof-modal-save"   onClick={handleSaveImage}>Save</button>
                <button className="prof-modal-cancel" onClick={() => setPop(false)}>Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Change password modal ── */}
      <AnimatePresence>
        {passPop && (
          <motion.div className="prof-modal-bg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="prof-pass-modal"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 0.25 }}
            >
              <p className="prof-modal-title">Change Password</p>

              <PasswordInput
                value={oldPass} onChange={e => setOldPass(e.target.value)}
                show={showOld} toggle={() => setShowOld(!showOld)}
                placeholder="Old Password"
              />
              <PasswordInput
                value={newPass} onChange={e => setNewPass(e.target.value)}
                show={showNew} toggle={() => setShowNew(!showNew)}
                placeholder="New Password"
              />
              <PasswordInput
                value={confirmPass} onChange={e => setConfirmPass(e.target.value)}
                show={showConfirm} toggle={() => setShowConfirm(!showConfirm)}
                placeholder="Confirm New Password"
              />

              <div className="prof-modal-actions">
                <button className="prof-modal-save"   onClick={changePass}>Save</button>
                <button className="prof-modal-cancel" onClick={() => setPassPop(false)}>Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main ── */}
      <div className="prof-root">
        <div className="prof-scroll">
          <div className="prof-card">

            {/* Avatar */}
            <div className="prof-avatar-wrap">
              <img  src={pimg === "" ? "/profile.png" : pimg} alt="Profile" className="prof-avatar" />
              <button className="prof-avatar-btn" onClick={() => setPop(true)}>✏ Edit</button>
            </div>

            {/* Info rows */}
            <div className="prof-info">
              <div className="prof-info-row">
                <span className="prof-info-left"><FaUser /> Username</span>
                <span className="prof-info-value">{name}</span>
              </div>
              <div className="prof-info-row">
                <span className="prof-info-left"><FaEnvelope /> Email</span>
                <span className="prof-info-value" title={email}>{email}</span>
              </div>
              <div className="prof-info-row">
                <span className="prof-info-left"><FaCalendarAlt /> Since</span>
                <span className="prof-info-value">{date}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="prof-actions">
              <button
                className="prof-btn prof-btn-logout"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={setLogout}
              >
                <FiLogOut size={16} />
                {hovered ? <FaArrowRight size={14} /> : <span>Logout</span>}
              </button>

              <button className="prof-btn prof-btn-export" onClick={() => setDownloadPDF(true)}>
                <FaFileExport size={14} />
                <span>Export Report</span>
                {downloadPDF && (
                  <ReportArea name={name} email={email} onDone={() => setDownloadPDF(false)} />
                )}
              </button>
            </div>

            <button className="prof-btn-pass" onClick={() => setPassPop(true)}>
              🔒 Change Password
            </button>

          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </>
  );
};

export default Profile;

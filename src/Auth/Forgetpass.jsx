import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../store/authSlice";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Forgetpass = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isLoading } = useSelector((state) => state.authSlice);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email)).then(() => {
        navigate('/ResetCode');
      })
      .catch(() => {
        toast.error("حدث خطأ أثناء محاولة استعادة كلمة المرور. تأكد من البريد الإلكتروني وحاول مرة أخرى.");
      });
  };

  return (
    <div className="container-Login">
      <div className="heading">استعادة كلمة المرور</div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          placeholder="البريد الإلكتروني"
          id="email"
          name="email"
          type="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="submit"
          className="login-button cursor-pointer"
          value={isLoading ? 'جاري استعادة كلمة المرور...' : 'استعادة كلمة المرور'}
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default Forgetpass;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../store/authSlice";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Newpass = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isLoading, user } = useSelector((state) => state.authSlice);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ email, newPassword }));
  };

  useEffect(() => {
    if (error) {
      toast.error("حدث خطأ أثناء محاولة تعيين كلمة المرور الجديدة. حاول مرة أخرى.");
    } else if (user) {
      toast.success("تم تعيين كلمة المرور بنجاح!");
      navigate('/login');
    }
  }, [error, user, navigate]);

  return (
    <div className="container-Login">
      <div className="heading">تعيين كلمة مرور جديدة</div>
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
          placeholder="كلمة المرور الجديدة"
          id="password"
          name="password"
          type="password"
          className="input"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="submit"
          className="login-button cursor-pointer"
          value={isLoading ? 'جاري تعيين كلمة المرور...' : 'تعيين كلمة المرور'}
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default Newpass;

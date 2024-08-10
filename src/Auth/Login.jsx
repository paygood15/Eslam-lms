import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice"; // تأكد من مسار authSlice
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate , Link} from "react-router-dom";
import i18n from 'i18next';
import logo from "../assets/Dansha-logo-removebg-preview.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isLoading, user } = useSelector((state) => state.authSlice); // استخدام الاسم الصحيح للحالة

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (error) {
      toast.error("Incorrect email or password!");
    } else if (user) {
      toast.success("You are now logged in, welcome!");
      navigate('/');
    }
  }, [error, user, navigate]);



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container-Login">
      <div className="heading">تسجيل الدخول</div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          placeholder="البريد الالكتروني"
          id="email"
          name="email"
          type="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="كلمة المرور"
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span className="forgot-password"><Link to="/Forgetpass">هل نسيت كلمه المرور؟</Link></span>
        <input type="submit" className="login-button cursor-pointer" value={isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'} disabled={isLoading} />
      </form>
      <span className="agreement"><Link to="/Register">لا يوجد لديك حساب؟ انشئ حسابك الآن !</Link></span>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyResetCode } from "../store/authSlice";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const ResetCode = () => {
  const [resetCode, setResetCode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isLoading, isCodeValid } = useSelector((state) => state.authSlice);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyResetCode({ resetCode }));
  };

  useEffect(() => {
    if (error) {
      toast.error("حدث خطأ أثناء التحقق من كود الاستعادة. حاول مرة أخرى.");
    } else if (isCodeValid) {
      navigate('/Newpass');
    }
  }, [error, isCodeValid, navigate]);

  return (
    <div className="container-Login">
      <div className="heading">ادخال كود الاستعادة</div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          placeholder="كود الاستعادة"
          id="resetCode"
          name="resetCode"
          type="text"
          className="input"
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)}
          required
        />
        <input
          type="submit"
          className="login-button cursor-pointer"
          value={isLoading ? 'جاري التحقق...' : 'تحقق'}
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default ResetCode;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store/authSlice"; // Adjust the import if your action is named differently
import { fetchCategories } from "../store/CaregorySlice1";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next';
import logo from "../assets/Dansha-logo-removebg-preview.png";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [phone, setPhone] = useState("");
    const [parentPhone, setParentPhone] = useState("");
    const [category, setCategory] = useState("");
    const [governorate, setGovernorate] = useState("");
    const dispatch = useDispatch();
    const { error, isLoading, user,errorMessage } = useSelector((state) => state.authSlice);
    const { categories,status } = useSelector((state) => state.CaategorySlice1);
    console.log(error);
    console.log(categories);
    console.log(status);
    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (password.length < 6) {
            toast.error("Password must be longer than or equal to 6 characters");
            return;
        } else if (password !== passwordConfirm) {
            toast.error("Password mismatch");
            return;
        }
    
        dispatch(signup({ 
            name, 
            email, 
            password, 
            passwordConfirm, 
            governorate, 
            phone, 
            parentPhone, 
            category 
        }))
        .then((result) => {
            if (signup.fulfilled.match(result)) {
                navigate("/Login");
            } else {
                throw new Error("Signup failed");
            }
        })
        .catch((error) => {
            toast.error("Signup failed. Please try again.");
        });
    };
    useEffect(() => {
        dispatch(fetchCategories());
      
      }, [dispatch]);
     
    useEffect(() => {
        if (error && errorMessage) {
            if (errorMessage.includes("E11000 duplicate key error collection")) {
                toast.error("This email is already registered");
            } else {
                toast.error("Please enter correct data");
            }
        } else if (user) {
            toast.success("Successfully registered");
            window.location.href = "/Login";
        }
    }, [error, errorMessage, user]);

    return (
        <div className="container-Login">
            <div className="heading">أنشء حسابك الآن :</div>
            <form className="form" onSubmit={handleSubmit}>
                <input
                    placeholder="الاسم الاول"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    placeholder="الاسم الاخير"
                 
                    className="input"
                    required
                />
                <input
                    placeholder="رقم الهاتف"
                    type="number"
                    className="input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <input
                    placeholder="رقم هاتف ولي الامر"
                    type="number"
                    className="input"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    required
                />
                <select 
                id="countries" 
                value={governorate}
                onChange={(e) => setGovernorate(e.target.value)}
                required
                className="bg-white shadowSelect border-none rounded-3xl text-black text-sm w-full py-[15px] px-[20px] mt-[15px]">
                    
                    <option selected>اختر المحافظة</option>
                    <option value="Cairo">القاهرة</option>
                    <option value="Alexandria">الإسكندرية</option>
                    <option value="Giza">الجيزة</option>
                    <option value="Dakahlia">الدقهلية</option>
                    <option value="Red Sea">البحر الأحمر</option>
                    <option value="Beheira">البحيرة</option>
                    <option value="Fayoum">الفيوم</option>
                    <option value="Gharbia">الغربية</option>
                    <option value="Ismailia">الإسماعيلية</option>
                    <option value="Menofia">المنوفية</option>
                    <option value="Minya">المنيا</option>
                    <option value="Qaliubiya">القليوبية</option>
                    <option value="New Valley">الوادي الجديد</option>
                    <option value="Suez">السويس</option>
                    <option value="Aswan">أسوان</option>
                    <option value="Assiut">أسيوط</option>
                    <option value="Beni Suef">بني سويف</option>
                    <option value="Port Said">بورسعيد</option>
                    <option value="Damietta">دمياط</option>
                    <option value="Sharkia">الشرقية</option>
                    <option value="South Sinai">جنوب سيناء</option>
                    <option value="Kafr El Sheikh">كفر الشيخ</option>
                    <option value="Matrouh">مطروح</option>
                    <option value="Luxor">الأقصر</option>
                    <option value="Qena">قنا</option>
                    <option value="North Sinai">شمال سيناء</option>
                    <option value="Sohag">سوهاج</option>
                </select>
                <select
                    id="categories"
                    className="bg-white shadowSelect border-none rounded-3xl text-black text-sm w-full py-[15px] px-[20px] mt-[15px]"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="" disabled selected>اختر الصف</option>
                    {categories.data?.map((cat) => (
                        <option key={cat._id
                        } value={cat._id
                        }>
                            {cat.name}
                        </option>
                    ))}
                </select>
                <input
                    placeholder="البريد الاكتروني"
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
                    type="password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    placeholder="تاكيد كلمة المرور"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    className="input"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    required
                />
                <input value={isLoading ? 'جاري انشاء حساب...' : 'انشاء حساب'} type="submit" className="login-button cursor-pointer" />
            </form>
            <span className="agreement"><Link to={"/Login"}>يوجد لديك حساب بالفعل؟ ادخل إلى حسابك الآن !</Link></span>
        </div>
    );
};

export default Register;

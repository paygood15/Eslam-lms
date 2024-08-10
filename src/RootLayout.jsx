
import { Outlet ,useLocation} from "react-router-dom";
import {  ToastContainer } from 'react-toastify';
import Header from "./component/Header"
import Footer from "./component/Footer";
import AdminHeader from "./pages/Admin/AdminHeader";
// import Facebook from "./component/Facebook";
const RootLayout = () => {
  const location = useLocation();
  const Headers = location.pathname.includes("/Admin")  ? < AdminHeader/> : <Header />;
  const Fotters = location.pathname.includes("/Admin")  ? "" : <Footer />;
  

  return (
    <>
    {/* <Facebook /> */}
    <ToastContainer />
    {Headers  }
      <Outlet />
      {Fotters} 
    </>
  );
};

export default RootLayout;

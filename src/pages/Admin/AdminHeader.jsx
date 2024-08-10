import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import img5 from "../../assets/Admin5.svg";
import img4 from "../../assets/Admin4.svg";
import img3 from "../../assets/Admin3.svg";
import img2 from "../../assets/Admin2.svg";
import img1 from "../../assets/Admin1.svg";
import menu1 from "../../assets/Menu1.svg";
import menu2 from "../../assets/menu2.svg";
import menu3 from "../../assets/menu3.svg";

const LogoutPopup = ({ onLogout, onClose, showPopup }) => (
  <div
    className={`popup absolute top-16 right-0 bg-white border border-gray-300 shadow-lg rounded-lg p-4 z-50 transition-opacity duration-300 ${showPopup ? "popup-transition-enter-active" : "popup-transition-exit-active"}`}
  >
    <p className="mb-2">Do you want to logout?</p>
    <button
      onClick={() => {
        onLogout();
        onClose();
      }}
      className="bg-red-500 text-white py-1 px-4 rounded-lg mr-2"
    >
      Logout
    </button>
    <button onClick={onClose} className="bg-gray-300 py-1 px-4 rounded-lg">
      Cancel
    </button>
  </div>
);

const AdminHeader = () => {
  const navigate = useNavigate();
  const handleFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
      document.documentElement.msRequestFullscreen();
    }
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openAccordions, setOpenAccordions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleAccordion = (index) => {
    setOpenAccordions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userRole");
    window.location.href = "/";
  };


  return (
    <>
      <div className="ltr Pop bg-white p-[20px] shadow-md gap-4 flex justify-between items-center">
        <div className="ltr Left-Section flex gap-5 items-center">
          <div
            className={`bars flex flex-col gap-1 relative cursor-pointer ${isDrawerOpen ? "Hide" : "Show"}`}
            onClick={toggleDrawer}
          >
            <div
              className={`bar1 w-5 h-0.5 relative transition-all ease-in-out duration-300 bg-white ${isDrawerOpen ? "transform rotate-45 translate-y-1" : ""}`}
            ></div>
            <div
              className={`bar2 overflow-hidden w-5 h-0.5 relative transition-all ease-linear duration-300 bg-white ${isDrawerOpen ? "right-8 opacity-0 invisible" : "right-0 visible"}`}
            ></div>
            <div
              className={`bar3 w-5 h-0.5 relative transition-all ease-in-out duration-300 bg-white ${isDrawerOpen ? "bottom-1 h-0.5 transform -rotate-45 -translate-y-1" : ""}`}
            ></div>
          </div>
          <div className="Main-Txt">
            <h1 className="text-[28px] font-bold">Webix</h1>
          </div>
        </div>
        <div className="Rihjt-Section flex gap-[15px] items-center cursor-pointer">
          <div className="cover-Img5 FilterAdmin" onClick={handleFullscreen}>
            <img src={img1} alt="img1" />
          </div>
          <div onClick={()=> {
            navigate("/Admin/AllCourse")
          }} className="cover-Img5 FilterAdmin ">
            <img src={img2} alt="img2" />
          </div>
          <div  onClick={()=> {
            navigate("/Admin/AllUsers")
          }} className="cover-Img5 FilterAdmin">
            <img src={img3} alt="img3" />
          </div>
          <div onClick={()=> {
            navigate("/Admin/AllOrders")
          }}  className="cover-Img5 FilterAdmin">
            <img src={img4} alt="img4" />
          </div>
          <div className="cover-Img5 bg-white p-[8px] rounded-[18px]  relative">
            <img src={img5} className="rotate-animation" alt="img5" onClick={() => setShowPopup(true)} />
            <LogoutPopup
              onLogout={handleLogout}
              onClose={() => setShowPopup(false)}
              showPopup={showPopup}
            />
          </div>
        </div>
      </div>

      <div
        className={`ltr shadow-2xl fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform ${isDrawerOpen ? "" : "-translate-x-full"} bg-white z-[61]`}
        id="drawer-navigation"
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
          Menu
        </h5>
        <button
          type="button"
          onClick={toggleDrawer}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
            <Link to={"/Admin/AllOrders"}
                className="flex admin-hoverlist duration-500 items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover: group cursor-pointer"
                onClick={() => toggleAccordion(-1)}
              >
                <div className="flex items-center">
                  <div className="cover-Img-hover hover:bg bg-white p-[8px] rounded-[18px] shadow">
                    <img src={menu1} alt="menu1" />
                  </div>
                  <span className="ms-3 text-[#67748E]">All orders</span>
                </div>
              </Link>
              <div
                className="flex admin-hoverlist duration-500 items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover: group cursor-pointer"
                onClick={() => toggleAccordion(0)}
              >
                <div className="flex items-center">
                  <div className="cover-Img-hover hover:bg bg-white p-[8px] rounded-[18px] shadow">
                    <img src={menu1} alt="menu1" />
                  </div>
                  <span className="ms-3 text-[#67748E]">Courses</span>
                </div>
                <span className="text-lg text-[#67748E]">{openAccordions.includes(0) ? "-" : "+"}</span>
              </div>
              <div className={`overflow-hidden transition-all duration-500 ${openAccordions.includes(0) ? "max-h-screen" : "max-h-0"}`}>
                <div className="ml-4">
                  <Link to="/Admin/AddCourse" className="block  py-2 text-[#4FCB8D]">
                    Add Course
                  </Link>
                  <Link to="/Admin/AllCourse" className="block py-2 ">
                    All Courses
                  </Link>
                  {/* <Link to="/Admin/Product3" className="block py-2 ">
                    Product 3
                  </Link> */}
                </div>
              </div>
            </li>
            <li>
              <div
                className="flex admin-hoverlist duration-500 items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover: group cursor-pointer"
                onClick={() => toggleAccordion(1)}
              >
                <div className="flex items-center">
                  <div className="cover-Img-hover hover:bg bg-white p-[8px] rounded-[18px] shadow">
                    <img src={menu2} alt="menu2" />
                  </div>
                  <span className="ms-3 text-[#67748E]">Classes</span>
                </div>
                <span className="text-lg text-[#67748E]">{openAccordions.includes(1) ? "-" : "+"}</span>
              </div>
              <div className={`overflow-hidden transition-all duration-500 ${openAccordions.includes(1) ? "max-h-screen" : "max-h-0"}`}>
                <div className="ml-4">
                  <Link to="/Admin/AddClass" className="block py-2 text-[#4FCB8D]">
                  Add Classes
                  </Link>
                  <Link to="/Admin/AllClasses" className="block py-2 ">
                   All Classes
                  </Link>
                  {/* <Link to="/Admin/Category3" className="block py-2 ">
                    Category 3
                  </Link> */}
                </div>
              </div>
            </li>
            <li>
              <div
                className="flex admin-hoverlist duration-500 items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover: group cursor-pointer"
                onClick={() => toggleAccordion(2)}
              >
                <div className="flex items-center">
                  <div className="cover-Img-hover hover:bg bg-white p-[8px] rounded-[18px] shadow">
                    <img src={menu3} alt="menu2" />
                  </div>
                  <span className="ms-3 text-[#67748E]">Category Course</span>
                </div>
                <span className="text-lg text-[#67748E]">{openAccordions.includes(2) ? "-" : "+"}</span>
              </div>
              <div className={`overflow-hidden transition-all duration-500 ${openAccordions.includes(2) ? "max-h-screen" : "max-h-0"}`}>
                <div className="ml-4">
                  <Link to="/Admin/AddSection" className="block py-2 text-[#4FCB8D]">
                    Add Category Course
                  </Link>
                  <Link to="/Admin/AllSection" className="block py-2 ">
                    All Category Course
                  </Link>
                  {/* <Link to="/Admin/Category3" className="block py-2 ">
                    Category 3
                  </Link> */}
                </div>
              </div>
            </li>
            <li>
              <div
                className="flex admin-hoverlist duration-500 items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover: group cursor-pointer"
                onClick={() => toggleAccordion(3)}
              >
                <div className="flex items-center">
                  <div className="cover-Img-hover hover:bg bg-white p-[8px] rounded-[18px] shadow">
                    <img src={menu2} alt="menu2" />
                  </div>
                  <span className="ms-3 text-[#67748E]">Doors</span>
                </div>
                <span className="text-lg text-[#67748E]">{openAccordions.includes(3) ? "-" : "+"}</span>
              </div>
              <div className={`overflow-hidden transition-all duration-500 ${openAccordions.includes(3) ? "max-h-screen" : "max-h-0"}`}>
                <div className="ml-4">
                  <Link to="/Admin/AddDoors" className="block py-2 text-[#4FCB8D]">
                  Add Doors
                  </Link>
                  <Link to="/Admin/AllDoors" className="block py-2 ">
                   All Doors
                  </Link>
                  {/* <Link to="/Admin/Category3" className="block py-2 ">
                    Category 3
                  </Link> */}
                </div>
              </div>
            </li>
            <li>
              <div
                className="flex admin-hoverlist duration-500 items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover: group cursor-pointer"
                onClick={() => toggleAccordion(4)}
              >
                <div className="flex items-center">
                  <div className="cover-Img-hover hover:bg bg-white p-[8px] rounded-[18px] shadow">
                    <img src={menu2} alt="menu2" />
                  </div>
                  <span className="ms-3 text-[#67748E]">Lessons</span>
                </div>
                <span className="text-lg text-[#67748E]">{openAccordions.includes(4) ? "-" : "+"}</span>
              </div>
              <div className={`overflow-hidden transition-all duration-500 ${openAccordions.includes(4) ? "max-h-screen" : "max-h-0"}`}>
                <div className="ml-4">
                  <Link to="/Admin/AddLesson" className="block py-2 text-[#4FCB8D]">
                    Add Lesson
                  </Link>
                  <Link to="/Admin/AllLesson" className="block py-2 ">
                   All Lessons
                  </Link>
                  {/* <Link to="/Admin/Category3" className="block py-2 ">
                    Category 3
                  </Link> */}
                </div>
              </div>
            </li>
            <li>
              <div
                className="flex admin-hoverlist duration-500 items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover: group cursor-pointer"
                onClick={() => toggleAccordion(5)}
              >
                <div className="flex items-center">
                  <div className="cover-Img-hover hover:bg bg-white p-[8px] rounded-[18px] shadow">
                    <img src={menu2} alt="menu2" />
                  </div>
                  <span className="ms-3 text-[#67748E]">Code Course</span>
                </div>
                <span className="text-lg text-[#67748E]">{openAccordions.includes(5) ? "-" : "+"}</span>
              </div>
              <div className={`overflow-hidden transition-all duration-500 ${openAccordions.includes(5) ? "max-h-screen" : "max-h-0"}`}>
                <div className="ml-4">
                  <Link to="/Admin/AddCode" className="block py-2 text-[#4FCB8D]">
                   Add Code
                  </Link>
                  <Link to="/Admin/AllCode" className="block py-2 ">
                   All Code
                  </Link>
                  {/* <Link to="/Admin/Category3" className="block py-2 ">
                    Category 3
                  </Link> */}
                </div>
              </div>
            </li>
            <li>
              <div
                className="flex admin-hoverlist duration-500 items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover: group cursor-pointer"
                onClick={() => toggleAccordion(6)}
              >
                <div className="flex items-center">
                  <div className="cover-Img-hover hover:bg bg-white p-[8px] rounded-[18px] shadow">
                    <img src={menu2} alt="menu2" />
                  </div>
                  <span className="ms-3 text-[#67748E]">Exams</span>
                </div>
                <span className="text-lg text-[#67748E]">{openAccordions.includes(6) ? "-" : "+"}</span>
              </div>
              <div className={`overflow-hidden transition-all duration-500 ${openAccordions.includes(6) ? "max-h-screen" : "max-h-0"}`}>
                <div className="ml-4">
                  <Link to="/Admin/AddExam" className="block py-2 text-[#4FCB8D]">
                    Add Exam
                  </Link>
                  <Link to="/Admin/AddQuestion" className="block py-2 ">
                  Add Question
                  </Link>
                  <Link to="/Admin/AllExam" className="block py-2 ">
                  All Exam
                  </Link>
                  <Link to="/Admin/AllQuestion" className="block py-2 ">
                  All Question
                  </Link>
                  {/* <Link to="/Admin/Category3" className="block py-2 ">
                    Category 3
                  </Link> */}
                </div>
              </div>
            </li>
            <li>
              <div
                className="flex admin-hoverlist duration-500 items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover: group cursor-pointer"
                onClick={() => toggleAccordion(7)}
              >
                <div className="flex items-center">
                  <div className="cover-Img-hover hover:bg bg-white p-[8px] rounded-[18px] shadow">
                    <img src={menu2} alt="menu2" />
                  </div>
                  <span className="ms-3 text-[#67748E]">Add File</span>
                </div>
                <span className="text-lg text-[#67748E]">{openAccordions.includes(7) ? "-" : "+"}</span>
              </div>
              <div className={`overflow-hidden transition-all duration-500 ${openAccordions.includes(7) ? "max-h-screen" : "max-h-0"}`}>
                <div className="ml-4">
                  <Link to="/Admin/AddFileLesson" className="block py-2 text-[#4FCB8D]">
                    Add File
                  </Link>
                  <Link to="/Admin/AllFileLesson" className="block py-2 ">
                   All Files
                  </Link>

                  
                  {/* <Link to="/Admin/Category3" className="block py-2 ">
                    Category 3
                  </Link> */}
                </div>
                
              </div>
              <Link to={"/Admin/AllUsers"}
                className="flex admin-hoverlist duration-500 items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover: group cursor-pointer"
                onClick={() => toggleAccordion(-1)}
              >
                <div className="flex items-center">
                  <div className="cover-Img-hover hover:bg bg-white p-[8px] rounded-[18px] shadow">
                    <img src={menu1} alt="menu1" />
                  </div>
                  <span className="ms-3 text-[#67748E]">All Users</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;

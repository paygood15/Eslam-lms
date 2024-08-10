import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Nav = (open, setOpen) => {
  const { t } = useTranslation();
  const close =()=> {
    setOpen(!open)
  }
  return (
    <ul
      className={` *:transition-all mr-10 nav overflow-hidden flex gap-4 text-lg     
            w-full sm:relative absolute sm:left-auto 
          left-0 sm:top-0 max-sm:border-b-2  max-sm:border-blue-500 max-sm:border-solid  ${
            open?.open ? " bottom-[-141%] bg-[#c10f41] rounded-lg" : " bottom-52"
          } 
             transition-all duration-500 ease-in-out sm:min-h-fit 
           sm:p-0  p-[15px] sm:flex-row flex-col justify-center ps-2 z-50  sm:hidden`}
    >
      <li
        className="nav-item relative sm:after:absolute after:content-['']
             after:h-0.5  after:right-0 after:bottom-0 
             after:transition after:duration-300 after:w-full after:scale-x-0 after:origin-bottom-right after:bg-blue-500
              hover:bg-transparent  hover:after:origin-bottom-left hover:after:scale-x-100  "
      >
        <NavLink

          className="nav-link text-[13px] bg-[#7b0425] rounded-[14px] border-none hover:rounded-2xl flex items-center p-[10px] gap-1    text-white   py-2 px-6 focus:outline-none hover:bg-transparent duration-300 hover:scale-105"
          to={"/Register"}
        >
          
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                d="M19,11v9h-5v-6h-4v6H5v-9H3.6L12,3.4l8.4,7.6H19z"
                opacity=".3"
              ></path>
              <path d="M20,21h-7v-6h-2v6H4v-9H1l11-9.9L23,12h-3V21z M15,19h3v-8.8l-6-5.4l-6,5.4V19h3v-6h6V19z"></path>
            </svg>
            انشئ حسابك !
       
        </NavLink>
      </li>
      <li
        onClick={()=> {
          setOpen(!open)
           }}
        className="nav-item relative text-[13px]  sm:after:absolute after:content-[''] 
             after:h-0.5  after:right-0 after:bottom-0 
             after:transition after:duration-300 after:w-full after:scale-x-0 after:origin-bottom-right after:bg-blue-500
              hover:bgColor hover:after:origin-bottom-left hover:after:scale-x-100  "
      >
        <NavLink
       
          className="nav-link text-[13px] bg-[#7b0425] rounded-[14px] border-none hover:rounded-2xl flex items-center p-[10px] gap-1    text-white   py-2 px-6 focus:outline-none hover:bg-transparent duration-300 hover:scale-105"
          to={"/Login"}
        >
        
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="#2196f3"
                d="M15.25 18c0 1.654-1.346 3-3 3H9.5a.998.998 0 0 1-.934-.644l-7.25-19A.998.998 0 0 1 2.25 0h10c1.654 0 3 1.346 3 3z"
              />
              <path
                fill="#64b5f6"
                d="M9.25 4v18c0 .69-.56 1.25-1.25 1.25-.14 0-.27-.02-.4-.06l-6-2c-.49-.17-.85-.64-.85-1.19V2C.75 1.31 1.31.75 2 .75c.14 0 .27.02.4.06l6 2c.49.17.85.64.85 1.19z"
              />
              <path
                fill="#64b5f6"
                d="m7.363 23.901-6.008-2.003A2.01 2.01 0 0 1 0 20V2C0 .683 1.281-.318 2.637.099l6.008 2.003A2.01 2.01 0 0 1 10 4v18c0 1.103-.897 2-2 2-.214 0-.417-.031-.637-.099zM1.5 2v18c0 .213.142.411.337.479l5.983 1.995c.325.098.68-.135.68-.474V4a.516.516 0 0 0-.337-.479L2.179 1.527A.571.571 0 0 0 2 1.5a.5.5 0 0 0-.5.5z"
              />
              <path d="M23.25 11.25h-9.5a.75.75 0 0 1 0-1.5h9.5a.75.75 0 0 1 0 1.5z" />
              <path d="M19.5 15a.75.75 0 0 1-.53-1.281l3.22-3.22-3.22-3.22a.75.75 0 1 1 1.061-1.061l3.75 3.75a.75.75 0 0 1 0 1.061l-3.75 3.75A.745.745 0 0 1 19.5 15zM8 24c-.214 0-.417-.03-.62-.093l-6.018-2.005A2.018 2.018 0 0 1 0 20V2C0 .897.897 0 2 0c.214 0 .417.03.62.093l6.018 2.005A2.018 2.018 0 0 1 10 4v18c0 1.103-.897 2-2 2zM2 1.5c-.275 0-.5.225-.5.5v18a.52.52 0 0 0 .347.482l5.99 1.996A.54.54 0 0 0 8 22.5c.275 0 .5-.225.5-.5V4a.52.52 0 0 0-.347-.482l-5.99-1.996A.54.54 0 0 0 2 1.5z" />
              <path d="M15.25 8a.75.75 0 0 1-.75-.75v-4.5c0-.689-.561-1.25-1.25-1.25H2A.75.75 0 0 1 2 0h11.25A2.752 2.752 0 0 1 16 2.75v4.5a.75.75 0 0 1-.75.75zM13.25 21h-4a.75.75 0 0 1 0-1.5h4c.689 0 1.25-.561 1.25-1.25v-4.5a.75.75 0 0 1 1.5 0v4.5A2.752 2.752 0 0 1 13.25 21z" />
            </svg>
            تسجيل الدخول

        </NavLink>
      </li>
    </ul>
  );
};

export default Nav;

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { getAllUsers, deleteUser } from "../../store/UserAdminSlice";
import Loading from "../../utils/Loading";
import i18n from 'i18next';
const UsersAdmin = () => {
  {
    i18n.language === 'ar' ? document.body.dir = 'ltr' : document.body.dir = 'ltr';
  }
    // const { UsersAll,loading } = useSelector((state) => state.UserAdminSlice);
    // const userToken = useSelector((state) => state.LoginSlice.userToken);
    const userToken = localStorage.getItem("userToken")
    const userRole = localStorage.getItem("userRole")
    const dispatch = useDispatch();

    // useEffect(() => {
    //   dispatch(getAllUsers());
    // }, [dispatch]);

    if (!userToken || userRole !== "admin") {
        return    window.location.href = "/";
      }
  return (
    <>
     {userToken ? (
      userRole === "admin" ? 
    <body className="bg-gray-800 ">
      {loading? <Loading/>:<div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3 m-3">
     <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
             <tr>
                 <th scope="col" className="px-6 py-3">
                     User name
                 </th>
                 <th scope="col" className="px-6 py-3">
                     User email
                 </th>
                 <th scope="col" className="px-6 py-3">
                 User phone
                 </th>
                 <th scope="col" className="px-6 py-3">
                 User createdAt
                 </th>
                 <th scope="col" className="px-6 py-3">
                     <span className="sr-only">Del</span>
                 </th>
             </tr>
         </thead>
         <tbody>
         {UsersAll?.data?.map((User, index) => (
              <tr  key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <td>{User.name}</td>
              </th>
              <td className="px-6 py-4">
              {User.email}
                  
              </td>
              <td className="px-6 py-4">
              {User.phone}
                  
              </td>
              <td className="px-6 py-4">
              {User.createdAt}
              </td>
           
              <td className="px-6 py-4 flex justify-center gap-4 ">
               
                  <button   onClick={() => {
                        dispatch(deleteUser(User._id)).then(() => {
                          dispatch(getAllUsers());
                        });
                      }}className=" font-medium text-red-600 dark:text-red-600 hover:underline">Del</button>
              </td>
          </tr>
        ))}
            
          
          
         </tbody>
     </table>
 </div>}
    </body>
     
 :navigate("/")
) : (navigate("/"))}
    </>
  )
}

export default UsersAdmin
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import i18n from 'i18next';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// import {
//   addCategory,
//   deleteCategory,
//   getAdminCategories,
// } from "../../store/CategorySlice";
import Loading from "../../utils/Loading";
import { Link } from "react-router-dom";
const AdminCategory = () => {
  const [name, setName] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  // const { categoriesAdmin ,loadingCategories} = useSelector((state) => state.CategorySlice);

  // useEffect(() => {
  //   dispatch(getAdminCategories());
  // }, [dispatch]);

  {
      i18n.language === 'ar' ? document.body.dir = 'ltr' : document.body.dir = 'ltr';
    }
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("nameAr", nameAr);
    formData.append("image", image);
    dispatch(addCategory(formData)).then(() => {
      toast.success(`تمت اضافه النوع بنجاح`)
        dispatch(getAdminCategories())
      setName("");
      setImage(null);
    }).catch(error => {
      // معالجة الخطأ إذا كان هناك
      toast.error("حدث خطأ أثناء معالجة الطلب");
    })
  };

  return (
    <>
      <body className="bg-gray-800">
        {loadingCategories ? <Loading/> : <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3 m-3">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                Name
                </th>
                <th scope="col" className="px-6 py-3">
                Name Arabic
                </th>
                <th scope="col" className="px-6 py-3">
                DATE & TIME	
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                Edit & Delete
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {categoriesAdmin?.data?.map((category, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <td>{index + 1}</td>
                  </th>
                  <td className="px-6 py-4">{category.name}</td>
                  <td className="px-6 py-4">{category.nameAr}</td>
                  <td className="px-6 py-4">{category.createdAt}</td>
                  <td className="px-6 py-4 flex justify-center gap-4 ">
                    <Link 
                      to={`/Admin/EditCategory/${category._id}`}
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        dispatch(deleteCategory(category._id));
                        dispatch(getAdminCategories());
                      }}
                      className=" font-medium text-red-600 dark:text-red-600 hover:underline"
                    >
                      Del
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}

   
        {/* Start Add Category */}
       
        <form
          onSubmit={handleSubmit}
          className="max-w-md bg-gray-800 mx-auto p-3"
        >
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label
              for="floating_email"
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Category Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
            />
            <label
              for="floating_email"
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Category NameAr
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="file"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={(e) => setImage(e.target.files[0])}
            ></input>
            <label
              for="floating_password"
              className="peer-focus:font-medium absolute text-sm  text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Img Category
            </label>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </body>
    </>
  );
};

export default AdminCategory;

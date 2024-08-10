
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import App from './App.jsx'

import Produect from "./pages/Produect.jsx";

import UserMe from "./pages/UserMe.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Login from "./Auth/Login.jsx";
import Register from "./Auth/Register.jsx";
import Exam from "./pages/Exam.jsx";
import VidioCourse from "./pages/VidioCourse.jsx";


import Forgetpass from "./Auth/Forgetpass.jsx";
import ResetCode from "./Auth/ResetCode.jsx";
import Newpass from "./Auth/Newpass.jsx";

import AllStatic from "./pages/Admin/AllStatic.jsx";
// Admin pages
import AddCourse from "./pages/Admin/AddCourse.jsx";
import AddClass from "./pages/Admin/AddClasses.jsx";
import AddSection from "./pages/Admin/AddSection.jsx"
import AddDoors from "./pages/Admin/AddDoors.jsx"
import AddLesson from "./pages/Admin/AddLesson.jsx"
import AddCode from "./pages/Admin/AddCode.jsx";
import AddExam from "./pages/Admin/AddExam.jsx";
import AddQuestion from "./pages/Admin/AddQuestion.jsx";
import AddFileLesson from "./pages/Admin/AddFileLesson.jsx";

import AllCourse from "./pages/Admin/AllCourse.jsx";
import AllClasses from "./pages/Admin/AllClasses.jsx";
import AllSection from "./pages/Admin/AllSection.jsx";
import AllDoors from "./pages/Admin/AllDoors.jsx";
import AllLesson from "./pages/Admin/AllLesson.jsx";
import AllCode from "./pages/Admin/AllCode.jsx";
import AllExam from "./pages/Admin/AllExam.jsx";
import AllQuestion from "./pages/Admin/AllQuestion.jsx";
import AllFileLesson from "./pages/Admin/AllFileLesson.jsx";
import AllOrders from "./pages/Admin/AllOrders.jsx";
import AllUsers from "./pages/Admin/AllUsers.jsx";

import EditCourse from "./pages/Admin/EditCourse.jsx";
import EditClasses from "./pages/Admin/EditClasses.jsx";
import EditSection from "./pages/Admin/EditSection.jsx";
import EditDoors  from "./pages/Admin/EditDoors.jsx";
import EditLesson from "./pages/Admin/EditLesson.jsx";
import EditCode from "./pages/Admin/EditCode.jsx";
import EditExam from "./pages/Admin/EditExam.jsx";
import EditQuestion from "./pages/Admin/EditQuestion.jsx";
import EditFileLesson from "./pages/Admin/EditFileLesson.jsx";




import AdminCategory from "./pages/Admin/AdminCategory.jsx";
import AdminEmail from "./pages/Admin/AdminEmail.jsx";
import AdminOrder from "./pages/Admin/AdminOrder.jsx";
import UsersAdmin from "./pages/Admin/UsersAdmin.jsx";
import EditProducts from "./pages/Admin/EditProducts.jsx";
import store from "./store/store.jsx";
import './index.css'


import RootLayout from "./RootLayout.jsx"
const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <App /> },

        { path: "/Course/:id", element: <Produect /> },
        { path: "/Exam/:id", element: <Exam /> },
        { path: "/VidioCourse/:id", element: <VidioCourse /> },

        { path: "Login", element: <Login /> },
        { path: "Register", element: <Register /> },
        { path: "UserMe", element: <UserMe /> },
        { path: "Login", element: <Login /> },
        { path: "Register", element: <Register /> },


        { path: "Forgetpass", element: <Forgetpass /> },
        { path: "ResetCode", element: <ResetCode /> },
        { path: "Newpass", element: <Newpass /> },

        { path: "/Admin/AddCourse", element: <AddCourse /> },
        { path: "/Admin/AddClass", element: <AddClass /> },
        { path: "/Admin/AddSection", element: <AddSection /> },
        { path: "/Admin/AddDoors", element: <AddDoors /> },
        { path: "/Admin/AddLesson", element: <AddLesson /> },
        { path: "/Admin/AddCode", element: <AddCode /> },
        { path: "/Admin/AddExam", element: <AddExam /> },
        { path: "/Admin/AddQuestion", element: <AddQuestion /> },
        { path: "/Admin/AddFileLesson", element: <AddFileLesson /> },



        { path: "/Admin/AllCourse", element: <AllCourse /> },
        { path: "/Admin/AllClasses", element: <AllClasses /> },
        { path: "/Admin/AllSection", element: <AllSection /> },
        { path: "/Admin/AllDoors", element: <AllDoors /> },
        { path: "/Admin/AllCode", element: <AllCode /> },
        { path: "/Admin/AllLesson", element: <AllLesson /> },
        { path: "/Admin/AllExam", element: <AllExam /> },
        { path: "/Admin/AllQuestion", element: <AllQuestion /> },
        { path: "/Admin/AllFileLesson", element: <AllFileLesson /> },
        { path: "/Admin/AllStatic", element: <AllStatic /> },
        { path: "/Admin/AllOrders", element: <AllOrders /> },
        { path: "/Admin/AllUsers", element: <AllUsers /> },
        


        { path: "/Admin/EditCourse/:id", element: <EditCourse /> },
        { path: "/Admin/EditClasses/:id", element: <EditClasses /> },
        { path: "/Admin/EditSection/:id", element: <EditSection /> },
        { path: "/Admin/EditDoors/:id", element: <EditDoors /> },
        { path: "/Admin/EditLesson/:id", element: <EditLesson /> },
        { path: "/Admin/EditCode/:id", element: <EditCode /> },
        { path: "/Admin/EditExam/:id", element: <EditExam /> },
        { path: "/Admin/EditQuestion/:id", element: <EditQuestion /> },
        { path: "/Admin/EditFileLesson/:id", element: <EditFileLesson /> },





        { path: "AdminCategory", element: <AdminCategory /> },
        { path: "AdminEmail", element: <AdminEmail /> },
        { path: "AdminUsers", element: <UsersAdmin /> },
        { path: "AdminOrder", element: <AdminOrder /> },
        { path: "/Admin/EditProducts/:id", element: <EditProducts /> },
      ]
    }
  ]);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);









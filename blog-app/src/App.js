import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./admin/Layout";
import AddBlog from "./admin/addBlog/AddBlog";
import AddCategory from "./admin/addCategory/AddCategory";
import BlogLIsts from "./admin/blogLists/BlogLIsts";
import CategoryLists from "./admin/categoryLIsts/CategoryLists";
import CommentLIsts from "./admin/commentLists/CommentLIsts";
import Dashboard from "./admin/dashboard/Dashboard";
import Home from "./admin/home/Home";
import Login from "./admin/login/Login";
import Logout from "./admin/logout/Logout";
import { isLogin } from "./checkAuth";
import UserLayout from "./users/UserLayout";
import About from "./users/about/About";
import Blogs from "./users/blogs/Blogs";
import Contact from "./users/contact/Contact";
import UserHome from "./users/home/UserHome";
import UserLogin from "./users/login/UserLogin";

const router = createBrowserRouter([
    {path: "", element: <UserLayout />, children: [
        { path: "", element: <UserHome /> },
        { path: "home", element: <UserHome /> },
        { path: "blog", element: <Blogs /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        { path: "login", element: <UserLogin /> },
      ],
    },
    {path: "admin", element: <Layout />, children: [
      { path: "login", element: <Login /> },
      {path: "dashboard", loader: isLogin, element: <Dashboard />, children: [
          { path: "", element: <Home /> },
          { path: "blog", element: <BlogLIsts /> },
          { path: "add-blog", element: <AddBlog key="add" mode="add" /> },
          { path: "category", element: <CategoryLists /> },
          {path: "add-category", element: <AddCategory key="add" mode="add" />},
          { path: "comment", element: <CommentLIsts /> },
          { path: "logout", element: <Logout /> },
          {path: "update-category", element: <AddCategory key="update" mode="update" />},
          {path: "update-blog", element: <AddBlog key="update" mode="update" />},
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;

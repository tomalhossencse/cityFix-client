import { createBrowserRouter } from "react-router";
import Home from "../Page/Home/Home";
import MainLayout from "../Layout/MainLayout";
import Register from "../Page/Register/Register";
import Login from "../Page/Login/Login";
import Allissues from "../Page/Allissues/Allissues";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "all-issues",
        Component: Allissues,
      },
    ],
  },
]);

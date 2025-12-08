import { createBrowserRouter } from "react-router";
import Home from "../Page/Home/Home";
import MainLayout from "../Layout/MainLayout";
import Register from "../Page/Register/Register";
import Login from "../Page/Login/Login";
import Allissues from "../Page/Allissues/Allissues";
import AddIssue from "../Page/AddIssue/AddIssue";
import IssueDetails from "../Page/IssueDetails/IssueDetails";
import PrivateRoute from "./PrivateRoute";

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
      {
        path: "add-issue",
        Component: AddIssue,
      },
      {
        path: "all-issues/:id",
        element: (
          <PrivateRoute>
            <IssueDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

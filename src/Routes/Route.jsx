import { createBrowserRouter } from "react-router";
import Home from "../Page/Home/Home";
import MainLayout from "../Layout/MainLayout";
import Register from "../Page/Register/Register";
import Login from "../Page/Login/Login";
import Allissues from "../Page/Allissues/Allissues";
import AddIssue from "../Page/AddIssue/AddIssue";
import IssueDetails from "../Page/IssueDetails/IssueDetails";
import PrivateRoute from "./PrivateRoute";
import Payment from "../Page/Payment/Payment";
import PaymentSuccess from "../Page/PaymentSuccess/PaymentSuccess";
import PaymentCancel from "../Page/PaymentCancel/PaymentCancel";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardHome from "../Page/Dashboard/DashboarHome/DashboarHome";
import MyIssues from "../Page/MyIssues/MyIssues";
import Profile from "../Page/Profile/Profile";
import AllIssuesDashboard from "../Page/AllIssuesDashboard/AllIssuesDashboard";
import ManageUsers from "../Page/ManageUsers/ManageUsers";
import PremuimSuccess from "../Page/premuimSuccess/premuimSuccess";
import ManageStaffs from "../Page/ManageStaffs/ManageStaffs";
import AdminRoute from "./AdminRoute";
import CitizenRoute from "./CitizenRoute";

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
        path: "all-issues/:id",
        element: (
          <PrivateRoute>
            <IssueDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "payment/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancel",
        Component: PaymentCancel,
      },
      {
        path: "premuim-success",
        Component: PremuimSuccess,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "my-issues",
        element: (
          <CitizenRoute>
            <MyIssues />
          </CitizenRoute>
        ),
      },
      {
        path: "report-issues",
        element: (
          <CitizenRoute>
            <AddIssue />
          </CitizenRoute>
        ),
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "all-issues",
        element: (
          <AdminRoute>
            <AllIssuesDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-sttafs",
        element: (
          <AdminRoute>
            <ManageStaffs />
          </AdminRoute>
        ),
      },
    ],
  },
]);

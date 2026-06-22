import { createBrowserRouter } from "react-router";
import Home from "../Page/Home/Home";
import MainLayout from "../Layout/MainLayout";
import Register from "../Page/Register/Register";
import Login from "../Page/Login/Login";
import Allissues from "../Page/Allissues/Allissues";
import IssueForm from "../Page/IssueForm/IssueForm";
import IssueDetails from "../Page/IssueDetails/IssueDetails";
import PrivateRoute from "./PrivateRoute";
import PaymentSuccess from "../Page/PaymentSuccess/PaymentSuccess";
import PaymentCancel from "../Page/PaymentCancel/PaymentCancel";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardHome from "../Page/Dashboard/DashboarHome/DashboarHome";
import MyIssues from "../Page/MyIssues/MyIssues";
import Profile from "../Page/Profile/Profile";
import AllIssuesDashboard from "../Page/AllIssuesDashboard/AllIssuesDashboard";
import ManageUsers from "../Page/ManageUsers/ManageUsers";
import ManageStaffs from "../Page/ManageStaffs/ManageStaffs";
import AdminRoute from "./AdminRoute";
import CitizenRoute from "./CitizenRoute";
import AssignedIssues from "../Page/AssignedIssues/AssignedIssues";
import StaffRoute from "./StaffRoute";
import Payments from "../Page/Payments/Payments";
import ErrorPage from "../Page/ErrorPage/ErrorPage";
import PremuimSuccess from "../Page/PremuimSuccess/PremuimSuccess";
import AuthLayout from "../Layout/AuthLayout";
import AddSttaffModel from "../Components/AddSttaffModel/AddSttaffModel";

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
    path: '/',
    Component: AuthLayout,
    children: [

      // {
      //   path: "register",
      //   Component: Register,
      // },
      {
        path: "login",
        Component: Login,
      },

    ]
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
        path: "issues/new",
        element: (
          <CitizenRoute>
            <IssueForm />
          </CitizenRoute>
        ),
      },
      {
        path: "issues/:id/edit",
        element: (
          <CitizenRoute>
            <IssueForm />
          </CitizenRoute>
        ),
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "assigned-issues",
        element: (
          <StaffRoute>
            <AssignedIssues />
          </StaffRoute>
        ),
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
        path: "manage-staffs",
        element: (
          <AdminRoute>
            <ManageStaffs />
          </AdminRoute>
        ),
      },
      {
        path: "staffs/new",
        element: (
          <AdminRoute>
            <AddSttaffModel />
          </AdminRoute>
        ),
      },
      {
        path: "staffs/:id/edit",
        element: (
          <AdminRoute>
            <AddSttaffModel />
          </AdminRoute>
        ),
      },
      {
        path: "payments",
        element: (
          <AdminRoute>
            <Payments />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);

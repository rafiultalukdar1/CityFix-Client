import { createBrowserRouter } from "react-router";
import Root from "../components/Layouts/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/AuthPage/Login/Login";
import Register from "../pages/AuthPage/Register/Register";
import PrivetRoute from "./PrivetRoute";
import About from "../pages/AboutPage/About";
import HowWorkPage from "../pages/HowWorkPage/HowWorkPage";
import AllIssuesPage from "../pages/AllIssuesPage/AllIssuesPage";
import IssuesDetails from "../pages/IssuesDetails/IssuesDetails";
import DashboardLayouts from "../components/Layouts/DashboardLayouts";
import Citizen from "../pages/CitizenDashboard/Citizen";
import ReportIssue from "../pages/CitizenDashboard/ReportIssue";
import MyIssues from "../pages/CitizenDashboard/MyIssues";
import MyProfile from "../pages/CitizenDashboard/MyProfile";
import Staff from "../pages/StaffDashboard/Staff";
import AssignedIssues from "../pages/StaffDashboard/AssignedIssues";
import StaffPrivateRoute from "./StaffPrivateRoute";
import StaffProfile from "../pages/StaffDashboard/StaffProfile";
import AdminPrivateRoute from "./AdminPrivateRoute";
import Admin from "../pages/AdminDashboard/Admin";
import AllIssues from "../pages/AdminDashboard/AllIssues";
import ManageUsers from "../pages/AdminDashboard/ManageUsers";
import ManageStaff from "../pages/AdminDashboard/ManageStaff";
import Payments from "../pages/AdminDashboard/Payments";
import AdminProfile from "../pages/AdminDashboard/AdminProfile";
import CitizenPrivateRoute from "./CitizenPrivateRoute";
import PaymentSuccess from "../pages/CitizenDashboard/PaymentSuccess";
import PaymentCancel from "../pages/CitizenDashboard/PaymentCancel";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/all-issues',
                Component: AllIssuesPage
            },
            {
                path: '/how-it-works',
                Component: HowWorkPage
            },
            {
                path: '/about-us',
                Component: About,
            },
            {
                path: '/login',
                Component: Login,
            },
            {
                path: '/register',
                Component: Register,
            },
            {
                path: '/issue-details/:id',
                element: <PrivetRoute><IssuesDetails></IssuesDetails></PrivetRoute>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivetRoute><DashboardLayouts></DashboardLayouts></PrivetRoute>,
        children: [
            {
                path: 'citizen',
                element: <CitizenPrivateRoute><Citizen></Citizen></CitizenPrivateRoute>
            },
            {
                path: 'report-issue',
                element: <CitizenPrivateRoute><ReportIssue></ReportIssue></CitizenPrivateRoute>
            },
            {
                path: 'my-issues',
                element: <CitizenPrivateRoute><MyIssues></MyIssues></CitizenPrivateRoute>
            },
            {
                path: 'my-profile',
                element: <CitizenPrivateRoute><MyProfile></MyProfile></CitizenPrivateRoute>
            },
            {
                path: '/dashboard/payment-success',
                element: <CitizenPrivateRoute><PaymentSuccess></PaymentSuccess></CitizenPrivateRoute>
            },
            {
                path: '/dashboard/payment-cancel',
                element: <CitizenPrivateRoute><PaymentCancel></PaymentCancel></CitizenPrivateRoute>
            },
            {
                path: 'staff',
                element: <StaffPrivateRoute><Staff></Staff></StaffPrivateRoute>
            },
            {
                path: 'assigned-issues',
                element: <StaffPrivateRoute><AssignedIssues></AssignedIssues></StaffPrivateRoute>
            },
            {
                path: 'staff-profile',
                element: <StaffPrivateRoute><StaffProfile></StaffProfile></StaffPrivateRoute>
            },
            {
                path: 'admin',
                element: <AdminPrivateRoute><Admin></Admin></AdminPrivateRoute>
            },
            {
                path: 'all-issues',
                element: <AdminPrivateRoute><AllIssues></AllIssues></AdminPrivateRoute>
            },
            {
                path: 'manage-users',
                element: <AdminPrivateRoute><ManageUsers></ManageUsers></AdminPrivateRoute>
            },
            {
                path: 'manage-staff',
                element: <AdminPrivateRoute><ManageStaff></ManageStaff></AdminPrivateRoute>
            },
            {
                path: 'payments',
                element: <AdminPrivateRoute><Payments></Payments></AdminPrivateRoute>
            },
            {
                path: 'admin-profile',
                element: <AdminPrivateRoute><AdminProfile></AdminProfile></AdminPrivateRoute>
            }
        ]
    }
]);
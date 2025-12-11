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
                Component: Citizen,
            },
            {
                path: 'report-issue',
                Component: ReportIssue,
            },
            {
                path: 'my-issues',
                Component: MyIssues,
            },
            {
                path: 'my-profile',
                Component: MyProfile,
            }
        ]
    }
]);
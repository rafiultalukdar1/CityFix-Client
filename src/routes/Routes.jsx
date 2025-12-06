import { createBrowserRouter } from "react-router";
import Root from "../components/Layouts/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/AuthPage/Login/Login";
import Register from "../pages/AuthPage/Register/Register";
import PrivetRoute from "./PrivetRoute";
import About from "../pages/AboutPage/About";
import HowWorkPage from "../pages/HowWorkPage/HowWorkPage";

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
                element: <PrivetRoute><h2 className='text-5xl font-bold text-center py-15'>All Issues</h2></PrivetRoute>
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
            }
        ]
    },
]);
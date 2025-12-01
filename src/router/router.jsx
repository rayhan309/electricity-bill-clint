import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Components/Home/Home";
import LogIn from "../Pages/Login/LogIn";
import Bills from "../Pages/Bills/Bills";
import SignUp from "../Pages/SignUp/SignUp";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: HomeLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/login',
                Component: LogIn
            },
            {
                path: 'signUp',
                Component: SignUp
            },
            {
                path: '/bills',
                Component: Bills
            }
        ]
    }
]);
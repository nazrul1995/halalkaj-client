import React from 'react';
import { createBrowserRouter } from 'react-router';
import HomeLayouts from '../Layouts/HomeLayouts';
import Home from '../Pages/Home/Home';
import AllJobs from '../Pages/AllJobs/AllJobs';
import LogIn from '../Pages/LogIn/LogIn';
import Register from '../Pages/Register/Register';
import ForgetPassword from '../Pages/ForgetPassword/ForgetPassword';
import PrivateRouter from '../Components/PrivateRoute/PrivateRoute';
import JobDetails from '../Pages/JobDetails/JobDetails';
import AddJob from '../Pages/AddJob/AddJob';
import UpdateJob from '../Pages/UpdateJob/UpdateJob';
import MyPostedJobs from '../Pages/MyPostedJobs/MyPostedJobs';
import AcceptedTask from '../Pages/AcceptedTask/AcceptedTask';



const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayouts></HomeLayouts>,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: '/all-jobs',
                Component: AllJobs,
                loader: () => fetch('https://halalkaj-server-mtjhf6suj-nazrul1995s-projects.vercel.appallJobs')
            },
            {
                path: '/all-jobs/:id',
                element: <PrivateRouter>
                    <JobDetails></JobDetails>
                </PrivateRouter>,
            },
            {
                path: '/Login',
                Component: LogIn
            },
            {
                path: '/register',
                Component: Register
            },
           
            {
                path: '/add-job',
                element:<PrivateRouter><AddJob></AddJob></PrivateRouter>
            },
            {
                path: '/update-job/:id',
                element:<PrivateRouter><UpdateJob></UpdateJob></PrivateRouter>
            },
            {
                path: '/my-posted-jobs',
                element:<PrivateRouter><MyPostedJobs></MyPostedJobs></PrivateRouter>
            },
            {
                path: '/my-task',
                element:<PrivateRouter><AcceptedTask></AcceptedTask></PrivateRouter>
            },
            {
                path: '/forgot-password',
                Component: ForgetPassword
            }
        ]
    },
]);

export default router;
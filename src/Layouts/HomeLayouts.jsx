import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';

const HomeLayouts = () => {
    return (
        <>
            <header>
                <Navbar></Navbar>
            </header>
            <Outlet></Outlet>
            <footer></footer>
        </>
    );
};

export default HomeLayouts;
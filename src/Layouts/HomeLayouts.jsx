import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';

const HomeLayouts = () => {
    return (
        <>
            <header className='sticky top-0 z-50 shadow-md'>
                <Navbar></Navbar>
            </header>
            <Outlet></Outlet>
            <footer></footer>
        </>
    );
};

export default HomeLayouts;
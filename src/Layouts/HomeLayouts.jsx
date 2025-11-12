import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const HomeLayouts = () => {
    return (
        <>
            <header className='sticky top-0 z-50 shadow-md'>
                <Navbar></Navbar>
            </header>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
};

export default HomeLayouts;
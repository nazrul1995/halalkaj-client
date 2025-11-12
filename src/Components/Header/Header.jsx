import React from 'react';
import Navbar from '../Navbar/Navbar';

const Header = () => {
    return (
        <div>
            <header className='sticky top-0 z-50 shadow-md'>
            <Navbar></Navbar>
            </header>
        </div>
    );
};

export default Header;
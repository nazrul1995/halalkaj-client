import React from 'react';
import { FaUserCog } from 'react-icons/fa';
import MenuItem from './MenuItem';

const SellerMenu = () => {
    return (
       <>
      <MenuItem icon={FaUserCog} label='My Accepted Tasks' address='my-task' />
    </>
    );
};

export default SellerMenu;
import React, { useContext } from 'react';
import { FaUserCog } from 'react-icons/fa';
import MenuItem from './MenuItem';
import { AuthContext } from '../../../Provider/AuthContext';

const SellerMenu = () => {
  const {user} = useContext(AuthContext)
    return (
       <>
       {
        user.email === 'seller@gmail.com' && <MenuItem icon={FaUserCog} label='My Accepted Tasks' address='my-task' />
       }
      
    </>
    );
};

export default SellerMenu;
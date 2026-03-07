import React, { useContext } from 'react';
import { FaUserCog } from 'react-icons/fa';
import MenuItem from './MenuItem';
import { GrWorkshop } from "react-icons/gr";
import { AuthContext } from '../../../Provider/AuthContext';

const BuyerMenu = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            {
                user.email === 'buyer@gmail.com' && (
                    <>
                        <MenuItem icon={FaUserCog} label='My Posted Jobs' address='my-posted-jobs' />
                        <MenuItem icon={GrWorkshop} label='Post a Job' address='add-job' />
                    </>

                )
            }

        </div>
    );
};

export default BuyerMenu;
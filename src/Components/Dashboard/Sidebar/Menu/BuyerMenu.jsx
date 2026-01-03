import React from 'react';
import { FaUserCog } from 'react-icons/fa';
import MenuItem from './MenuItem';
import { GrWorkshop } from "react-icons/gr";

const BuyerMenu = () => {
    return (
        <div>
                <MenuItem icon={FaUserCog} label='My Posted Jobs' address='my-posted-jobs' />
                <MenuItem icon={GrWorkshop} label='Post a Job' address='add-job' />
        </div>
    );
};

export default BuyerMenu;
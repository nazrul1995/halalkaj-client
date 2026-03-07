import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { useContext } from 'react'
import { AuthContext } from '../../../Provider/AuthContext';

const AdminMenu = () => {
 const { user} = useContext(AuthContext);
  return (
    <>
     { user.email === 'admin@gmail.com' && <MenuItem icon={FaUserCog} label='Manage Role' address='manage-role' />
     }
    </>
  )
}

export default AdminMenu
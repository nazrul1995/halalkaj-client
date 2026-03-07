/* eslint-disable no-unused-vars */
import { NavLink } from "react-router";

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `
        group flex items-center gap-3 px-4 py-2.5 my-1 rounded-lg
        font-medium transition-all duration-300
        ${
          isActive
            ? "bg-warning/20 text-warning border-l-4 border-warning"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
        }
        `
      }
    >
      <Icon
        className={`w-5 h-5 transition-colors duration-300
        group-hover:text-warning`}
      />

      <span>{label}</span>
    </NavLink>
  );
};

export default MenuItem;

import React from 'react';
import { NavLink } from 'react-router';

const MyNavLink = ({ children, to }) => {
    return (
        <NavLink to={to} className={({ isActive }) =>
            isActive ? "text-app-orange" : ""
        }>{children}</NavLink>
    );
};

export default MyNavLink;

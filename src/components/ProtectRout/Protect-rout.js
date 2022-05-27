import React from "react";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { PAGE_LOGIN } from "../../utils/constants";

function ProtectRout({ children }) {

    const location = useLocation();
    const { isAuthChecked } = useSelector(state => state.auth);

    if (!isAuthChecked) return <Navigate to={PAGE_LOGIN} replace={true} state={{from: location}}/>; 

    return (
        <>
            {children}
        </>
    );
}

ProtectRout.propTypes = {
    children: PropTypes.element.isRequired
};

export default ProtectRout;
import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { PAGE_LOGIN } from "../../utils/constants";
import { getUser } from "../../services/actions/auth";

function ProtectRout({ children }) {

    const dispatch = useDispatch();
    const location = useLocation();
    const { isAuthChecked } = useSelector(state => state.auth);

    useEffect(()=>{

        if (!isAuthChecked) {
            dispatch(getUser());
        }

    },[dispatch, isAuthChecked]);


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
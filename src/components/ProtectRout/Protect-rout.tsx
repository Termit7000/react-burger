import React, { FC, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { PAGE_LOGIN } from "../../utils/constants";
import { getUser } from "../../services/thunks";
import { RootState } from "../../services/types";
import { useDispatch, useSelector } from "../../services/hooks";

const ProtectRout:FC=({ children })=> {

    const dispatch = useDispatch();
    const location = useLocation();
    const { isAuthChecked } = useSelector((state:RootState) => state.auth);

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

export default ProtectRout;
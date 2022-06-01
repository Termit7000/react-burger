import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

import { logOut } from "../../redux/thunks";

import { PAGE_ORDERS } from "../../utils/constants";

import styles from './profile.module.css';

export default function Profile() {

    const dispatch = useDispatch();    
    const {refreshToken,logoutInProgress, isError, error} = useSelector(state=>state.auth);    

    const handleExit = () => dispatch(logOut(refreshToken));

    if (logoutInProgress) return <p  className="text text_type_main-medium">Logout...</p>;
    if (isError) return <p className="text text_type_main-medium">`Что-то пошло не так: ${error}`</p>

    return (
        <section aria-label="profile" className={styles.container}>

            <nav className={styles.nav}>
                <ul className={styles.list}>
                    <li className={styles.list__item}>
                        <NavLink to='' className={styles.link} end>
                            {({ isActive }) =>
                                <span className={`text text_type_main-medium ${isActive ? styles.text_active : styles.text}`}>Профиль</span>
                            }
                        </NavLink>
                    </li>

                    <li className={styles.list__item}>
                        <NavLink to={PAGE_ORDERS} className={styles.link}>
                            {({ isActive }) =>
                                <p className={`text text_type_main-medium ${isActive ? styles.text_active : styles.text}`}>Заказы</p>
                            }
                        </NavLink>
                    </li>

                    <li className={styles.list__item}>
                        <button onClick={handleExit} className={styles.button}>
                            <span className={`text text_type_main-medium ${styles.text}`}>Выход</span>
                        </button>
                    </li>
                </ul>
                <p className={`mt-20 text text_type_main-default ${styles.text} ${styles.description}`}>В этом разделе вы можете изменить свои персональные данные</p>

            </nav>

            <div className="ml-15">
                <Outlet />
            </div>
        </section>
    );
}
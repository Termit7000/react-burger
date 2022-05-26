import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import styles from './profile.module.css';

export default function Profile() {

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
                        <NavLink to={'orders'} className={styles.link}>
                            {({ isActive }) =>
                                <p className={`text text_type_main-medium ${isActive ? styles.text_active : styles.text}`}>Заказы</p>
                            }
                        </NavLink>
                    </li>

                    <li className={styles.list__item}>
                        <p className={`text text_type_main-medium ${styles.text}`}>Выход</p>
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
import React from "react";
import { NavLink } from "react-router-dom";

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { 
    PAGE_FEED, 
    PAGE_HOME, 
    PAGE_PROFILE } from "../../utils/constants";

import styles from './AppHeader.module.css';

const getClassNameText = isActive=> `ml-2 text text_type_main-default ${isActive ?  styles.text_primary : styles.text_secondary}`;
const getTypeIcon = isActive=>isActive ? 'primary' : 'secondary';

export default function AppHeader() {

    return (
        <header className={`${styles.header}`}>
            <div className={`${styles.container} pt-4 pb-4`} >

                <nav className={styles.nav}>

                    <div className="mr-2">

                        <NavLink to={PAGE_HOME} className={`${styles.link} pr-5 pt-4 pb-4`}>
                            {({ isActive }) =>
                                <>
                                    <BurgerIcon type={getTypeIcon(isActive)} />
                                    <p className={getClassNameText(isActive)}>Конструктор</p>
                                </>
                            }
                        </NavLink>
                    </div>

                    <NavLink to={PAGE_FEED} className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}>
                        {({ isActive }) =>
                            <>
                                <ListIcon type={getTypeIcon(isActive)} />
                                <p className={getClassNameText(isActive)} >Лента заказов</p>
                            </>
                        }
                    </NavLink>
                </nav>

                <NavLink to={PAGE_HOME} className={styles.link}>
                    <div className={styles.logo}>
                        <Logo />
                    </div>
                </NavLink>

                <div className={styles.profile}>
                    <NavLink to={PAGE_PROFILE} className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}>
                        {({ isActive }) =>
                            <>
                                <ProfileIcon type={getTypeIcon(isActive)}/>
                                <p className={getClassNameText(isActive)}>Личный кабинет</p></>
                        }
                    </NavLink>
                </div>
            </div>
        </header>
    );
}
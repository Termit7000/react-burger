import React from "react";
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import LinkButton from '../LinkButton/LinkButton.js';

import styles from './AppHeader.module.css';

export default function AppHeader() {

    return (

        <header className={`${styles.header}`}>
            <div className={`${styles.container} pt-4 pb-4`} >


                <nav className={styles.nav}>
                    <div className="mr-2">
                        <LinkButton>
                            <BurgerIcon />
                            <p className={`ml-2 text text_type_main-default ${styles.text_standart}`}>Конструктор</p>
                        </LinkButton>
                    </div>
                    <LinkButton>
                        <ListIcon type="secondary" />
                        <p className={`ml-2 text text_type_main-default ${styles.text_secondary}`}>Лента заказов</p>
                    </LinkButton>
                </nav>

                <div className={styles.logo}>
                    <Logo />
                </div>

                <div className={styles.profile}>
                    <LinkButton>
                        <ProfileIcon type="secondary" />
                        <p className={`ml-2 text text_type_main-default ${styles.text_secondary}`}>Личный кабинет</p>
                    </LinkButton>
                </div>
            </div>
        </header>
    );
}
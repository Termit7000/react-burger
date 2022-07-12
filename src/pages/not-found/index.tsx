import React from "react";
import { Button, Logo } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './index.module.css';
import { useNavigate } from "react-router-dom";

export default function NotFound() {

    const navigate=useNavigate();

    return (

        <section aria-label="Страница не найдена" className={styles.container}>
                        
            <h2 className="text text_type_main-large">404</h2>
            <Logo/>
            <h3 className="text text_type_main-small">Такая страница не существует</h3>
            <Button type="primary" size="large" onClick={()=>navigate(-1)}>Назад</Button>

        </section>


    );
}
import React, { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Card from "../Card/Card";
import { useIngredients } from "../hooks/ingredient-hooks";
import styles from './BurgerIngredients.module.css';

const BUN_NAME = 'bun';
const SAUSE_NAME = 'sauce';
const MAIN_NAME = 'main';

export default function BurgerIngredients() {

    const { ingredients, plusIngredient, minusIngredient } = useIngredients();
    const [currentTab, setTab] = useState('BUN_NAME');

    return (

        <section className={styles.section}>

            <p className="mt-10 text text_type_main-large">Соберите бургер</p>

            <div className={styles.tab_content}>
                <Tab value="BUN_NAME" active={currentTab === 'BUN_NAME'} onClick={setTab}>
                    Булки
                </Tab>
                <Tab value="SAUSE_NAME" active={currentTab === 'SAUSE_NAME'} onClick={setTab}>
                    Соусы
                </Tab>
                <Tab value="MAIN_NAME" active={currentTab === 'MAIN_NAME'} onClick={setTab}>
                    Начинки
                </Tab>
            </div>

            <article className={`${styles.ingredients_container} pb-10`}>
                <p className="mt-10 mb-6 text text_type_main-medium">Булки</p>
                <div className={`${styles.ingrediens_wrapper} pl-4 pr-4`}>
                    {ingredients
                        .filter(el => el.type === BUN_NAME)
                        .map(el =>
                           <Card key={el._id} imgSrc={el.image} {...el} />
                        )
                    }
                </div>

            </article>


        </section>

    );

}
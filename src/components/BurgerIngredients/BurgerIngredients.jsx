import React, { useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useIngredients } from "../hooks/ingredient-hooks";
import styles from './BurgerIngredients.module.css';
import ListIngredients from "../ListIngredients/ListIngredients";

const BUN_NAME = 'bun';
const SAUSE_NAME = 'sauce';
const MAIN_NAME = 'main';

export default function BurgerIngredients() {

    const { ingredients, plusIngredient, minusIngredient } = useIngredients();
    const [currentTab, setTab] = useState('BUN_NAME');

    const bunRef = useRef(null);
    const sauseRef = useRef(null);
    const mainRef = useRef(null);

    function onClickTab(activeTab) {

        if (activeTab === BUN_NAME) bunRef.current?.scrollIntoView(true);
        if (activeTab === SAUSE_NAME) sauseRef.current?.scrollIntoView(true);
        if (activeTab === MAIN_NAME) mainRef.current?.scrollIntoView(true);
        
        /*
        window.scrollBy({
            top: -200,
            left: 0,
            behavior: 'smooth'
          }); //
          */
    }

    function onScroll(){
        console.log('scroll');
    }


    return (

        <section className={styles.section}>

            <p className="mt-10text text_type_main-large">Соберите бургер</p>

            <div className={`${styles.tab_content}`}>
                <Tab value={BUN_NAME} active={currentTab === BUN_NAME} onClick={onClickTab}>
                    Булки
                </Tab>
                <Tab value={SAUSE_NAME} active={currentTab === SAUSE_NAME} onClick={onClickTab}>
                    Соусы
                </Tab>
                <Tab value={MAIN_NAME} active={currentTab === MAIN_NAME} onClick={onClickTab}>
                    Начинки
                </Tab>
            </div>

            <div  onScroll={onScroll} className={`mt-10 custom-scroll ${styles.content}`}>
                <ListIngredients ref={bunRef} name={'Булки'} type={BUN_NAME} />
                <ListIngredients ref={sauseRef} name={'Соусы'} type={SAUSE_NAME} />
                <ListIngredients ref={mainRef} name={'Начинки'} type={MAIN_NAME} />
            </div>
        </section>
    );
}
import React, { useRef, useState } from "react";
import PropTypes from 'prop-types';

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import ListItems from "./ListItems";

import styles from './BurgerIngredients.module.css';


const BUN_NAME = 'bun';
const SAUSE_NAME = 'sauce';
const MAIN_NAME = 'main';

function BurgerIngredients({card}) {    

    const [currentTab, setTab] = useState(BUN_NAME);

    const bunRef = useRef(null);
    const sauseRef = useRef(null);
    const mainRef = useRef(null);
    const containerRef = useRef(null);

    function onClickTab(activeTab) {

        const containerPositionTop = containerRef.current?.offsetTop;
        if (!containerPositionTop) return;

        let jumpRef;

        switch (activeTab) {
            case BUN_NAME:
                jumpRef = bunRef;
                break
            case SAUSE_NAME:
                jumpRef = sauseRef;
                break;
            default:
                jumpRef = mainRef;
        }

        const elementPosition = jumpRef.current?.offsetTop || 0;
        containerRef.current.scrollTop = elementPosition - containerPositionTop;
    }

    function onScroll() {

        if (!(bunRef && sauseRef && mainRef && containerRef)) return;

        const currentPosition = containerRef.current.offsetTop + containerRef.current.scrollTop;

        const arr = [
            { name: BUN_NAME, div: Math.abs(bunRef.current.offsetTop - currentPosition) },
            { name: SAUSE_NAME, div: Math.abs(sauseRef.current.offsetTop - currentPosition) },
            { name: MAIN_NAME, div: Math.abs(mainRef.current.offsetTop - currentPosition) }
        ];

        const minElement = arr.reduce(
            (acc, el) => el.div < acc.div ? el : acc
            , { name: BUN_NAME, div: Infinity });

        setTab(minElement.name);
    }

    return (

        <section className='page__section'>
            <p className="mt-10 mb-5 text text_type_main-large">Соберите бургер</p>

            <ul className={`${styles.tab_content}`}>
                <li>
                    <Tab value={BUN_NAME} active={currentTab === BUN_NAME} onClick={onClickTab}>
                        Булки
                    </Tab>
                </li>
                <li>
                    <Tab value={SAUSE_NAME} active={currentTab === SAUSE_NAME} onClick={onClickTab}>
                        Соусы
                    </Tab>
                </li>
                <li>
                    <Tab value={MAIN_NAME} active={currentTab === MAIN_NAME} onClick={onClickTab}>
                        Начинки
                    </Tab>
                </li>
            </ul>

            <ul ref={containerRef} onScroll={onScroll} className={`${styles.content} mt-10 custom-scroll`}>

                    <ListItems name='Булки' type = {BUN_NAME} ref = {bunRef} card = {card}/>
                    <ListItems name='Соусы' type = {SAUSE_NAME} ref = {sauseRef} card = {card}/>
                    <ListItems name='Начинки' type = {MAIN_NAME} ref = {mainRef} card = {card}/>
                   
            </ul>
        </section>
    );
}

BurgerIngredients.propTypes = {
    card: PropTypes.func.isRequired    
}

export default BurgerIngredients;
import React from "react";
import styles from './index.module.css';

export default function IngredientPreview({ src }:{src:string}) {
    return (
        <div className={styles.components__imgWrapper}>
            <img className={styles.components__img} src={src} alt="?" />
        </div>
    );
}
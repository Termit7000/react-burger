import React from "react";
import PropTypes from 'prop-types';
import styles from './IngredientDetails.module.css';

function IngredientDetails({imgSrc, name}) {
 
    return (
        <div className={styles.container}>

            <p className={`${styles.title} mt-10 ml-10 text text_type_main-large`}>Детали ингредиента</p>   
            <img className={`${styles.img} `} src={imgSrc} alt={name} /> 
            <p className="mt-10 mb-10 text text_type_main-medium">{name}</p>   

        </div>

    );
    
}

IngredientDetails.propTypes = {

};

export default IngredientDetails;
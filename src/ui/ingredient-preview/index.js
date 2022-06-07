import React from "react";
import PropTypes from 'prop-types';

import styles from './index.module.css';

function IngredientPreview({ src }) {

    return (
        <div className={styles.components__imgWrapper}>
            <img className={styles.components__img} src={src} alt="?" />
        </div>
    );
}

IngredientPreview.poprTypes = {
    src: PropTypes.string.isRequired    
}

export default IngredientPreview;
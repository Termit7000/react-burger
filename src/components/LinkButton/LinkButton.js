import React from "react";
import PropTypes from 'prop-types';

import styles from './LinkButton.module.css'

function LinkButton({ children }) {
    return (
        <div className={`${styles.container} pl-5 pr-5 pt-4 pb-4`}>
            {children}
        </div>
    );
}

LinkButton.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element.isRequired)
};

export default LinkButton;
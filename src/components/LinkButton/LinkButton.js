import React from "react";
import styles from './LinkButton.module.css'

function LinkButton({children}){
    return (
        <div className={`${styles.container} pl-5 pr-5 pt-4 pb-4`}>
            {children}            
        </div>
    );
}

export default LinkButton;
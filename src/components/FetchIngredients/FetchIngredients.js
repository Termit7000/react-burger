import React from "react";
import PropTypes from 'prop-types';
import { useIngredients } from "../../contexts/ingredient-context";
import  styles from "./FetchIngredients.module.css";

function FetchIngredients({children}) {    

    const {error, isLoading} = useIngredients();
    
    if (isLoading) return <p className={styles.loading_text}>Loading...</p>;
    if (error) return error => (
        <pre> {JSON.stringify(error, null, 2)}</pre>);

    return children;
}


FetchIngredients.propTypes = {
    children: PropTypes.element.isRequired
}

export default FetchIngredients;
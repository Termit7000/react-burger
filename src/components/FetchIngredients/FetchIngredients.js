import React from "react";
import { useIngredients } from "../../contexts/ingredient-context";
import  styles from "./FetchIngredients.module.css";

export default function FetchIngredients({children}) {    

    const {error, isLoading} = useIngredients();
    
    if (isLoading) return <p className={styles.loading_text}>Loading...</p>;
    if (error) return error => (
        <pre> {JSON.stringify(error, null, 2)}</pre>);

    return children;
}
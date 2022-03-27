import React, { createContext, useContext, useState, useEffect} from "react";
import PropTypes from 'prop-types';
import { getIngredients } from "../utils/api";

const ContextIngredients = createContext();
export const useIngredients = ()=> useContext(ContextIngredients);

const styles = {textAlign: 'center'};

function IngredientsProvider ({children}) {
    
    const [data, setData] = useState(null);
    const [error, setError] = useState();
    const [isLoading, setLoading]  = useState(true);    

    useEffect(()=>{

        getIngredients()
        .then((dataFetch)=>{
            if (!dataFetch.success) {
                return Promise.reject("Запрос к данным неуспешен");
            }            
            setData(dataFetch.data.map(el=>({...el, count:0})));
        })        
        .catch(setError)
        .finally(()=>setLoading(false));       
    },[]);    

    if (isLoading) return <p className={styles}>Loading...</p>;
    if (error) return <pre> {JSON.stringify(error, null, 2)}</pre>;
    
    return (
        <ContextIngredients.Provider value={{data, error, isLoading}}>
            {children}
        </ContextIngredients.Provider>
    );
}

IngredientsProvider.propTypes = {
    children: PropTypes.element.isRequired
}

export default IngredientsProvider;
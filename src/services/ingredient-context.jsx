import React, { createContext, useContext, useState, useEffect} from "react";
import PropTypes from 'prop-types';
import { getIngredients } from "../components/api/api";

const ContextIngredients = createContext();
export const useIngredients = ()=> useContext(ContextIngredients);

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
    
    return (
        <ContextIngredients.Provider value={{data, error, isLoading}}>
            {children}
        </ContextIngredients.Provider>
    );
}

IngredientsProvider.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired
}

export default IngredientsProvider;
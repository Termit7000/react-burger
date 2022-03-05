import React, { createContext, useContext, useState, useEffect} from "react";
import { getIngredients } from "../components/api/api";

const ContextIngredients = createContext();
export const useIngredients = ()=> useContext(ContextIngredients);

export default function IngredientsProvider ({children}) {
    
    const [ingredients, setIngredients] = useState(null);
    const [error, setError] = useState();
    const [isLoading, setLoading]  = useState(true);    

    useEffect(()=>{

        getIngredients()
        .then((data)=>{
            if (!data.success) {
                return Promise.reject("Запрос к данным неуспешен");
            }            
            setIngredients(data.data.map(el=>({...el, count:0})));
        })        
        .catch(setError)
        .finally(()=>setLoading(false));       
    },[]);    
    
    return (
        <ContextIngredients.Provider value={{ingredients, error, isLoading}}>
            {children}
        </ContextIngredients.Provider>
    );

}

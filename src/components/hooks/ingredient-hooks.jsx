import React, { createContext, useContext, useState } from "react";
import ingredientsData from '../../utils/data.json'

const ContextIngredients = createContext();
export const useIngredients = ()=> useContext(ContextIngredients);

export default function IngredientsProvider ({children}) {

    //в данные добавим счетчик с начальным состоянием 0
    const [ingredients, setIngredients]  = useState(()=>
        ingredientsData.map(el=>({...el, count:0}))
    );

    const plusIngredient = id=>{
        setIngredients(ingredients.map(el=>
            el.id === id ? {...el, count: el.count++} : el
        ));
    };

    const minusIngredient = id=>{
        setIngredients(ingredients.map(el=>
            el.id === id && el.count>0 ? {...el, count: el.count--} : el
        ));
    };     
    
    return (
        <ContextIngredients.Provider value={{ingredients, plusIngredient, minusIngredient}}>
            {children}
        </ContextIngredients.Provider>
    );

}

import React, { useContext, createContext } from "react";
import PropTypes from 'prop-types';

const ContextIngredients = createContext();

export const useIngredients=()=>useContext(ContextIngredients);

function IngredientsProvider({ingredients, children}) {

    return (

        <ContextIngredients.Provider value = {{ingredients}} >

            {children}

        </ContextIngredients.Provider>
    );
}

IngredientsProvider.propTypes = {

    ingredients: PropTypes.array.isRequired,
    children: PropTypes.element.isRequired
}

export default IngredientsProvider;
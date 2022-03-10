import React, { createContext, useContext, useState, useEffect} from "react";
import { getIngredients } from "../components/api/api";

const ContextIngredients = createContext();
export const useIngredients = ()=> useContext(ContextIngredients);

export default function IngredientsProvider ({children}) {
    
    const [data, setData] = useState(null);
    const [error, setError] = useState();
    const [isLoading, setLoading]  = useState(true);    

    const [contentModal, setModalOpened] = useState({isOpened: false, modalName: ''});
    const openModal = (modalName, content) => setModalOpened({...content, isOpened: true, modalName: modalName});
    const closeModal = ()=>setModalOpened({isOpened: false, modalName: ''});    

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
        <ContextIngredients.Provider value={{data, error, isLoading, contentModal, openModal,closeModal}}>
            {children}
        </ContextIngredients.Provider>
    );

}

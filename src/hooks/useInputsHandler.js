import { useEffect, useState } from "react";
import { validateEmail } from "../utils/utils";

export default function useInputsHandler(defaultState={}) {

    const [inputValues, setInputValue] = useState(defaultState);
    const [isLoginValid, setLoginEmailValidation] = useState(false);
    
    useEffect(()=>{

        if (defaultState.login) setLoginEmailValidation(validateEmail(defaultState.login)); 

    },[defaultState.login]);
    
    const setValue = (name,value) => {
        if (name === 'login') {            
            setLoginEmailValidation(validateEmail(value));
        };
        setInputValue({...inputValues,  [name]: value })
    };

    const handleChangeInput = e => {
        const {name, value} = e.target;
        setValue(name, value);
    };

    return {inputValues,handleChangeInput, isLoginValid};
}
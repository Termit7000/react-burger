import { useEffect, useState } from "react";
import { validateEmail } from "../utils/utils";

export default function useInputsHandler(defaultState:{login?:string}={}) {

    const [inputValues, setInputValue] = useState(defaultState);
    const [isLoginValid, setLoginEmailValidation] = useState(false);
    
    useEffect(()=>{

        if (defaultState.login) setLoginEmailValidation(validateEmail(defaultState.login)); 

    },[defaultState.login]);
    
    const setValue = (name:string, value:any) => {
        if (name === 'login') {            
            setLoginEmailValidation(validateEmail(value));
        };
        setInputValue({...inputValues,  [name]: value })
    };

    const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setValue(name, value);
    };

    const setInputsValue = (inputs:{}) => {
        setInputValue({ ...inputs });
    };

    return {inputValues,handleChangeInput, isLoginValid, setInputsValue};
}
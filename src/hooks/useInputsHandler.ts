import { useEffect, useState } from "react";
import { validateEmail } from "../utils/utils";

type TDefState = {[key: string]: any; login?:string};
export default function useInputsHandler(defaultState:TDefState = {}) {

    const [inputValues, setInputValue] = useState(defaultState);
    const [isLoginValid, setLoginEmailValidation] = useState(false);
    
    useEffect(()=>{

        if (defaultState.login) setLoginEmailValidation(validateEmail(defaultState.login)); 

    },[defaultState.login]);
    
    type TInputsState = typeof defaultState;
    type TKeys = keyof TInputsState;    
    type TSetValue = <K extends TKeys>(name:K, value:TInputsState[K])=>void;    
    const setValue:TSetValue = (name, value) => {

        if (name === 'login') {            
            setLoginEmailValidation(validateEmail(value!));
        };
        setInputValue({...inputValues,  [name]: value })
    };

    const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target as  {name:TKeys, value:any};
        setValue(name, value);
    };

    const setInputsValue = (inputs:TInputsState) => {
        setInputValue({ ...inputs });
    };

    return {inputValues,handleChangeInput, isLoginValid, setInputsValue};
}
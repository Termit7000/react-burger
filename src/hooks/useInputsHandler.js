import { useState } from "react";
import { validateEmail } from "../utils/utils";

export default function useInputsHandler() {

    const [inputValues, setInputValue] = useState({});
    const [isLoginValid, setLoginEmailValidation] = useState(false);
    
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
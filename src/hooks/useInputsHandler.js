import { useState } from "react";
import { validateEmail } from "../utils/utils";

export default function useInputsHandler() {

    const [inputValues, setInputValue] = useState({});
    const [isLoginValid, setLoginEmailValidation] = useState(false);

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setInputValue({ ...inputValues, [name]: value });

        if (name === 'login') {
            setLoginEmailValidation(value && validateEmail(value))
        };
    };

    return {inputValues,handleChangeInput, isLoginValid};
}
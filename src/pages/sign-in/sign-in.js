import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";

import styles from './sign-in.module.css';

const checkEmailInputElement = document.createElement('input');
checkEmailInputElement.setAttribute('type', 'email');

const validateEmail = email => {    
    checkEmailInputElement.value = email;
    return checkEmailInputElement.validity.valid;
};

export default function SignIn() {
    const [inputValues, setInputValue] = useState({});
    const [isEmailValid, setEmailValidation] = useState(true);

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setInputValue({ ...inputValues, [name]: value });

        if (name === 'login') setEmailValidation(validateEmail(value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return (

        <section aria-label="login-form" className={styles.container} >
            <h2 className={`text text_type_main-medium`}> Вход</h2>
            <form name="loginForm" className={styles.form} onSubmit={handleSubmit}>

                <Input type={'email'}
                    placeholder={'E-mail'}
                    onChange={handleChangeInput}
                    value={inputValues.login || ''}
                    name={'login'}                    
                    error={!isEmailValid}
                    errorText={inputValues.login && 'Укажите правильный email'}
                    size={'default'} />

                <PasswordInput
                    onChange={handleChangeInput}
                    value={inputValues.password || ''}
                    name={'password'}
                />

                <Button disabled={!inputValues.login || !isEmailValid} type="primary" size="medium" onClick={handleSubmit}>
                    Войти
                </Button>
            </form>
        </section>

    );
}
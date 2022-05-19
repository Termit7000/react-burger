import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

import RegForm from "../../components/RegForm/RegForm";
import useInputsHandler from "../../hooks/useInputsHandler";

const addInfo = [{
    title: 'Вы новый пользователь?',
    link: { to: '/register', text: 'Зарегистрироваться' }
}
    , {
    title: 'Забыли пароль?',
    link: { to: '/forgot-password', text: 'Восстановить пароль' }
}];

const TITLE = 'Вход';
const TITLE_SUBMIT = 'Вход';

export default function SignIn() {

    const { inputValues, handleChangeInput, isLoginValid } = useInputsHandler();

    const inputsElem = [
        <Input type={'email'}
            placeholder={'E-mail'}
            onChange={handleChangeInput}
            value={inputValues.login || ''}
            name={'login'}
            error={!isLoginValid}
            size={'default'} />,

        <PasswordInput
            onChange={handleChangeInput}
            value={inputValues.password || ''}
            name={'password'}
        />];

    return (

        <RegForm title={TITLE} submitButtonTitle={TITLE_SUBMIT} submitHandler={f => f} inputs={inputsElem} isFormValid={isLoginValid} addInfo={addInfo} />

    );
}

import React from "react";

import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import RegForm from "../../components/RegForm/RegForm";
import useInputsHandler from "../../hooks/useInputsHandler";

const addInfo = [{
    title: 'Вы новый пользователь?',
    link: { to: '/register', text: 'Зарегистрироваться' }
},
{
    title: 'Забыли пароль?',
    link: { to: '/forgot-password', text: 'Восстановить пароль' }
}];

const TITLE = 'Восстановление пароля';
const TITLE_SUBMIT = 'Сохранить';

export default function ResetPassword() {

    const { inputValues, handleChangeInput } = useInputsHandler();

    const inputsElem = [
        <PasswordInput
            onChange={handleChangeInput}
            value={inputValues.password || ''}
            name={'password'}
        />,
        <Input type={'text'}
            placeholder={'Введите код из письма'}
            onChange={handleChangeInput}
            value={inputValues.resetCode || ''}
            name={'resetCode'}
            size={'default'} />];

    return (

        <RegForm title={TITLE} submitButtonTitle={TITLE_SUBMIT} submitHandler={f => f} inputs={inputsElem} isFormValid={true} addInfo={addInfo} />

    );
}
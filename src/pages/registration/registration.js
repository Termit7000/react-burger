import React  from "react";
import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import RegForm from "../../components/RegForm/RegForm";
import useInputsHandler from "../../hooks/useInputsHandler";

const addInfo = [{
    title: 'Уже зарегистрированы?',
    link: { to: '/login', text: 'Войти' }
}];

const TITLE = 'Регистрация';
const TITLE_SUBMIT = 'Зарегистрироваться';

export default function Registration() {

    const {inputValues, handleChangeInput, isLoginValid} = useInputsHandler();

    const inputsElem = [

        <Input type={'text'}
            placeholder={'Имя'}
            onChange={handleChangeInput}
            value={inputValues.userName || ''}
            name={'userName'}
            size={'default'} />,

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
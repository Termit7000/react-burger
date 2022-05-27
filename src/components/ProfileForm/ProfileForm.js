import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import RegForm from "../../components/RegForm/RegForm";
import useInputsHandler from "../../hooks/useInputsHandler";

const TITLE = '';
const TITLE_SUBMIT = 'Обновить';

export default function ProfileForm() {

    const { authInProgress, isError, error, user } = useSelector(state => state.auth);
    const { inputValues, handleChangeInput, isLoginValid } = useInputsHandler();

    console.log(inputValues.login);

    const submitHandler = () => { };

    if (authInProgress) return (<p className="text text_type_main-default">Авторизация пользователя...</p>);

    const inputsElem = [

        <Input type='text'
            placeholder='Имя'
            onChange={handleChangeInput}
            value={inputValues.userName || user.name || ''}
            name='userName'
            size='default'
            icon='EditIcon'/>,

        <Input type='email'
            placeholder='Логин'
            onChange={handleChangeInput}
            value={inputValues.login || user.email || ''}
            name='login'
            error={!isLoginValid}
            size='default'
            icon='EditIcon' />,

        <PasswordInput
            onChange={handleChangeInput}
            value={inputValues.password || ''}
            name='password'
        />];

    return (
        <RegForm
            title={TITLE}
            isError={isError}
            error={error}
            submitButtonTitle={TITLE_SUBMIT}
            submitHandler={submitHandler}
            inputs={inputsElem}
            isFormValid={isLoginValid} />
    );
}
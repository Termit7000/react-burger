import React from "react";
import { useSelector } from "react-redux";

import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import RegForm from "../../components/RegForm/RegForm";
import useInputsHandler from "../../hooks/useInputsHandler";

const TITLE = '';
const TITLE_SUBMIT = 'Обновить';

export default function ProfileForm() {

    const { user } = useSelector(state => state.auth);
    const { inputValues, handleChangeInput, isLoginValid } = useInputsHandler({userName: user.name, login: user.email});

    const submitHandler = ()=> {};

    const inputsElem = [

        <Input type='text'
            placeholder='Имя'
            onChange={handleChangeInput}
            value={inputValues.userName}
            name='userName'
            size='default'
            icon='EditIcon'/>,

        <Input type='email'
            placeholder='Логин'
            onChange={handleChangeInput}
            value={inputValues.login}
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
            submitButtonTitle={TITLE_SUBMIT}
            submitHandler={submitHandler}
            inputs={inputsElem}
            isFormValid={isLoginValid} />
    );
}
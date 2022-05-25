import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import RegForm from "../../components/RegForm/RegForm";
import useInputsHandler from "../../hooks/useInputsHandler";
import { signIn } from "../../services/actions";
import { PAGE_HOME } from "../../utils/constants";

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

    const { isAuthChecked, isError, error, authInProgress } = useSelector(state => state.auth);
    const { inputValues, handleChangeInput, isLoginValid } = useInputsHandler();
    const dispatch = useDispatch();
    const location = useLocation();

    const pageFrom = location.state?.from || PAGE_HOME;
    
    if (isAuthChecked ) return <Navigate to={pageFrom} />;
    if (authInProgress) return (<p className="text text_type_main-default">Авторизация пользователя...</p>);

    const submitHandler = ()=> dispatch(signIn({ email: inputValues.login, password: inputValues.password }));
 
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

        <RegForm title={TITLE} isError={isError} error={error} submitButtonTitle={TITLE_SUBMIT} submitHandler={submitHandler} inputs={inputsElem} isFormValid={isLoginValid} addInfo={addInfo} />

    );
}
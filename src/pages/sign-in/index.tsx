import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import RegForm from "../../components/RegForm/RegForm";
import useInputsHandler from "../../hooks/useInputsHandler";

import { PAGE_HOME } from "../../utils/constants";
import { signIn } from "../../services/thunks";

import styles from './index.module.css';
import { useDispatch, useSelector } from "../../services/hooks";
import { TLocation } from "../../services/types";

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

    const dispatch = useDispatch();
    const location = useLocation() as TLocation;

    const { isAuthChecked, isError, error, authInProgress } = useSelector(state => state.auth);

    const { inputValues, handleChangeInput, isLoginValid } = useInputsHandler();
    
    const locationFrom = (location.state?.from || location) as TLocation;
    const pathTo =  location.state?.from?.pathname || PAGE_HOME;
    
    if (isAuthChecked) return <Navigate to={pathTo} replace={true} state={{...locationFrom.state}}/>;
    
    if (authInProgress) return (<p className={`mt-6 text text_type_main-default ${styles.authInProgress}`}>Авторизация пользователя...</p>);

    const submitHandler = () => dispatch(signIn({ email: inputValues.login, password: inputValues.password }));

    const inputsElem = [
        <Input type='email'
            placeholder='E-mail'
            onChange={handleChangeInput}
            value={inputValues.login || ''}
            name='login'
            error={!isLoginValid}
            size='default' />,

        <PasswordInput
            onChange={handleChangeInput}
            value={inputValues.password || ''}
            name='password'
        />];

    return (

        <div className="page__section_center">
            <RegForm
                title={TITLE}
                isError={isError}
                error={error}
                submitButtonTitle={TITLE_SUBMIT}
                submitHandler={submitHandler}
                inputs={inputsElem}
                isFormValid={isLoginValid}
                addInfo={addInfo} />
        </div>

    );
}
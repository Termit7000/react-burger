import React from "react";
import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import RegForm from "../../components/RegForm/RegForm";
import useInputsHandler from "../../hooks/useInputsHandler";
import { registerNewUser } from "../../services/actions/auth";
import { PAGE_HOME, PAGE_LOGIN } from "../../utils/constants";

const addInfo = [{
    title: 'Уже зарегистрированы?',
    link: { to: PAGE_LOGIN, text: 'Войти' }
}];

const TITLE = 'Регистрация';
const TITLE_SUBMIT = 'Зарегистрироваться';

export default function Registration() {

    const { inputValues, handleChangeInput, isLoginValid } = useInputsHandler();
    const { isAuthChecked, authInProgress, isError, error } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const submitHandler = () => {
        dispatch(registerNewUser({ email: inputValues.login, name: inputValues.userName, password: inputValues.password }));
    }

    if (isAuthChecked) {
        return (<Navigate to={PAGE_HOME} replace={true} />);
    }

    if (authInProgress) {
        return (<p className="text text_type_main-default">Регистрация нового пользователя...</p>);
    }

    const inputsElem = [

        <Input type='text'
            placeholder='Имя'
            onChange={handleChangeInput}
            value={inputValues.userName || ''}
            name='userName'
            size='default' />,

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

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import RegForm from "../../components/RegForm/RegForm";
import useInputsHandler from "../../hooks/useInputsHandler";
import { fetchResetPassword } from "../../utils/api";

import {
    PAGE_FORGOT_PASSWORD,
    PAGE_HOME,
    PAGE_LOGIN,
    PAGE_REGISTER
} from "../../utils/constants";

const addInfo = [{
    title: 'Вы новый пользователь?',
    link: { to: PAGE_REGISTER, text: 'Зарегистрироваться' }
},
{
    title: 'Забыли пароль?',
    link: { to: PAGE_FORGOT_PASSWORD, text: 'Восстановить пароль' }
}];

const TITLE = 'Восстановление пароля';
const TITLE_SUBMIT = 'Сохранить';

export default function ResetPassword() {

    const stateLocation = useLocation().state;
    const isFromForgotPasswordPage = stateLocation?.from === PAGE_FORGOT_PASSWORD;

    const { inputValues, handleChangeInput } = useInputsHandler();
    const { isAuthChecked } = useSelector(state => state.auth);

    const [request, setRequestData] = useState({
        inProgress: false,
        isError: false,
        error: '',
        success: false
    });

    if (isAuthChecked) return <Navigate to={PAGE_HOME} replace={true} />;
    if (request.success || !isFromForgotPasswordPage) return <Navigate to={PAGE_LOGIN} replace={true} />;
    if (request.inProgress) return <p className={`text text_type_main-medium`}>Установка нового пароля...</p>

    const handleSubmit = () => {

        setRequestData({ ...request, inProgress: true });
        fetchResetPassword({
            password: inputValues.password,
            token: inputValues.resetCode
        })
            .then(() => setRequestData({ ...request, success: true }))
            .catch(error => setRequestData({ ...request, isError: true, error }))
            .finally(() => setRequestData(current => ({ ...current, inProgress: false })));
    };

    const inputsElem = [
        <PasswordInput
            onChange={handleChangeInput}
            value={inputValues.password || ''}
            name='password'
        />,
        <Input type='text'
            placeholder='Введите код из письма'
            onChange={handleChangeInput}
            value={inputValues.resetCode || ''}
            name='resetCode'
            size='default' />];

    return (

        <div className="page__section_center">
            <RegForm
                title={TITLE}
                isError={request.isError}
                error={request.error}
                submitButtonTitle={TITLE_SUBMIT}
                submitHandler={handleSubmit}
                inputs={inputsElem}
                isFormValid={true}
                addInfo={addInfo} />
        </div>
    );
}

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import RegForm from "../../components/RegForm/RegForm";
import useInputsHandler from "../../hooks/useInputsHandler";
import { fetchResetPassword } from "../../utils/api";

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
    const { isAuthChecked } = useSelector(state => state.auth);
    
    const [request, setRequestData] = useState({
        inProgress:false, 
        isError:false, 
        error:'', 
        success: false 
    });

    if (isAuthChecked) return <Navigate to='/' replace={true} />;
    if (request.success) return <Navigate to='/login' replace={true} />;
    if (request.inProgress) return <p className={`text text_type_main-medium`}>Установка нового пароля...</p>

    const handleSubmit = () => {

        setRequestData({...request, inProgress:true});
        fetchResetPassword({ 
            password: inputValues.password, 
            token: inputValues.resetCode })
            .then(()=> setRequestData({...request, success: true}))
            .catch(error=>setRequestData({...request, isError: true, error}))
            .finally(()=>setRequestData(current=>({...current, inProgress: false})));
    };

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

        <RegForm
            title={TITLE}
            isError={request.isError}
            error={request.error}
            submitButtonTitle={TITLE_SUBMIT}
            submitHandler={handleSubmit}
            inputs={inputsElem}
            isFormValid={true}
            addInfo={addInfo} />
    );
}
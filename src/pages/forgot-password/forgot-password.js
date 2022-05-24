import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

import RegForm from "../../components/RegForm/RegForm";
import useInputsHandler from "../../hooks/useInputsHandler";
import { fetchForgotPassword } from "../../utils/api";


const addInfo = [{
    title: 'Вспомнили пароль?',
    link: { to: '/login', text: 'Войти' }    
}];

const TITLE = 'Восстановление пароля';
const TITLE_SUBMIT = 'Восстановить';

export default function ForgotPassword() {

    const { inputValues, handleChangeInput, isLoginValid } = useInputsHandler();

    const {isAuthChecked} = useSelector(state=>state.auth);    
    const [changeRequest, setRequestData] = useState({isError:false, error:'', success: false, inProgress: false});

    if (isAuthChecked) return (<Navigate to='/'/>);
    if (changeRequest.success) return (<Navigate to='/reset-password'/>);
    if (changeRequest.inProgress) return (<p className={`text text_type_main-medium`}>Проверка email...</p>);

    const handleSubmit = ()=> {

        setRequestData({...changeRequest, inProgress:true});

        fetchForgotPassword({email: inputValues.login})
            .then(()=>setRequestData({...changeRequest, success: true}))
            .catch(error=>setRequestData({...changeRequest, isError: true, error}))
            .finally(()=>setRequestData(currentState=>({...currentState, inProgress:false})));
    };    

    const inputElem = 
        <Input type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={handleChangeInput}
            value={inputValues.login || ''}
            name={'login'}
            error={!isLoginValid}            
            size={'default'} />;

    return (

        <RegForm 
            title={TITLE} 
            isError={changeRequest.isError} 
            error={changeRequest.error} 
            submitButtonTitle={TITLE_SUBMIT} 
            submitHandler={handleSubmit} 
            inputs={[inputElem]} 
            isFormValid={isLoginValid} 
            addInfo={addInfo} />
    );
}
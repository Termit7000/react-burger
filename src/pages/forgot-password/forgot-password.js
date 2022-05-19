import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

import RegForm from "../../components/RegForm/RegForm";
import useInputsHandler from "../../hooks/useInputsHandler";

const addInfo = [{
    title: 'Вспомнили пароль?',
    link: { to: '/login', text: 'Войти' }    
}];

const TITLE = 'Восстановление пароля';
const TITLE_SUBMIT = 'Восстановить';

export default function ForgotPassword() {

    const { inputValues, handleChangeInput, isLoginValid } = useInputsHandler();

    const inputElem = 
        <Input type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={handleChangeInput}
            value={inputValues.login || ''}
            name={'login'}
            error={!isLoginValid}            
            size={'default'} />;

    return (

        <RegForm title={TITLE} submitButtonTitle={TITLE_SUBMIT} submitHandler={f => f} inputs={[inputElem]} isFormValid={isLoginValid} addInfo={addInfo} />

    );
}
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import RegForm from "../../components/RegForm/RegForm";
import useInputsHandler from "../../hooks/useInputsHandler";
import { updateUser } from "../../redux/thunks";

const TITLE_SUBMIT = 'Сохранить';

export default function ProfileForm() {

    const { user, isErrorUpdate, error, updateInProgress } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { inputValues, handleChangeInput, isLoginValid, setInputsValue } = useInputsHandler({ userName: user.name, login: user.email });

    if (updateInProgress) return <p className="text text_type_main-medium">Обновление данных пользователя...</p>

    const isFormValid = Boolean(isLoginValid && inputValues.userName && inputValues.login && inputValues.password);

    const submitHandler = () => {

        dispatch(updateUser({
            email: inputValues.login,
            password: inputValues.password,
            name: inputValues.userName
        }))
    };

    const handleCancel = e => {
        e.preventDefault();
        setInputsValue({ userName: user.name, login: user.email });

    };

    const inputsElem = [

        <Input type='text'
            placeholder='Имя'
            onChange={handleChangeInput}
            value={inputValues.userName}
            name='userName'
            size='default'
            icon='EditIcon' />,

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


    const addButton = <Button onClick={handleCancel}>Отмена</Button>

    return (
        <RegForm
            isError={isErrorUpdate}
            error={error}
            submitButtonTitle={TITLE_SUBMIT}
            submitHandler={submitHandler}
            inputs={inputsElem}
            isFormValid={isFormValid}
            addButton={addButton} />
    );
}
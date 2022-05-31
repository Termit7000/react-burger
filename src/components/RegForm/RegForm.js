
import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

import styles from './RegForm.module.css';

function RegForm({ title, isError, error, submitButtonTitle, submitHandler, inputs, isFormValid, addInfo, addButton }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        submitHandler();
    }

    return (
        <section aria-label="login-form" className={styles.container}>

            {isError && <p>`Ошибка: ${error}`</p>}

            <form name="loginForm" className={styles.form} onSubmit={handleSubmit}>
                <h2 className={`text text_type_main-medium`}> {title} </h2>

                <fieldset className={`mt-6 mb-6 ${styles.fieldset}`}>

                    {inputs.map((el, index) => (
                        <Fragment key={index}>
                            {el}
                        </Fragment>
                    ))}

                </fieldset>

                <div className={styles.buttons}>

                    {addButton}

                    <Button disabled={!isFormValid} type="primary" size="medium">
                        {submitButtonTitle}
                    </Button>                   

                </div>

                {addInfo.map(({ title, link }, index) =>
                    <div className={`${index === 0 ? 'mt-20' : 'mt-4'} ${styles.addActions}`} key={index}>
                        <p className='text text_type_main-default text_color_inactive'>{title}</p>
                        <Link className='link' to={link.to}>{link.text}</Link>
                    </div>
                )}
            </form>
        </section>
    );
}

const addInfoShape = PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.shape({
        to: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired
}));

RegForm.propTypes = {
    title: PropTypes.string,
    isError: PropTypes.bool,
    error: PropTypes.string,
    submitButtonTitle: PropTypes.string.isRequired,
    submitHandler: PropTypes.func,
    isFormValid: PropTypes.bool,
    inputs: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
    addInfo: PropTypes.oneOfType([PropTypes.array, addInfoShape]),
    addButton: PropTypes.element
};

RegForm.defaultProps = {
    title: '',
    isError: false,
    error: '',
    isFormValid: false,
    addInfo: [],
    addButton: null
}

export default RegForm;
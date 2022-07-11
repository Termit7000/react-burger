
import React, { FC, Fragment, SyntheticEvent } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

import styles from './RegForm.module.css';
import { TRegFormProps } from "./types";

const RegForm:FC<TRegFormProps>=({ title='', isError=false, error='', submitButtonTitle='', submitHandler, inputs, isFormValid=false, addInfo=[], addButton=null }) =>{

    const handleSubmit = (e: SyntheticEvent) => {
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

export default RegForm;
import React, { useRef, useEffect, useMemo } from "react";
import PropTypes from 'prop-types';
import { createPortal } from "react-dom";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { MODAL_ROOT_NAME } from "../../utils/constants";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

import styles from './Modal.module.css';


function Modal({ handlerClose, children }) {
  
    const refOverlay = useRef();

    const modalElement = useMemo(()=>document.getElementById(MODAL_ROOT_NAME), []);

    const closeSmooth = ()=> refOverlay.current.closeSmooth();

    useEffect(() => {

        const closeOnEsc = (event) => {
            if (event.key === 'Escape') {
                closeSmooth();                
            }
        };

        document.addEventListener('keydown', closeOnEsc);
        return () => document.removeEventListener('keydown', closeOnEsc);

    }, []);

    return (
        createPortal(

            <ModalOverlay ref={refOverlay} handlerClose={handlerClose}>

                <div className={styles.modal}>
                    <div className={styles.icon_close} onClick={closeSmooth}>
                        <CloseIcon type="primary" />
                    </div>
                    {children}
                </div>

            </ModalOverlay>

            , modalElement)
    );
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    handlerClose: PropTypes.func.isRequired
}

export default Modal;
import React, { useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import { MODAL_ROOT } from "../../utils/constants";
import { createPortal } from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { useModals } from "../../contexts/modal-context";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Modal.module.css';

function Modal({ children }) {

    const { closeModal } = useModals();
    const refOverlay = useRef();

    const closeSmooth = ()=> refOverlay.current.closeSmooth();

    useEffect(() => {

        const closeOnEsc = (event) => {
            if (event.key === 'Escape') {
                closeSmooth();                
            }
        };

        document.addEventListener('keydown', closeOnEsc);
        return () => document.removeEventListener('keydown', closeOnEsc);

    }, [closeModal]);

    return (
        createPortal(

            <ModalOverlay ref={refOverlay} handlerClose={closeModal}>

                <div className={styles.modal}>
                    <div className={styles.icon_close} onClick={closeSmooth}>
                        <CloseIcon type="primary" />
                    </div>
                    {children}
                </div>

            </ModalOverlay>

            , MODAL_ROOT)
    );
}

Modal.propTypes = {
    children: PropTypes.element.isRequired
}

export default Modal;
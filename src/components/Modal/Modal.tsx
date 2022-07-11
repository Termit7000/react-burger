import React, { useRef, useEffect, useMemo, FC } from "react";

import { createPortal } from "react-dom";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { MODAL_ROOT_NAME } from "../../utils/constants";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

import styles from './Modal.module.css';
import { TExportFunctionsOverlay, TModalParams } from "../ModalOverlay/types";

const Modal:FC<TModalParams>=({ handlerClose, children }) => {
    
    const refOverlay = useRef<TExportFunctionsOverlay>(null);
    const modalElement = useMemo<HTMLElement | null>(()=>document.getElementById(MODAL_ROOT_NAME), []);

    const closeSmooth = ()=> refOverlay.current!.closeSmooth();

    useEffect(() => {

        const closeOnEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeSmooth();                
            }
        };

        document.addEventListener('keydown', closeOnEsc);
        return () => document.removeEventListener('keydown', closeOnEsc);

    }, []);

    return (

        modalElement &&
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

export default Modal;
import React, { useState } from "react";
import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import { MODAL_ELEMENT } from "../../utils/constants";
import { createPortal } from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

function Modal({ children }) {
    const [opened, useOpened] = useState(true);

    function useCloseHandler() {
        useOpened(false);
    }

    return (
        opened && createPortal(

            <ModalOverlay onCloseHandler={useCloseHandler}>
                {children}
            </ModalOverlay>

            , MODAL_ELEMENT)
    );
}

export default Modal;
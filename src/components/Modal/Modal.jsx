import React from "react";
import PropTypes from 'prop-types';
import { MODAL_ROOT } from "../../utils/constants";
import { createPortal } from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

function Modal({ handleClose,  children }) {

    return (
       createPortal(

            <ModalOverlay onCloseHandler={handleClose}>
                {children}
            </ModalOverlay>

            , MODAL_ROOT)
    );
}

Modal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
}

export default Modal;
import React from "react";
import PropTypes from 'prop-types';
import { MODAL_ROOT } from "../../utils/constants";
import { createPortal } from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { useIngredients } from "../../contexts/ingredient-context";

function Modal({children }) {

    const {closeModal} = useIngredients();

    return (
       createPortal(

            <ModalOverlay onCloseHandler={closeModal}>
                {children}
            </ModalOverlay>

            , MODAL_ROOT)
    );
}

/*
Modal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
}

*/

export default Modal;
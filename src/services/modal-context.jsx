import React, {useState, createContext, useContext } from "react";
import PropTypes from 'prop-types';

const ModalContext = createContext();
export const useModals = ()=> useContext(ModalContext);

function ModalProvider({children}){

    const [contentModal, setModalOpened] = useState({isOpened: false});
    const openModal = (content) => setModalOpened({...content, isOpened: true});
    const closeModal = ()=>setModalOpened({isOpened: false});    

    return (
        <ModalContext.Provider value={{contentModal, openModal,closeModal}}>
            {children}
        </ModalContext.Provider>
    );
}

ModalProvider.propTypes= {
    children: PropTypes.element.isRequired
}

export default ModalProvider;
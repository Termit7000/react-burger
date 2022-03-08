import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useRef } from "react";
import styles from './ModalOverlay.module.css';

function ModalOverlay({ onCloseHandler, children }) {

    const refContainer = useRef();

    function closeModal() {
        refContainer.current.classList.remove(styles.opened);
        setTimeout(onCloseHandler, 400);
    }

    function onClick(ev) {

        if ([...ev.target.classList].includes(styles.overlay)) {
            closeModal();
        }
    }

    function closeOnEsc(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', closeOnEsc);
        return () => document.removeEventListener('keydown', closeOnEsc);
    }, []);

    return (
        <div ref={refContainer} className={`${styles.overlay} ${styles.opened}`} onMouseDown={onClick}>

            <div className={styles.popup}>

                   <div className={styles.icon_close} onClick={closeModal}>                    
                    <CloseIcon type="primary" />
                </div>

                {children}
            </div>            
        </div>);
}

export default ModalOverlay;
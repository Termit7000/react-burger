import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useCallback, useEffect, useRef } from "react";
import styles from './ModalOverlay.module.css';

function ModalOverlay({ onCloseHandler, children }) {

    const refContainer = useRef();

    const closeModal = useCallback(() => {
        refContainer.current.classList.remove(styles.opened);
        setTimeout(onCloseHandler, 400);
    }, [onCloseHandler]);

    const onClick = (ev) => {

        if ([...ev.target.classList].includes(styles.overlay)) {
            closeModal();
        }
    }

    useEffect(() => {

        const closeOnEsc = (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        document.addEventListener('keydown', closeOnEsc);
        return () => document.removeEventListener('keydown', closeOnEsc);
        
    }, [closeModal]);

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
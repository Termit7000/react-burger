
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import styles from './ModalOverlay.module.css';

const ModalOverlay = forwardRef(({ handlerClose, children }, ref) => {

    const refContainer = useRef();

    const closeSmooth = () => {
        refContainer.current.classList.remove(styles.opened);
        setTimeout(handlerClose, 400);
    };

    useImperativeHandle(ref, ()=> ({
        closeSmooth: ()=> closeSmooth()
    }));

    const onMouseDown = (ev) => {

        if ([...ev.target.classList].includes(styles.overlay)) {
            closeSmooth();
        }
    }

    return (
        <div ref={refContainer} className={`${styles.overlay} ${styles.opened}`} onMouseDown={onMouseDown}>
            {children}
        </div>);
});

export default ModalOverlay;
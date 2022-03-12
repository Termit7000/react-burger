
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import PropTypes from 'prop-types';
import styles from './ModalOverlay.module.css';

const ModalOverlay = forwardRef(({ handlerClose, children }, ref) => {

    const refContainer = useRef();

    const closeSmooth = () => {
        refContainer.current.classList.remove(styles.overlay_opened);
        setTimeout(handlerClose, 400);
    };

    useImperativeHandle(ref, ()=> ({ closeSmooth }));

    const onMouseDown = (ev) => {

        if ([...ev.target.classList].includes(styles.overlay)) {
            closeSmooth();
        }
    }

    return (
        <div ref={refContainer} className={`${styles.overlay} ${styles.overlay_opened}`} onMouseDown={onMouseDown}>
            {children}
        </div>);
});


ModalOverlay.propTypes = {
    handlerClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
}

export default ModalOverlay;
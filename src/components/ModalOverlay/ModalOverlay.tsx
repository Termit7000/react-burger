import React, { forwardRef, MouseEvent, useImperativeHandle, useRef } from "react";
import styles from './ModalOverlay.module.css';
import { TExportFunctionsOverlay, TPropsModalOverlay } from "./types";

const ModalOverlay = forwardRef<TExportFunctionsOverlay, TPropsModalOverlay>(({ handlerClose, children }, ref) => {

    const refContainer = useRef<HTMLDivElement>(null);

    const closeSmooth = () => {
        if (refContainer.current) {
            refContainer.current.classList.remove(styles.overlay_opened);
            setTimeout(handlerClose, 400);
        }
    };

    useImperativeHandle(ref, () =>({closeSmooth}))    

    const onMouseDown = ( {target}: MouseEvent<HTMLElement>) => {

       const classes = Array.from((target as HTMLElement).classList);

        if (classes.includes(styles.overlay)) {
            closeSmooth();
        }
    }

    return (
        <div ref={refContainer} className={`${styles.overlay} ${styles.overlay_opened}`} onMouseDown={onMouseDown}>
            {children}
        </div>);
});

export default ModalOverlay;
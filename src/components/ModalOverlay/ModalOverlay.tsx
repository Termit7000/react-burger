
import React, { forwardRef, MouseEvent, useImperativeHandle, useRef, PropsWithChildren } from "react";
import styles from './ModalOverlay.module.css';
import { TExportFunctionsOverlay } from "./types";

type TProps = PropsWithChildren<{ handlerClose: () => void }>;
const ModalOverlay = forwardRef<TExportFunctionsOverlay, TProps>(({ handlerClose, children }, ref) => {

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
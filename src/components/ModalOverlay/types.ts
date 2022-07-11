import { PropsWithChildren } from "react";

export type TExportFunctionsOverlay = {
    closeSmooth: ()=>void
}

export type TPropsModalOverlay = PropsWithChildren<{ handlerClose: () => void }>;

export type TModalParams = {
    handlerClose: ()=>void;
}
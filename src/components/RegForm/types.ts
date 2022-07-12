import React from "react";

export type TAddInfo = {
    title: string;
    link: {
        to: string;
        text: string;
    }
}

export type TRegFormProps = {
    title?: string;
    isError: boolean;
    error: string;
    submitButtonTitle: string;
    submitHandler: () => void;
    inputs: React.ReactElement[];
    isFormValid: boolean;
    addInfo?: TAddInfo[];
    addButton?: React.ReactElement;
}

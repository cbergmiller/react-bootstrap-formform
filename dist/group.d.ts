import * as React from 'react';
export interface IGroupProps {
    controlId: string;
    label: string;
    isHorizontal: boolean;
    type: string;
    addonPrepend: string;
    addonAppend: string;
    col1: number;
    col2: number;
    validationState: string;
    helpText: string;
}
export declare class Group extends React.Component<IGroupProps, any> {
    constructor(props: any);
    render(): JSX.Element;
}

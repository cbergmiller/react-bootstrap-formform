import * as React from 'react';
export interface IFileInputProps {
    name: String;
    value: any;
    onChange: (event: any) => void;
}
export declare class FileInput extends React.Component<IFileInputProps, any> {
    _input: Element;
    constructor(props: IFileInputProps);
    callChangeHandler(file: any): void;
    onClear(event: any): void;
    clear(): void;
    onChange(e: any): void;
    proxyClick(): void;
    render(): any;
}

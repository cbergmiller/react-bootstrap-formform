import * as React from 'react';
import { FileInput } from './fileinput';
export interface IFieldConfig {
    type: string;
    name: string;
    label?: string;
    addonPrepend?: string;
    addonAppend?: string;
    choices?: string[][];
    placeholder?: string;
    helpText?: string;
    validationState?: string;
}
export interface IFormFormProps {
    fields: Array<IFieldConfig>;
    values: any;
    isHorizontal?: boolean;
    col1?: number;
    col2?: number;
    isStatic?: boolean;
    onChange: (v: any) => void;
    onSubmit?: () => void;
    onFocus?: (name: string) => void;
}
export declare class FormForm extends React.Component<IFormFormProps, any> {
    constructor(props: IFormFormProps);
    /**
     * Merge an object with validation errors into an existing field-configuration-array.
     * The FieldConfig-objects are cloned for safe use with the React.Component.setState method.
     */
    static mergeValidationMsg(fields: IFieldConfig[], messages: any): IFieldConfig[];
    static clearFieldError(fields: IFieldConfig[], name: string): IFieldConfig[];
    static getFieldByName(fields: IFieldConfig[], name: string): IFieldConfig;
    handleChange(event: any): void;
    handleMultiChange(event: any): void;
    handleClick(event: any): void;
    callOnChange(name: string, newValue: any): void;
    handleSubmit(event: any): void;
    handleOnFocus(event: any): void;
    static getChoiceDisplay(value: any, choices: any): any;
    static getMultiChoiceDisplay(values: any[], choices: any[][]): any;
    render(): any;
}
export { FileInput };

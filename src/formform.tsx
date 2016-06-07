import * as _ from 'underscore';
import * as React from 'react';
import SyntheticEvent = __React.SyntheticEvent;
import { Col, Form, FormGroup, ControlLabel, FormControl, Checkbox, Glyphicon, HelpBlock } from 'react-bootstrap';

import { Group } from './group';
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
    isHorizontal: boolean;
    col1?: number;
    col2?: number;
    isStatic: boolean;
    onChange: (v: any) => void;
    onSubmit?: () => void;
    onFocus?: (name: string) => void;
}

export class FormForm extends React.Component<IFormFormProps, any> {
    constructor(props: IFormFormProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleMultiChange = this.handleMultiChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnFocus = this.handleOnFocus.bind(this);
    }

    /**
     * Merge an object with validation errors into an existing field-configuration-array.
     * The FieldConfig-objects are cloned for safe use with the React.Component.setState method.
     */
    static mergeValidationMsg(fields: IFieldConfig[], messages: any): IFieldConfig[] {
        let arr = [];

        _.each(fields, (field: IFieldConfig) => {
            let msg, _field = _.clone(field);

            msg = messages[field.name];
            if (msg) {
                if (_.isArray(msg)) {
                    msg = msg[0];
                }
                _.extend(_field, {
                    helpText: msg,
                    validationState: 'error',
                });
            } else {
                // clear previous validation errors
                _.extend(_field, {
                    helpText: null,
                    validationState: null,
                });
            }
            arr.push(_field);
        });
        return arr;
    }

    static clearFieldError(fields: IFieldConfig[], name: string): IFieldConfig[] {
        let field, clonedFields;

        clonedFields = _.clone(fields);
        field = FormForm.getFieldByName(clonedFields, name);
        field.helpText = null;
        field.validationState = null;
        return clonedFields;
    }

    static getFieldByName(fields: IFieldConfig[], name: string): IFieldConfig {
        return _.find(fields, (field: IFieldConfig) => {
            return field.name === name;
        });
    }

    handleChange(event: any): void {
        // console.log('handleChange', event.target)
        this.callOnChange(event.target.name, event.target.value);
    }

    handleMultiChange(event: any): void {
        let values, options;
        // console.log('handleMultiChange', event.target)
        options = event.target.options;
        values = [];
        _.each(event.target.options, (option: HTMLOptionElement) => {
            if (option.selected) {
                values.push(option.value);
            }
        });
        this.callOnChange(event.target.name, values);
    }

    handleClick(event: any): void {
        let value;
        // console.log('handleClick', event.target)
        if (this.props.values) {
            value = this.props.values[event.target.name];
        } else {
            value = false;
        }
        this.callOnChange(event.target.name, !value);
    }

    callOnChange(name: string, newValue: any): void {
        let clonedValues = {};

        _.each(this.props.values, (value: any, key: string) => {
            clonedValues[key] = _.clone(value);
        });
        clonedValues[name] = newValue;
        this.props.onChange(clonedValues);
    }

    handleSubmit(event: any): void {
        if (this.props.onSubmit) {
            event.preventDefault();
            this.props.onSubmit();
        }
    }

    handleOnFocus(event: any): void {
        if (this.props.onFocus) {
            this.props.onFocus(event.target.name);
        }
    }

    /*
     * Get the display string of a choice value.
     */
    static getChoiceDisplay(value: any, choices: any): any {
        let option;

        _.find(choices, (choice: any) => {
            if (choice[0] == value) {
                option = choice;
                return true;
            }
            if (_.isArray(choice[1])) {
                return _.find(choice[1], (c: any) => {
                    if (c[0] == value) {
                        option = c;
                        return true;
                    }
                });
            }
        });
        return option ? option[1] : '';
    }

    static getMultiChoiceDisplay(values: any[], choices: any[][]): any {
        let labels;

        if (!_.isArray(values)) {
            return '';
        }
        labels = [];
        _.each(values, (value: any) => {
            let label;

            label = FormForm.getChoiceDisplay(value, choices);
            if (label) {
                labels.push(label);
            }
        });
        return labels.join(', ');
    }

    render() {
        let fields = [];

        _.each(this.props.fields, (fieldConfig: IFieldConfig, index) => {
            let field, props, value;

            if (_.has(this.props.values, fieldConfig.name)) {
                value = this.props.values[fieldConfig.name];
            } else {
                value = null;
            }

            props = {
                isHorizontal: this.props.isHorizontal,
                key: fieldConfig.name || fieldConfig.label,
                col1: this.props.col1,
                col2: this.props.col2,
                controlId: index.toString(),
                onChange: this.handleChange,
                checked: value == true,
                type: fieldConfig.type,
                value: value,
                name: fieldConfig.name,
                choices: fieldConfig.choices,
                label: fieldConfig.label,
                addonPrepend: fieldConfig.addonPrepend,
                addonAppend: fieldConfig.addonAppend,
                placeholder: fieldConfig.placeholder,
                helpText: fieldConfig.helpText,
                validationState: fieldConfig.validationState,
            };
            // isStatic override
            if (this.props.isStatic) {
                switch (props.type) {
                    case 'select':
                        props.value = FormForm.getChoiceDisplay(props.value, props.choices);
                        break;
                    case 'multiselect':
                        props.value = FormForm.getMultiChoiceDisplay(props.value, props.choices);
                        break;
                    case 'checkbox':
                        props.value = props.value ? <Glyphicon glyph="check" /> : <Glyphicon glyph="unchecked" />;
                }
                props.type = 'static';
            }
            switch (props.type) {
                case 'text':
                case 'password':
                case 'number':
                case 'hidden':
                case 'textarea':
                    if (props.value === null) {
                        props.value = '';
                    }
                    if (props.type === 'textarea') {
                        props.componentClass = 'textarea';
                    }
                    field = (
                        <Group {...props}>
                            <FormControl {...props} onFocus={this.handleOnFocus}/>
                        </Group>
                    );
                    break;
                case 'select':
                case 'multiselect':
                    if (props.type === 'multiselect') {
                        props.multiple = true;
                        props.onChange = this.handleMultiChange;
                        if (props.value === null) {
                            props.value = [];
                        }
                    } else {
                        if (props.value === null) {
                            props.value = '';
                        }
                    }
                    field = (
                        <Group {...props}>
                            <FormControl {...props} componentClass="select">
                                {props.choices.map((choice: any[]) => {
                                    if (_.isArray(choice[1])) {
                                        // Nested optgroup choices
                                        return (
                                            <optgroup label={choice[0]} key={choice[0]}>
                                                {choice[1].map((c: any[]) => {
                                                    return <option key={c[0]} value={c[0]}>{c[1]}</option>;
                                                }) }
                                            </optgroup>
                                        );
                                    }
                                    return <option key={choice[0]} value={choice[0]}>{choice[1]}</option>;
                                }) }
                            </FormControl>
                        </Group>
                    );
                    break;
                case 'checkbox':
                    props.onClick = this.handleClick;
                    props.onChange = () => { };
                    props.value = '';
                    field = (
                        <Checkbox {...props}>
                            {props.label}
                        </Checkbox>
                    );
                    if (this.props.isHorizontal) {
                        field = (
                            <FormGroup key={props.key}>
                                <Col smOffset={this.props.col1} sm={this.props.col2}>
                                    {field}
                                </Col>
                            </FormGroup>
                        );
                    }
                    break;
                case 'file':
                    field = (
                        <Group {...props}>
                            <FileInput {...props} />
                        </Group>
                    );
                    break;
                case 'static':
                    field = (
                        <Group {...props}>
                            <FormControl.Static>
                                {props.value}
                            </FormControl.Static>
                        </Group>
                    );
                    break;
            }
            fields.push(field);
        });

        if (!this.props.isHorizontal) {
            return (
                <form onSubmit={this.handleSubmit}>
                    {fields}
                    {this.props.children}
                </form>
            );
        } else {
            return (
                <Form horizontal onSubmit={this.handleSubmit}>
                    {fields}
                    <FormGroup>
                        <Col smOffset={this.props.col1} sm={this.props.col2}>
                            {this.props.children}
                        </Col>
                    </FormGroup>
                </Form>
            );
        }
    }
}

export { FileInput }

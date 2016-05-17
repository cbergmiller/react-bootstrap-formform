/// <reference path="typings/browser.d.ts" />

import _ = require('underscore');
import React = require('react');
import SyntheticEvent = __React.SyntheticEvent;
import { Col, Form, FormGroup, ControlLabel, FormControl, Checkbox, Glyphicon, HelpBlock } from 'react-bootstrap';

import { Group } from './group';
import { FileInput } from './fileinput';


interface IFieldConfig {
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

interface IFormFormProps {
    fields: IFieldConfig[];
    values: any;
    isHorizontal: boolean;
    col1?: number;
    col2?: number;
    isStatic: boolean;
    onChange: (v: any) => void;
}

class FormForm extends React.Component<IFormFormProps, any> {
    constructor(props: IFormFormProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleMultiChange = this.handleMultiChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * Merge an object with validation errors into an existing field-configuration-array.
     * The FieldConfig-objects are cloned for safe use with the React.Component.setState method.
     */
    static mergeValidationMsg(fields: IFieldConfig[], messages: any): IFieldConfig[] {
        let arr = [];

        _.each(fields, (field: IFieldConfig) => {
            let _field = _.clone(field);

            if (messages[field.name]) {
                _.extend(_field, {
                    helpText: messages[field.name],
                    validationState: 'error',
                });
            }
            arr.push(_field);
        });
        return arr;
    }

    handleChange(event: any) {
        //console.log('handleChange', event.target)
        this.callOnChange(event.target.name, event.target.value);
    }

    handleMultiChange(event: any) {
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

    handleClick(event: any) {
        let value;
        // console.log('handleClick', event.target)
        value = this.props.values[event.target.name];
        this.callOnChange(event.target.name, !value);
    }

    callOnChange(name: string, newValue: any) {
        let clonedValues = {};

        _.each(this.props.values, (value: any, key: string) => {
            clonedValues[key] = _.clone(value);
        });
        clonedValues[name] = newValue;
        this.props.onChange(clonedValues);
    }

    /*
     * Get the display string of a choice value.
     */
    static getChoiceDisplay(value: any, choices: any[][]): any {
        var choice = _.find(choices, (choice: any[]) => {
            return choice[0] == value;
        });
        if (choice) return choice[1];
        return '';
    }

    static getMultiChoiceDisplay(values: any[], choices: any[][]): any {
        if (!_.isArray(values)) return '';
        return _.filter(choices, (choice: any[]) => {
            return _.find(values, (value: any) => {
                return value == choice[0];
            });
        }).map((choice: any[]) => {
            return choice[1];
        }).join(', ');
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
                    if (props.value === null) props.value = '';
                    if (props.type === 'textarea') {
                        props.componentClass = 'textarea';
                    }
                    field = (
                        <Group {...props}>
                            <FormControl {...props}/>
                        </Group>                        
                    );
                    break;
                case 'select':
                case 'multiselect':
                    if (props.type === 'multiselect') {
                        props.multiple = true;
                        props.onChange = this.handleMultiChange;
                        if (props.value === null) props.value = [];
                    } else {
                        if (props.value === null && props.choices) props.value = props.choices[0][0];
                    }
                    field = (
                        <Group {...props}>
                            <FormControl {...props} componentClass="select">
                                {props.choices.map((choice: string[]) => {
                                    return <option key={choice[0]} value={choice[0]}>{choice[1]}</option>
                                })}
                            </FormControl>
                        </Group>                        
                    );
                    break;
                case 'checkbox':
                    props.onClick = this.handleClick;
                    props.onChange = () => {};
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
                <form>
                    {fields}
                    {this.props.children}
                </form>
            );
        } else {
            return (
                <Form horizontal>
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

export { FormForm, IFieldConfig, FileInput }

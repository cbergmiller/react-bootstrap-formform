/// <reference path="typings/browser.d.ts" />

import _ = require('underscore')
import React = require('react')
import SyntheticEvent = __React.SyntheticEvent;
import { Col, Form, FormGroup, ControlLabel, FormControl, Checkbox } from 'react-bootstrap';

import { Group } from './group'


interface FieldConfig {
	type: string;
	name: string;
	label?: string;
	addonPrepend?: string;
	addonAppend?: string;
	value?: any;
	choices?: Array<Array<string>>;
    placeholder?: string;
	helpText?: string;
}

interface FormFormProps {
    fields: FieldConfig[],
    isHorizontal: boolean,
    col1?: number,
    col2?: number,
}

class FormForm extends React.Component<FormFormProps, any> {
    constructor(props: FormFormProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleMultiChange = this.handleMultiChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {};
        // copy values into the initial state
        _.each(props.fields, (field: FieldConfig)=>{
            var value = field.value;
            // use default if value is undefinied
            if (_.isUndefined(value)) {
                switch (field.type) {
                    case 'text':
                    case 'password':
                    case 'number':
                    case 'hidden':
                        value = '';
                        break;
                    case 'select':
                        if (field.choices) value = field.choices[0][0];
                        break;
                    case 'multiselect':
                        value = [];
                        break;
                    case 'checkbox':
                        value = false;
                        break;
                    default:
                        value = '';
                }
            }
            this.state[field.name] = value;
        });
    }

    componentWillReceiveProps(nextProps: any) {
        // ToDo: merge new value into state
    }

    handleChange(event: SyntheticEvent) {
        console.log('handleChange', event.target)
        this.setStateValue(event.target.name, event.target.value);
    }

    handleMultiChange(event: SyntheticEvent) {
        var values, options;
        console.log('handleMultiChange', event.target)
        options = event.target.options;
        values = [];
        _.each(event.target.options, (option)=>{
            if (option.selected) values.push(option.value);
        });
        this.setStateValue(event.target.name, values);
    }

    handleClick(event: SyntheticEvent) {
        console.log('handleClick', event.target)
        this.setStateValue(event.target.name, !this.state[event.target.name])
    }

    setStateValue(name: string, value: any) {
        var obj = {};
        obj[name] = value;
        this.setState(obj);

        setTimeout(()=>{
            console.log(this.state)
        }, 0)
    }

    render() {
        var fields = [];
        _.each(this.props.fields, (fieldConfig: FieldConfig, index)=>{
            var field, props;

            props = {
                isHorizontal: this.props.isHorizontal,
                key: fieldConfig.name || fieldConfig.label,
                col1: this.props.col1,
                col2: this.props.col2,
                controlId: index.toString(),
                onChange: this.handleChange,
            };
            _.extend(props, fieldConfig);
            switch (fieldConfig.type) {
                case 'text':
                case 'password':
                case 'number':
                case 'hidden':
                    props.value = this.state[fieldConfig.name];
                    field = (
                        <Group {...props}>
                            <FormControl
                                type={props.type}
                                name={props.name}
                                value={props.value}
                                placeholder={props.placeholder}
                                onChange={this.handleChange}
                            />
                        </Group>                        
                    );
                    break;
                case 'select':
                case 'multiselect':
                    props.value = this.state[fieldConfig.name];
                    if (fieldConfig.type == 'multiselect') {
                        props.multiple = true;
                        props.onChange = this.handleMultiChange;
                    } else {
                        props.multiple = false;
                        props.onChange = this.handleChange;
                    }

                    field = (
                        <Group {...props}>
                            <FormControl
                                componentClass="select"
                                name={props.name}
                                value={props.value}
                                placeholder={props.placeholder}
                                onChange={props.onChange}
                                multiple={props.multiple}>
                                {props.choices.map((choice: string[])=>{
                                    return <option key={choice[0]} value={choice[0]}>{choice[1]}</option>
                                })}
                            </FormControl>
                        </Group>                        
                    );
                    break;
                case 'checkbox':
                    if (this.state[fieldConfig.name]) props.checked = true;
                    field = (
                        <Checkbox {...props} onClick={this.handleClick} onChange={()=>{}}>
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
                case 'static':
                    field = (
                        <Group {...props}>
                            <FormControl.Static>
                                {fieldConfig.value}
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
                </form>
            )
        } else {
            return (
                <Form horizontal>
                    {fields}
                </Form>
            )
        }
    }
}

export { FormForm }

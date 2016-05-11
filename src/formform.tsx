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
	choices?: string[][];
    placeholder?: string;
	helpText?: string;
}

interface FormFormProps {
    fields: FieldConfig[],
    isHorizontal: boolean,
    col1?: number,
    col2?: number,
    isStatic: boolean,
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

    /*
     * Get the display string of a choice value.
     */
    static getChoiceDisplay(value: any, choices: any[][]): any {
        var choice = _.find(choices, (choice: any[])=>{
            return choice[0] == value
        });
        if (choice) return choice[1];
        return ''
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
            _.extend(props, fieldConfig, {
                value: this.state[fieldConfig.name],
                checked: this.state[fieldConfig.name] == true,
            });

            // isStatic override
            if (this.props.isStatic) {
                switch (props.type) {
                    case 'select':
                        props.value = FormForm.getChoiceDisplay(props.value, props.choices);
                        break;
                }
                props.type = 'static';
            }
            switch (props.type) {
                case 'text':
                case 'password':
                case 'number':
                case 'hidden':
                case 'textarea':
                    if (props.type == 'textarea') {
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
                    if (props.type == 'multiselect') {
                        props.multiple = true;
                        props.onChange = this.handleMultiChange;
                    }
                    field = (
                        <Group {...props}>
                            <FormControl {...props} componentClass="select">
                                {props.choices.map((choice: string[])=>{
                                    return <option key={choice[0]} value={choice[0]}>{choice[1]}</option>
                                })}
                            </FormControl>
                        </Group>                        
                    );
                    break;
                case 'checkbox':
                    props.onClick = this.handleClick;
                    props.onChange = ()=>{};
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

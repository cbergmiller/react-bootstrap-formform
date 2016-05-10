/// <reference path="typings/browser.d.ts" />

import _ = require('underscore')
import React = require('react')
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import { Input } from './input'
import { Select } from './select'


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
    }

    render() {
        var fields = [];
        _.each(this.props.fields, (fieldConfig: FieldConfig)=>{
            var field, props;

            props = {
                isHorizontal: this.props.isHorizontal,
                key: fieldConfig.name || fieldConfig.label,
                col1: this.props.col1,
                col2: this.props.col2,
                controlId: _.uniqueId('formform')
            };
            _.extend(props, fieldConfig);
            switch (fieldConfig.type) {
                case 'text':
                case 'password':
                case 'number':
                case 'hidden':
                    field = <Input {...props} />;
                    break;
                case 'select':
                    field = <Select {...props} />;
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

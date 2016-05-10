/// <reference path="typings/browser.d.ts" />

import _ = require('underscore')
import React = require('react')
import { Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import { Input } from './input'


interface FieldConfig {
	type: string;
	name?: string;
    id?: string;
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
}

class FormForm extends React.Component<FormFormProps, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        var fields = [];
        _.each(this.props.fields, (fieldConfig: FieldConfig, index)=>{
            _.extend(fieldConfig, {
                key: fieldConfig.id ? fieldConfig.id : index,
            });
            fields.push(<Input {...fieldConfig}/>);
        });

        return (
            <form>
                {fields}
            </form>
        )
    }
}

export { FormForm }
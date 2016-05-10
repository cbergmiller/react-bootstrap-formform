/// <reference path="typings/browser.d.ts" />

import React = require('react')
import { Col, FormGroup, ControlLabel, FormControl, InputGroup } from 'react-bootstrap';


interface FormFormInputProps {
    label?: string,
    placeholder?: string,
    type: string,
    col1?: number,
    col2?: number,
    isHorizontal: boolean,
    controlId: any,
    addonPrepend?: string;
	addonAppend?: string;
}


export class Input extends React.Component<FormFormInputProps, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        var input, formControl, inputGroup, addonPrepend, addonAppend;

        formControl = (
            <FormControl type={this.props.type} placeholder={this.props.placeholder} />
        );
        addonPrepend = this.props.addonPrepend ? (
            <InputGroup.Addon>{this.props.addonPrepend}</InputGroup.Addon>
        ) : null;
        addonAppend = this.props.addonAppend ? (
            <InputGroup.Addon>{this.props.addonAppend}</InputGroup.Addon>
        ) : null;
        inputGroup = (
            <InputGroup>
                {addonPrepend}
                {formControl}
                {addonAppend}
            </InputGroup>
        );
        input = (addonPrepend || addonAppend) ? inputGroup : formControl; 

        if (!this.props.isHorizontal) {
            return (
                <FormGroup controlId={this.props.controlId}>
                    <ControlLabel>{this.props.label}</ControlLabel>
                    {input}
                </FormGroup>
            )
        } else {
            return (
                <FormGroup controlId={this.props.controlId}>
                    <Col componentClass={ControlLabel} sm={this.props.col1}>
                        {this.props.label}
                    </Col>
                    <Col sm={this.props.col2}>
                        {input}
                    </Col>
                </FormGroup>
            )
        }

    }
}

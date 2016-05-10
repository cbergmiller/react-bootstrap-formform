/// <reference path="typings/browser.d.ts" />

import React = require('react')
import { Col, FormGroup, ControlLabel, FormControl, InputGroup } from 'react-bootstrap';


interface SelectProps {
    label?: string,
    placeholder?: string,
    name: string,
    choices: string[][];
    col1?: number,
    col2?: number,
    isHorizontal: boolean,
    controlId: any,
    addonPrepend?: string;
	addonAppend?: string;
}


class Select extends React.Component<SelectProps, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        var input, formControl, inputGroup, addonPrepend, addonAppend;

        formControl = (
            <FormControl componentClass="select" name={this.props.name} placeholder={this.props.placeholder}>
                {this.props.choices.map((choice: string[])=>{
                    return <option key={choice[0]} value={choice[0]}>{choice[1]}</option>
                })}
            </FormControl>
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

export { Select }

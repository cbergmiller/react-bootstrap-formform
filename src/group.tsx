/// <reference path="typings/browser.d.ts" />

import React = require('react')
import { Col, FormGroup, ControlLabel, FormControl, InputGroup } from 'react-bootstrap';


class Group extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        var input, inputGroup, addonPrepend, addonAppend;
        
        addonPrepend = this.props.addonPrepend ? (
            <InputGroup.Addon>{this.props.addonPrepend}</InputGroup.Addon>
        ) : null;
        addonAppend = this.props.addonAppend ? (
            <InputGroup.Addon>{this.props.addonAppend}</InputGroup.Addon>
        ) : null;
        inputGroup = (
            <InputGroup>
                {addonPrepend}
                {this.props.children}
                {addonAppend}
            </InputGroup>
        );
        input = (addonPrepend || addonAppend) ? inputGroup : this.props.children;

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

export { Group }
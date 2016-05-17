
import React = require('react');
import { Col, FormGroup, ControlLabel, FormControl, InputGroup, HelpBlock } from 'react-bootstrap';


interface IGroupProps {
    controlId: string;
    label: string;
    isHorizontal: boolean;
    type: string;
    addonPrepend: string;
    addonAppend: string;
    col1: number;
    col2: number;
    validationState: string;
    helpText: string;
}

class Group extends React.Component<IGroupProps, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        let input, inputGroup, addonPrepend, addonAppend, help;

        if (this.props.type !== 'static') {
            addonPrepend = this.props.addonPrepend ? (
                <InputGroup.Addon>{this.props.addonPrepend}</InputGroup.Addon>
            ) : null;
            addonAppend = this.props.addonAppend ? (
                <InputGroup.Addon>{this.props.addonAppend}</InputGroup.Addon>
            ) : null;
        } else {
            addonPrepend = null;
            addonAppend = null;
        }

        inputGroup = (
            <InputGroup>
                {addonPrepend}
                {this.props.children}
                {addonAppend}
            </InputGroup>
        );
        input = (addonPrepend || addonAppend) ? inputGroup : this.props.children;
        help = this.props.helpText ? <HelpBlock>{this.props.helpText}</HelpBlock> : null;

        if (!this.props.isHorizontal) {
            return (
                <FormGroup controlId={this.props.controlId} validationState={this.props.validationState}>
                    <ControlLabel>{this.props.label}</ControlLabel>
                    {input}
                    {help}
                </FormGroup>
            );
        } else {
            return (
                <FormGroup controlId={this.props.controlId} validationState={this.props.validationState}>
                    <Col componentClass={ControlLabel} sm={this.props.col1}>
                        {this.props.label}
                    </Col>
                    <Col sm={this.props.col2}>
                        {input}
                        {help}
                    </Col>
                </FormGroup>
            );
        }
    }
}

export { Group }

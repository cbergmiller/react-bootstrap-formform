"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_bootstrap_1 = require('react-bootstrap');
var Group = (function (_super) {
    __extends(Group, _super);
    function Group(props) {
        _super.call(this, props);
    }
    Group.prototype.render = function () {
        var input, inputGroup, addonPrepend, addonAppend, help;
        if (this.props.type !== 'static') {
            addonPrepend = this.props.addonPrepend ? (React.createElement(react_bootstrap_1.InputGroup.Addon, null, this.props.addonPrepend)) : null;
            addonAppend = this.props.addonAppend ? (React.createElement(react_bootstrap_1.InputGroup.Addon, null, this.props.addonAppend)) : null;
        }
        else {
            addonPrepend = null;
            addonAppend = null;
        }
        inputGroup = (React.createElement(react_bootstrap_1.InputGroup, null, addonPrepend, this.props.children, addonAppend));
        input = (addonPrepend || addonAppend) ? inputGroup : this.props.children;
        help = this.props.helpText ? React.createElement(react_bootstrap_1.HelpBlock, null, this.props.helpText) : null;
        if (!this.props.isHorizontal) {
            return (React.createElement(react_bootstrap_1.FormGroup, {controlId: this.props.controlId, validationState: this.props.validationState}, this.props.label ? React.createElement(react_bootstrap_1.ControlLabel, null, this.props.label) : null, input, help));
        }
        else {
            return (React.createElement(react_bootstrap_1.FormGroup, {controlId: this.props.controlId, validationState: this.props.validationState}, React.createElement(react_bootstrap_1.Col, {componentClass: react_bootstrap_1.ControlLabel, sm: this.props.col1}, this.props.label), React.createElement(react_bootstrap_1.Col, {sm: this.props.col2}, input, help)));
        }
    };
    return Group;
}(React.Component));
exports.Group = Group;
//# sourceMappingURL=group.js.map
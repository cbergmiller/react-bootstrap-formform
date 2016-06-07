"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var _ = require('underscore');
var React = require('react');
var react_bootstrap_1 = require('react-bootstrap');
var group_1 = require('./group');
var fileinput_1 = require('./fileinput');
exports.FileInput = fileinput_1.FileInput;
var FormForm = (function (_super) {
    __extends(FormForm, _super);
    function FormForm(props) {
        _super.call(this, props);
        this.handleChange = this.handleChange.bind(this);
        this.handleMultiChange = this.handleMultiChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnFocus = this.handleOnFocus.bind(this);
    }
    /**
     * Merge an object with validation errors into an existing field-configuration-array.
     * The FieldConfig-objects are cloned for safe use with the React.Component.setState method.
     */
    FormForm.mergeValidationMsg = function (fields, messages) {
        var arr = [];
        _.each(fields, function (field) {
            var msg, _field = _.clone(field);
            msg = messages[field.name];
            if (msg) {
                if (_.isArray(msg)) {
                    msg = msg[0];
                }
                _.extend(_field, {
                    helpText: msg,
                    validationState: 'error',
                });
            }
            else {
                // clear previous validation errors
                _.extend(_field, {
                    helpText: null,
                    validationState: null,
                });
            }
            arr.push(_field);
        });
        return arr;
    };
    FormForm.clearFieldError = function (fields, name) {
        var field, clonedFields;
        clonedFields = _.clone(fields);
        field = FormForm.getFieldByName(clonedFields, name);
        field.helpText = null;
        field.validationState = null;
        return clonedFields;
    };
    FormForm.getFieldByName = function (fields, name) {
        return _.find(fields, function (field) {
            return field.name === name;
        });
    };
    FormForm.prototype.handleChange = function (event) {
        // console.log('handleChange', event.target)
        this.callOnChange(event.target.name, event.target.value);
    };
    FormForm.prototype.handleMultiChange = function (event) {
        var values, options;
        // console.log('handleMultiChange', event.target)
        options = event.target.options;
        values = [];
        _.each(event.target.options, function (option) {
            if (option.selected) {
                values.push(option.value);
            }
        });
        this.callOnChange(event.target.name, values);
    };
    FormForm.prototype.handleClick = function (event) {
        var value;
        // console.log('handleClick', event.target)
        if (this.props.values) {
            value = this.props.values[event.target.name];
        }
        else {
            value = false;
        }
        this.callOnChange(event.target.name, !value);
    };
    FormForm.prototype.callOnChange = function (name, newValue) {
        var clonedValues = {};
        _.each(this.props.values, function (value, key) {
            clonedValues[key] = _.clone(value);
        });
        clonedValues[name] = newValue;
        this.props.onChange(clonedValues);
    };
    FormForm.prototype.handleSubmit = function (event) {
        if (this.props.onSubmit) {
            event.preventDefault();
            this.props.onSubmit();
        }
    };
    FormForm.prototype.handleOnFocus = function (event) {
        if (this.props.onFocus) {
            this.props.onFocus(event.target.name);
        }
    };
    /*
     * Get the display string of a choice value.
     */
    FormForm.getChoiceDisplay = function (value, choices) {
        var option;
        _.find(choices, function (choice) {
            if (choice[0] == value) {
                option = choice;
                return true;
            }
            if (_.isArray(choice[1])) {
                return _.find(choice[1], function (c) {
                    if (c[0] == value) {
                        option = c;
                        return true;
                    }
                });
            }
        });
        return option ? option[1] : '';
    };
    FormForm.getMultiChoiceDisplay = function (values, choices) {
        var labels;
        if (!_.isArray(values)) {
            return '';
        }
        labels = [];
        _.each(values, function (value) {
            var label;
            label = FormForm.getChoiceDisplay(value, choices);
            if (label) {
                labels.push(label);
            }
        });
        return labels.join(', ');
    };
    FormForm.prototype.render = function () {
        var _this = this;
        var fields = [];
        _.each(this.props.fields, function (fieldConfig, index) {
            var field, props, value;
            if (_.has(_this.props.values, fieldConfig.name)) {
                value = _this.props.values[fieldConfig.name];
            }
            else {
                value = null;
            }
            props = {
                isHorizontal: _this.props.isHorizontal,
                key: fieldConfig.name || fieldConfig.label,
                col1: _this.props.col1,
                col2: _this.props.col2,
                controlId: index.toString(),
                onChange: _this.handleChange,
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
            if (_this.props.isStatic) {
                switch (props.type) {
                    case 'select':
                        props.value = FormForm.getChoiceDisplay(props.value, props.choices);
                        break;
                    case 'multiselect':
                        props.value = FormForm.getMultiChoiceDisplay(props.value, props.choices);
                        break;
                    case 'checkbox':
                        props.value = props.value ? React.createElement(react_bootstrap_1.Glyphicon, {glyph: "check"}) : React.createElement(react_bootstrap_1.Glyphicon, {glyph: "unchecked"});
                }
                props.type = 'static';
            }
            switch (props.type) {
                case 'text':
                case 'password':
                case 'number':
                case 'hidden':
                case 'textarea':
                    if (props.value === null) {
                        props.value = '';
                    }
                    if (props.type === 'textarea') {
                        props.componentClass = 'textarea';
                    }
                    field = (React.createElement(group_1.Group, __assign({}, props), React.createElement(react_bootstrap_1.FormControl, __assign({}, props, {onFocus: _this.handleOnFocus}))));
                    break;
                case 'select':
                case 'multiselect':
                    if (props.type === 'multiselect') {
                        props.multiple = true;
                        props.onChange = _this.handleMultiChange;
                        if (props.value === null) {
                            props.value = [];
                        }
                    }
                    else {
                        if (props.value === null) {
                            props.value = '';
                        }
                    }
                    field = (React.createElement(group_1.Group, __assign({}, props), React.createElement(react_bootstrap_1.FormControl, __assign({}, props, {componentClass: "select"}), props.choices.map(function (choice) {
                        if (_.isArray(choice[1])) {
                            // Nested optgroup choices
                            return (React.createElement("optgroup", {label: choice[0], key: choice[0]}, choice[1].map(function (c) {
                                return React.createElement("option", {key: c[0], value: c[0]}, c[1]);
                            })));
                        }
                        return React.createElement("option", {key: choice[0], value: choice[0]}, choice[1]);
                    }))));
                    break;
                case 'checkbox':
                    props.onClick = _this.handleClick;
                    props.onChange = function () { };
                    props.value = '';
                    field = (React.createElement(react_bootstrap_1.Checkbox, __assign({}, props), props.label));
                    if (_this.props.isHorizontal) {
                        field = (React.createElement(react_bootstrap_1.FormGroup, {key: props.key}, React.createElement(react_bootstrap_1.Col, {smOffset: _this.props.col1, sm: _this.props.col2}, field)));
                    }
                    break;
                case 'file':
                    field = (React.createElement(group_1.Group, __assign({}, props), React.createElement(fileinput_1.FileInput, __assign({}, props))));
                    break;
                case 'static':
                    field = (React.createElement(group_1.Group, __assign({}, props), React.createElement(react_bootstrap_1.FormControl.Static, null, props.value)));
                    break;
            }
            fields.push(field);
        });
        if (!this.props.isHorizontal) {
            return (React.createElement("form", {onSubmit: this.handleSubmit}, fields, this.props.children));
        }
        else {
            return (React.createElement(react_bootstrap_1.Form, {horizontal: true, onSubmit: this.handleSubmit}, fields, React.createElement(react_bootstrap_1.FormGroup, null, React.createElement(react_bootstrap_1.Col, {smOffset: this.props.col1, sm: this.props.col2}, this.props.children))));
        }
    };
    return FormForm;
}(React.Component));
exports.FormForm = FormForm;
//# sourceMappingURL=formform.js.map
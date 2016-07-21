(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("underscore"), require("react"), require("react-bootstrap"));
	else if(typeof define === 'function' && define.amd)
		define(["underscore", "react", "react-bootstrap"], factory);
	else if(typeof exports === 'object')
		exports["ReactBootstrapFormform"] = factory(require("underscore"), require("react"), require("react-bootstrap"));
	else
		root["ReactBootstrapFormform"] = factory(root["_"], root["React"], root["ReactBootstrap"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

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
	var _ = __webpack_require__(4);
	var React = __webpack_require__(5);
	var react_bootstrap_1 = __webpack_require__(6);
	var group_1 = __webpack_require__(7);
	var fileinput_1 = __webpack_require__(8);
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


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(5);
	var react_bootstrap_1 = __webpack_require__(6);
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


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var _ = __webpack_require__(4);
	var React = __webpack_require__(5);
	var react_bootstrap_1 = __webpack_require__(6);
	__webpack_require__(9);
	var FileInput = (function (_super) {
	    __extends(FileInput, _super);
	    function FileInput(props) {
	        _super.call(this, props);
	        this.onClear = this.onClear.bind(this);
	        this.onChange = this.onChange.bind(this);
	        this.proxyClick = this.proxyClick.bind(this);
	        this._input = null;
	    }
	    FileInput.prototype.callChangeHandler = function (file) {
	        this.props.onChange({
	            target: {
	                name: this.props.name,
	                value: file,
	            }
	        });
	    };
	    FileInput.prototype.onClear = function (event) {
	        this.clear();
	    };
	    FileInput.prototype.clear = function () {
	        this.callChangeHandler(null);
	    };
	    FileInput.prototype.onChange = function (e) {
	        var files;
	        if (_.isUndefined(e.target.files)) {
	            files = (e.target && e.target.value ? [{ name: e.target.value.replace(/^.+\\/, '') }] : []);
	        }
	        else {
	            files = e.target.files;
	        }
	        if (!files.length) {
	            this.clear();
	            return;
	        }
	        this.callChangeHandler(files[0]);
	    };
	    FileInput.prototype.proxyClick = function () {
	        var event = document.createEvent('HTMLEvents');
	        event.initEvent('click', true, true);
	        this._input.dispatchEvent(event);
	    };
	    FileInput.prototype.render = function () {
	        var _this = this;
	        var fileName, fileInputName, hiddenInputName, hiddenValue, fileInputClass;
	        fileInputName = this.props.name;
	        if (_.isString(this.props.value) && this.props.value.length) {
	            // preset filename
	            fileName = this.props.value;
	            fileInputClass = 'fileinput fileinput-exists';
	            hiddenValue = this.props.value;
	            hiddenInputName = this.props.name;
	            fileInputName = '';
	        }
	        else if (_.isObject(this.props.value) && this.props.value.name) {
	            // user selected file
	            fileName = this.props.value.name;
	            fileInputClass = 'fileinput fileinput-exists';
	            hiddenValue = '';
	            hiddenInputName = '';
	            fileInputName = this.props.name;
	        }
	        else {
	            // cleared by user, or no preset
	            fileName = '';
	            fileInputClass = 'fileinput fileinput-new';
	            hiddenValue = '';
	            hiddenInputName = this.props.name;
	            fileInputName = '';
	        }
	        return (React.createElement("div", {className: "controls"}, React.createElement("div", {className: fileInputClass}, React.createElement("div", {className: "input-group"}, React.createElement("div", {className: "form-control uneditable-input", onClick: this.proxyClick}, React.createElement("span", {className: "fileinput-filename"}, fileName)), React.createElement("span", {className: "input-group-addon btn btn-default btn-file"}, React.createElement("span", {className: "fileinput-new"}, "select File"), React.createElement("span", {className: "fileinput-exists"}, React.createElement(react_bootstrap_1.Glyphicon, {glyph: "file"})), React.createElement("input", {type: "file", name: fileInputName, onChange: this.onChange, ref: function (c) { return _this._input = c; }}), React.createElement("input", {type: "hidden", name: hiddenInputName, value: hiddenValue})), React.createElement("button", {className: "input-group-addon btn btn-default fileinput-exists", onClick: this.onClear}, React.createElement(react_bootstrap_1.Glyphicon, {glyph: "remove"}))))));
	    };
	    return FileInput;
	}(React.Component));
	exports.FileInput = FileInput;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(12)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./fileinput.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./fileinput.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports


	// module
	exports.push([module.id, "/* ===========================================================\n * http://jasny.github.com/bootstrap/javascript/#fileinput\n * ===========================================================\n * Copyright 2012-2014 Arnold Daniels\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\")\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n * http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n * ========================================================== */\n.btn-file {\n  overflow: hidden;\n  position: relative;\n  vertical-align: middle;\n}\n.btn-file > input {\n  position: absolute;\n  top: 0;\n  right: 0;\n  margin: 0;\n  opacity: 0;\n  filter: alpha(opacity=0);\n  font-size: 23px;\n  height: 100%;\n  width: 100%;\n  direction: ltr;\n  cursor: pointer;\n}\n.fileinput {\n  margin-bottom: 9px;\n  display: inline-block;\n}\n.fileinput .form-control {\n  padding-top: 7px;\n  padding-bottom: 5px;\n  display: inline-block;\n  margin-bottom: 0;\n  vertical-align: middle;\n  cursor: text;\n}\n.fileinput .thumbnail {\n  overflow: hidden;\n  display: inline-block;\n  margin-bottom: 5px;\n  vertical-align: middle;\n  text-align: center;\n}\n.fileinput .thumbnail > img {\n  max-height: 100%;\n}\n.fileinput .btn {\n  vertical-align: middle;\n}\n.fileinput-exists .fileinput-new,\n.fileinput-new .fileinput-exists {\n  display: none;\n}\n.fileinput-exists.close {\n  float: none;\n}\n.fileinput-inline .fileinput-controls {\n  display: inline;\n}\n.fileinput-filename {\n  vertical-align: middle;\n  display: inline-block;\n  overflow: hidden;\n}\n.form-control .fileinput-filename {\n  vertical-align: bottom;\n}\n.fileinput.input-group {\n  display: table;\n}\n.fileinput.input-group > * {\n  position: relative;\n  z-index: 2;\n}\n.fileinput.input-group > .btn-file {\n  z-index: 1;\n}\n.fileinput-new.input-group .btn-file,\n.fileinput-new .input-group .btn-file {\n  border-radius: 0 4px 4px 0;\n}\n.fileinput-new.input-group .btn-file.btn-xs,\n.fileinput-new .input-group .btn-file.btn-xs,\n.fileinput-new.input-group .btn-file.btn-sm,\n.fileinput-new .input-group .btn-file.btn-sm {\n  border-radius: 0 3px 3px 0;\n}\n.fileinput-new.input-group .btn-file.btn-lg,\n.fileinput-new .input-group .btn-file.btn-lg {\n  border-radius: 0 6px 6px 0;\n}\n.form-group.has-warning .fileinput .fileinput-preview {\n  color: #8a6d3b;\n}\n.form-group.has-warning .fileinput .thumbnail {\n  border-color: #faebcc;\n}\n.form-group.has-error .fileinput .fileinput-preview {\n  color: #a94442;\n}\n.form-group.has-error .fileinput .thumbnail {\n  border-color: #ebccd1;\n}\n.form-group.has-success .fileinput .fileinput-preview {\n  color: #3c763d;\n}\n.form-group.has-success .fileinput .thumbnail {\n  border-color: #d6e9c6;\n}\n.input-group-addon:not(:first-child) {\n  border-left: 0;\n}\n", ""]);

	// exports


/***/ },
/* 11 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ])
});
;
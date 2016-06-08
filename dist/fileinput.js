"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('underscore');
var React = require('react');
var react_bootstrap_1 = require('react-bootstrap');
require('./less/fileinput.less');
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
        return (React.createElement("div", {className: "controls"}, React.createElement("div", {className: fileInputClass}, React.createElement("div", {className: "input-group"}, React.createElement("div", {className: "form-control uneditable-input", onClick: this.proxyClick}, React.createElement("span", {className: "fileinput-filename"}, fileName)), React.createElement("span", {className: "input-group-addon btn btn-default btn-file"}, React.createElement("span", {className: "fileinput-new"}, "select File"), React.createElement("span", {className: "fileinput-exists"}, React.createElement(react_bootstrap_1.Glyphicon, {glyph: "file"})), React.createElement("input", {type: "file", name: fileInputName, onChange: this.onChange, ref: function (c) { return _this._input = c; }}), React.createElement("input", {type: "hidden", name: hiddenInputName, value: hiddenValue})), React.createElement("a", {href: "#", className: "input-group-addon btn btn-default fileinput-exists", onClick: this.onClear}, React.createElement(react_bootstrap_1.Glyphicon, {glyph: "remove"}))))));
    };
    return FileInput;
}(React.Component));
exports.FileInput = FileInput;
//# sourceMappingURL=fileinput.js.map
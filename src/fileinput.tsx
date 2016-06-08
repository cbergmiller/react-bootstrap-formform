
import * as _ from 'underscore';
import * as React from 'react';
import { Col, Glyphicon, FormGroup, ControlLabel, FormControl, InputGroup } from 'react-bootstrap';

require('./less/fileinput.less');


export interface IFileInputProps {
    name: String;
    value: any;
    onChange: (event: any) => void;
}

export class FileInput extends React.Component<IFileInputProps, any> {
    _input: Element;

    constructor(props: IFileInputProps) {
        super(props);
        this.onClear = this.onClear.bind(this);
        this.onChange = this.onChange.bind(this);
        this.proxyClick = this.proxyClick.bind(this);
        this._input = null;
    }

    callChangeHandler(file: any) {
        this.props.onChange({
           target: {
               name: this.props.name,
               value: file,
           }
        });
    }

    onClear(event: any): void {
        this.clear();
    }

    clear() {
        this.callChangeHandler(null);
    }

    onChange(e: any): void {
        let files;

        if (_.isUndefined(e.target.files)) {
            files = (e.target && e.target.value ? [{ name: e.target.value.replace(/^.+\\/, '')}] : []);
        } else {
            files = e.target.files;
        }

        if (!files.length) {
            this.clear();
            return;
        }
        this.callChangeHandler(files[0]);
    }

    proxyClick(): void {
        let event = document.createEvent('HTMLEvents');

        event.initEvent('click', true, true);
        this._input.dispatchEvent(event);
    }

    render() {
        let fileName, fileInputName, hiddenInputName, hiddenValue, fileInputClass;
        
        fileInputName = this.props.name;
        if (_.isString(this.props.value) && this.props.value.length) {
            // preset filename
            fileName = this.props.value;
            fileInputClass = 'fileinput fileinput-exists';
            hiddenValue = this.props.value;
            hiddenInputName = this.props.name;
            fileInputName = '';
        } else if (_.isObject(this.props.value) && this.props.value.name) {
            // user selected file
            fileName = this.props.value.name;
            fileInputClass = 'fileinput fileinput-exists';
            hiddenValue = '';
            hiddenInputName = '';
            fileInputName = this.props.name;
        } else {
            // cleared by user, or no preset
            fileName = '';
            fileInputClass = 'fileinput fileinput-new';
            hiddenValue = '';
            hiddenInputName = this.props.name;
            fileInputName = '';
        }
        return (
            <div className="controls">
                <div className={fileInputClass}>
                    <div className="input-group">
                        <div className="form-control uneditable-input" onClick={this.proxyClick}>
                            <span className="fileinput-filename">{fileName}</span>
                        </div>
                        <span className="input-group-addon btn btn-default btn-file">
                            <span className="fileinput-new">select File</span>
                            <span className="fileinput-exists">
                                <Glyphicon glyph="file" />
                            </span>
                            <input type="file" name={fileInputName} onChange={this.onChange}
                                   ref={(c) => this._input = c} />
                            <input type="hidden" name={hiddenInputName} value={hiddenValue} />
                        </span>
                        <a href="#"
                           className="input-group-addon btn btn-default fileinput-exists"
                           onClick={this.onClear}>
                            <Glyphicon glyph="remove" />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

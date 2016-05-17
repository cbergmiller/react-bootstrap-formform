declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

declare module 'react-bootstrap' {
    import * as React  from 'react';
    export class Form extends React.Component<any, any> {    }
    export class ControlLabel extends React.Component<any, any> {    }
    export class FormGroup extends React.Component<any, any> {    }
    export class FormControl extends React.Component<any, any> {    }
    export class InputGroup extends React.Component<any, any> {}
    export class Checkbox extends React.Component<any, any> {    }
    export class HelpBlock extends React.Component<any, any> {    }
}

declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

declare module 'react-bootstrap' {
    import * as React  from 'react';
    export class InputGroup extends React.Component<any, any> {
        static Addon:any
    }
}

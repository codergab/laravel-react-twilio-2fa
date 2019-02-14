import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {
    Redirect
} from 'react-router-dom';
import AppRouter from './Router';
import checkAuth from './Auth';

export default class Main extends Component {
    componentWillMount() {
        if (!checkAuth()) {
            <Redirect to = "/" / >
        }
    }
    render() {
        return ( 
            <React.Fragment>
            <AppRouter />
            </React.Fragment>
        );
    }
}

if (document.getElementById('app-root')) {
    ReactDOM.render( < Main / > , document.getElementById('app-root'));
}

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './Router';
import Header from './Header';
export default class Main extends Component {
    render() {
        return (
            <React.Fragment>
            <AppRouter />
            
            
            </React.Fragment>
        );
    }
}

if (document.getElementById('app-root')) {
    ReactDOM.render(<Main />, document.getElementById('app-root'));
}

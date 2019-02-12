import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/">LSMS</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/sign-in">Login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/create-account">Register</NavLink>
                </li>
            </ul>
        </div>
    </nav>
);

export default Header;
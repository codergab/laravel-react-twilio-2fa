import React from 'react';
import axios from 'axios';
const checkAuth = () => {
    console.log('Called');
    // Check internet connection
    if(checkInternet() === true) {
        axios.get('/check-login-status')
        .then(response => {
            console.log(response);
        })
        .error(error => console.error(error));
        
    }
    return false;

}

const checkInternet = () => {
    if(!navigator.onLine) {
        return false;
    }
}

export default checkAuth;
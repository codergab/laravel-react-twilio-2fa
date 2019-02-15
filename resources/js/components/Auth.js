import React from 'react';
import * as axios from 'axios';
const checkAuth = () => {
    console.log('Called');
    // Check internet connection
    if(checkInternet() === true) {
        fetch('/check-login-status')
            .then(res => res.json())
            .then(response => {
                console.log(response);
                if (response == "ok") {
                    return true;
                }
            })
            .catch(error => console.error(error));
        
    }
    return false;

}

const checkInternet = () => {
    if(!navigator.onLine) {
        return false;
    }

    return true;
}

export default checkAuth;
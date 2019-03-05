import React from 'react';
import { Redirect } from 'react-router-dom';
import { FormValidation } from "calidation";

import Axios from 'axios';

class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            redirectTo: false,
            isAuthenticated: false,
            response: {},
            errors: {
                error: false,
                text: ''
            }

        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit({ fields, errors, isValid }){
        if (isValid) {
            // This is where we'd handle our submission...
            // `fields` is an object, { field: value }
            const buttonn = document.querySelector('.login');
            buttonn.classList.add('disabled');
            buttonn.innerHTML = "Logging In....";
            const { email, password } = fields;

            $.post('/user/login', { email, password }, (response) => {
                // response = JSON.parse(response);
                if (response.successful == false) {
                    buttonn.classList.remove('disabled');
                    buttonn.innerHTML = "LogIn";
                    this.setState({
                        errors: {
                            error: true,
                            text: response.error
                        }
                    });
                } else {
                   location.href='/authentication/validate/two-factor';
                }
            }).fail(() => {
                buttonn.classList.remove('disabled');
                buttonn.innerHTML = "LogIn";
                this.setState({ errors: { error: true, text: 'Something Went Wrong, Please Try Again'}});
            });


            // Axios.post('/user/login', {
            //     email,password
            // })
            // .then(response => {
            //     if (response.data.successful == true) {
            //         this.props.history.push('/authentication/validate/two-factor');
            //     } else {
            //         buttonn.classList.remove('disabled');
            //         buttonn.innerHTML = "Login";
            //     }
            // })
            // .error(er => console.log(er));
        } else {
            // `errors` is also an object!
            
        }
    };

    componentWillMount() {
        
        let statee;
        $.get('/check-login-status', function (data) {
            console.log(data);
            statee = data;
        });

        this.setState({ response: statee });

        localStorage.setItem('login_status','ok');
    }

    render() {

        if (this.state.response == "ok") {
            return <Redirect to='/authentication/validate/two-factor' />
        }

        const config = {
            email: {
                isRequired: "Email field is required!",
                isEmail: "Please Enter a Valid Email"
            },
            password: {
                isRequired: "Password field required!",
                isMinLength: {
                message: "Minimum of 6 characters only!",
                length: 6
                }
            }
        };
        return (
        <React.Fragment>
            {
                this.state.response == "ok" && <Redirect to='/authentication/validate/two-factor' />
            }
            <div className="row justify-content-center m-5">
                <div className="col-md-4">
                    {
                        this.state.errors.text.length > 0 && 
                        <div className='alert alert-danger'>{this.state.errors.text}</div>
                    }
                    <div className="card">
                        <div className="card-header">Login to your account</div>
                        <div className="card-body">
                        <FormValidation onSubmit={this.onSubmit} config={config}>
                            {({ fields, errors, submitted }) => (
                                <React.Fragment>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input id="email" type="text" name="email" className="form-control" defaultValue={fields.email} />
                                        { submitted && errors.email &&
                                            <div className="error" style={{ color: 'red'}}>{errors.email}</div>
                                        }
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" id="password" name="password" className="form-control" />
                                        {submitted && errors.password &&
                                            <div className="error">{errors.password}</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary login">
                                        Login
                                        </button>
                                    </div>
                                </React.Fragment>
                            )}
                            </FormValidation>
                        </div>
                    </div>
                </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;
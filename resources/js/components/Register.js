import React from 'react';
import { FormValidation } from 'calidation';

class Register extends React.Component {
    constructor() {
        super();

        this.state = {
            userLogged: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(e.target);
    }

    componentDidMount() {
        if(document.body.contains(document.querySelector('#user_session'))) {
            this.setState({ userLogged: true});
        }
    }

    render() {
        const config = {
            email: {
                isRequired: 'Email field is Required',
                isEmail: 'Please Enter the correct Email format'
            },
            
        };
        return (
            <div className="row justify-content-center m-5">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            Create a new account
                            {this.state.userLogged && <p>User is logged in</p>}
                        </div>
                        <div className="card-body">
                            <FormValidation onSubmit={this.onSubmit} config={config}>
                            {({ fields, errors, submitted }) => (
                                <React.Fragment>
                                    <div className="form-group">
                                        <label>Fullname</label>
                                        <input type="text" name="name" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input type="text" name="email" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="text" name="email" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Confirm Password</label>
                                        <input type="text" name="password_confirmation" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary">
                                        Register
                                        </button>
                                    </div>
                                </React.Fragment>
                            )}
                            </FormValidation>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
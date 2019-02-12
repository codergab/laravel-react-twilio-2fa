import React from 'react';
import { FormValidation } from "calidation";

class TwoFactor extends React.Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit({ fields, errors, isValid }){
        if (isValid) {
            // This is where we'd handle our submission...
            // `fields` is an object, { field: value }
            const { email, password } = fields;
        } else {
            // `errors` is also an object!
        }
    };

    componentWillMount() {
        // Send a GET Http Request to check if a user is logged in
        
    }

    render() {
        const config = {
            auth_code: {
                isRequired: "Auth Code is Required",
                isEmail: "Please Enter 6 digits code sent to you"
            }
        };
        return (
            <div className="row justify-content-center m-5">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <h4>Two-Factor Authentication</h4>
                            <p>Your Account is protected with two-factor authentication</p>
                        </div>
                        <div className="card-body">
                        <FormValidation onSubmit={this.onSubmit} config={config}>
                            {({ fields, errors, submitted }) => (
                                <React.Fragment>
                                    <div className="form-group">
                                        <label>6 Digits Code</label>
                                        <input id="auth_code" maxLength='6' type="text" name="auth_code" className="form-control" value={fields.authcode} />
                                        { submitted && errors.auth_code &&
                                            <div className="error" style={{ color: 'red'}}>{errors.auth_code}</div>
                                        }
                                    </div>
                                    
                                    <div className="form-group">
                                        <button className="btn-block btn btn-primary login">
                                        Continue
                                        </button>
                                        <br />
                                        <a href="">Didn't Receive Any code? Resend</a>
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

export default TwoFactor;
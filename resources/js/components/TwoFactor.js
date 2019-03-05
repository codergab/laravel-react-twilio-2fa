import React from 'react';
import { FormValidation } from "calidation";
import { Redirect } from 'react-router-dom';

class TwoFactor extends React.Component {
    constructor() {
        super();
        this.state = {
            response: undefined,
            validCode: undefined,
            error: undefined
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit({ fields, errors, isValid }){
        if (isValid) {
            // This is where we'd handle our submission...
            // `fields` is an object, { field: value }
            const { auth_code } = fields;
            $.post(`/sms/verify`,{ auth_code }, (response) => {
                if(response.successful == true) {
                    this.setState({ validCode: true });
                }else {
                    alert('Code does not match, Please check and try again');
                }
            }).fail((error) => { 
                alert('Error Sending AUTH Code'); 
                location.href="/sign-in";
            });
        
        } else {
            // `errors` is also an object!
        }
    };

    componentWillMount() {
        // Check local storage for status
        $.post('/sms/send', (response) => {
            if(response.successful != true) {
                alert('Error Sending AUTH Code');
                // alert('Error Sending AUTH Code'); 
                location.href="/sign-in";
            }
        }).fail(() => {
            // alert('Cannot send Auth Code')
            alert('Error Sending AUTH Code'); 
                location.href="/sign-in";
        });
    }

    render() {
        const config = {
            auth_code: {
                isRequired: "Auth Code is Required",
                isNumber: 'You need to enter a number',
                isMinLength: {
                    message: 'Auth Code must at least be 7 characters long',
                    length: 7,
                },
            }
        };

        if (localStorage.getItem('login_status') != "ok") {
            return <Redirect to='/sign-in' />
        }

        if(this.state.validCode == true) {
            return <Redirect to='/profile' />
        }

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
                                        <label>Please Enter the 7 Digits Code You Received</label>
                                        <input id="auth_code" maxLength='7' type="text" name="auth_code" className="form-control" value={fields.auth_code} />
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
import React from 'react';
import { Redirect } from 'react-router-dom';
import { FormValidation } from "calidation";
class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            redirectTo: false
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
          setTimeout(() => {
              this.setState({ redirectTo: true });
          },4000);
        //   history.lo
        //   history.pushState('/authentication/validate');
        } else {
          // `errors` is also an object!
          
        }
    };

    render() {
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
        if (this.state.redirectTo === true) {
            return <Redirect to='/authentication/validate/two-factor' />
        }
        return (
            <div className="row justify-content-center m-5">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">Login to your account</div>
                        <div className="card-body">
                        <FormValidation onSubmit={this.onSubmit} config={config}>
                            {({ fields, errors, submitted }) => (
                                <React.Fragment>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input id="email" type="text" name="email" className="form-control" value={fields.email} />
                                        { submitted && errors.email &&
                                            <div className="error" style={{ color: 'red'}}>{errors.email}</div>
                                        }
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="text" id="password" name="password" className="form-control" value={fields.password} />
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
        );
    }
}

export default Login;
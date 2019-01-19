import React, { Component } from 'react';
import { signup, checkEmailAvailability, newSchoolclass } from '../../util/APIUtils';
import {
    NAME_MIN_LENGTH, NAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH,
    SCHOOLNAME_MIN_LENGTH, SCHOOLNAME_MAX_LENGTH,
    SCHOOLCLASSNAME_MIN_LENGTH, SCHOOLCLASSNAME_MAX_LENGTH
} from '../../constants';
import { withRouter } from "react-router-dom";


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            email: {
                value: ''
            },
            password: {
                value: ''
            },
            schoolName: {
                value: ''
            },
            schoolClassName: {
                value: ''
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const signupRequest = {
            school: this.state.schoolName.value,
            className: this.state.schoolClassName.value,
            name: this.state.name.value,
            email: this.state.email.value,
            password: this.state.password.value,
            username: this.state.email.value
        };

        if (this.props.regAsSchool) {
            newSchoolclass(signupRequest)
                .then(response => {
                    console.log("reg success: " + response);
                    this.props.history.push("/login");
                }).catch(error => {
                    console.log(error.message);
                });
        }
        else {
            signup(signupRequest)
                .then(response => {
                    console.log("reg success: " + response);
                    this.props.history.push("/login");
                }).catch(error => {
                    console.log(error.message);
                });
        }
    }

    isFormInvalid() {
        if (this.props.regAsSchool) {
            return !(this.state.name.validateStatus === 'success' &&
                this.state.email.validateStatus === 'success' &&
                this.state.password.validateStatus === 'success' &&
                this.state.schoolName.validateStatus === 'success' &&
                this.state.schoolClassName.validateStatus === 'success'
            );
        }

        return !(this.state.name.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success'
        );

    }

    render() {
        return (
            <div className="container">
                <h1>Registrera</h1>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        {this.props.regAsSchool &&
                            <React.Fragment>
                                <label>Namn på skola </label><small>{this.state.schoolName.errorMsg}</small>
                                <br />
                                <div className="form-group">
                                    <input
                                        name="schoolName"
                                        autoComplete="off"
                                        className="form-control"
                                        placeholder="Skolnamn"
                                        value={this.state.schoolName.value}
                                        onChange={event => this.handleInputChange(event, this.validateSchoolName)}
                                    />
                                </div>
                                <label>Namn på klass </label> <small>{this.state.schoolClassName.errorMsg}</small>
                                <br />
                                <div className="form-group">
                                    <input
                                        name="schoolClassName"
                                        autoComplete="off"
                                        className="form-control"
                                        placeholder="Klassnamn"
                                        value={this.state.schoolClassName.value}
                                        onChange={event => this.handleInputChange(event, this.validateSchoolClassName)}
                                    />
                                </div>
                            </React.Fragment>
                        }
                        <label>För- och efternamn </label><small>{this.state.name.errorMsg}</small>
                        <br />
                        <div className="form-group">
                            <input
                                name="name"
                                autoComplete="off"
                                className="form-control"
                                placeholder="Ditt fulla namn"
                                value={this.state.name.value}
                                onChange={event => this.handleInputChange(event, this.validateName)}
                            />
                        </div>
                        <label>Email </label><small>{this.state.email.errorMsg}</small>
                        <br />
                        <div className="form-group">
                            <input
                                name="email"
                                autoComplete="off"
                                className="form-control"
                                placeholder="Email"
                                value={this.state.email.value}
                                onBlur={this.validateEmailAvailability}
                                onChange={event => this.handleInputChange(event, this.validateEmail)}
                            />
                        </div>
                        <label>Lösenord </label><small>{this.state.password.errorMsg}</small>
                        <br />
                        <div className="form-group">
                            <input
                                name="password"
                                type="password"
                                className="form-control"
                                autoComplete="off"
                                placeholder="Lösenord mellan 6 till 20 tecken"
                                value={this.state.password.value}
                                onChange={event => this.handleInputChange(event, this.validatePassword)}
                            />
                        </div>
                        <button className="btn btn-primary btn-sm" type="submit" value="Sign Up" disabled={this.isFormInvalid()}>Register</button>
                    </form>
                </div>
            </div>
        );
    }

    // Validation Functions

    validateName = (name) => {
        if (name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `(Minst ${NAME_MIN_LENGTH} tecken behövs.)`
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `(Max ${NAME_MAX_LENGTH} tecken tillåtet.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

    validateSchoolName = (schoolName) => {
        if (schoolName.length < SCHOOLNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `(Minst ${SCHOOLNAME_MIN_LENGTH} tecken behövs.)`
            }
        } else if (schoolName.length > SCHOOLNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `(Max ${SCHOOLNAME_MAX_LENGTH} tecken tillåtet.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

    validateSchoolClassName = (schoolClassName) => {
        if (schoolClassName.length < SCHOOLCLASSNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `(Minst ${SCHOOLCLASSNAME_MIN_LENGTH} tecken behövs.)`
            }
        } else if (schoolClassName.length > SCHOOLCLASSNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `(Max ${SCHOOLCLASSNAME_MAX_LENGTH} tecken tillåtet.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

    validateEmail = (email) => {
        if (!email) {
            return {
                validateStatus: 'error',
                errorMsg: '(Får inte vara tom)'
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if (!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMsg: '(Inte en giltig emailadress)'
            }
        }

        if (email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `(Max ${EMAIL_MAX_LENGTH} tecken tillåtet)`
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    }

    validateEmailAvailability() {
        // First check for client side errors in email
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if (emailValidation.validateStatus === 'error') {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });
            return;
        }

        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkEmailAvailability(emailValue)
            .then(response => {
                if (response.available) {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'success',
                            errorMsg: null
                        }
                    });
                } else {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'error',
                            errorMsg: 'Emailen är redan registrerad'
                        }
                    });
                }
            }).catch(error => {
                // Marking validateStatus as success, Form will be recchecked at server
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            });
    }

    validatePassword = (password) => {
        if (password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `(Minst ${PASSWORD_MIN_LENGTH} tecken behövs.)`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `(Max ${PASSWORD_MAX_LENGTH} tecken tillåtet.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

}

export default withRouter(Signup);
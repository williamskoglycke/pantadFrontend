import React, { Component } from "react";
import { login } from "../../util/APIUtils";
import { ACCESS_TOKEN } from "../../constants";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorText: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    login({
      usernameOrEmail: this.state.email,
      password: this.state.password
    })
      .then(response => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        this.setState({ email: "", password: "" });
        this.props.onLogin();
      })
      .catch(error => {
        if (error.status === 401) {
          this.setState({ errorText: "Fel användarnamn eller lösenord" });
          console.log(error);
        } else {
          this.setState({ errorText: "Något gick tokigt, prova igen" });
          console.log(error);
        }
      });
  }

  render() {
    return (
        <div className="container">
          <h1>Logga in</h1>
          <form onSubmit={event => this.handleSubmit(event)}>
            <div className="form-group">
              <input
                type="text"
                name="email"
                className="form-control"
                onChange={this.handleInputChange}
                value={this.state.email}
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={this.handleInputChange}
                value={this.state.password}
                placeholder="Lösenord"
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary" type="submit">Logga in</button>
            </div>
          </form>
        
        {this.state.errorText &&
          <div className="alert alert-danger" role="alert">
            {this.state.errorText}
          </div>
        }
        </div>
    );
  }
}

export default Login;

import { Component } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";

export default class Login extends Component {
  state = {
    usersInsertedEmail: '',
    usersInsertedPassword: '',
    userProfilePath: '',
    errorMessage: '',
    disabledButton: true
  }


  saveEmailAndPSW = (e) => {
    const { usersInsertedDatas, usersInsertedEmail, usersInsertedPassword } = this.state;
    this.setState({ [e.target.name]: e.target.value, ...usersInsertedDatas });
    this.setState({ errorMessage: "" });

    // check inputs' validity
    (usersInsertedPassword !== '' && usersInsertedEmail !== '' && e.target.checkValidity())
      ? this.setState({ disabledButton: false })
      : this.setState({ disabledButton: true });
  }

  handleLogin = () => {
    const { usersInsertedEmail, usersInsertedPassword } = this.state;
    axios.get('http://localhost:3000/Users').then(
      (response) => {
        response.data.map(usersObj => {
          return (usersObj.emailAddress === usersInsertedEmail && usersObj.password === usersInsertedPassword)
            ? this.setState({ "userProfilePath": '/employees-table' })
            : this.setState({ "errorMessage": 'Sorry, your email or password was incorrect. Please try again.' })
        })
      },
      (error) => {
        console.log(error);
      }
    )
  }


  render() {
    const { userProfilePath, errorMessage, disabledButton } = this.state;
    return (
      <div className="modalDefaultContainer login">
        <div className="modalContentWrapper loginContainer">
          <h1>Log in to employee data sheet</h1>
          <div className="formContainer">
            <form action="">
              <label htmlFor="email"> Email </label>
              <input type="email" name="usersInsertedEmail" placeholder="Email" onChange={this.saveEmailAndPSW} />
              <label htmlFor="password"> Password </label>
              <input type="password" name="usersInsertedPassword" placeholder="Password" minLength={5} onChange={this.saveEmailAndPSW} />
              <Link to={`${userProfilePath}`}>
                <button onClick={this.handleLogin} disabled={disabledButton}>Log in</button>
              </Link>
            </form>
            <div className="errorMessage">{errorMessage}</div>
          </div>
          <Link to={"/change-password"}>Forgot password?</Link>
        </div>
      </div>
    );
  }
}

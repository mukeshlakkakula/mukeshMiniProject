import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', isError: false, errorMsg: ''}

  usernameChange = event => {
    this.setState({username: event.target.value})
  }

  passwordChange = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
    this.setState({isError: false})
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, isError: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, isError, errorMsg} = this.state
    console.log(username, password, isError, errorMsg)
    return (
      <div className="loginFullContainer">
        <img
          className="websiteImage01"
          src="https://res.cloudinary.com/dnjp2exao/image/upload/v1701064322/Rectangle_1467_jafjof.svg"
          alt="website login"
        />

        <form className="formContainer" onSubmit={this.onSubmitForm}>
          <img
            className="websiteImage02"
            src="https://res.cloudinary.com/dnjp2exao/image/upload/v1701072705/Ellipse_99_qidt7q.svg"
            alt="website login"
          />
          <img
            className="websiteLogoImage"
            src="https://res.cloudinary.com/dnjp2exao/image/upload/v1701061332/Group_7732_gjdpz2.svg"
            alt="login website logo"
          />
          <div className="labelInputContainer">
            <label htmlFor="Username" className="labelElm">
              Username*
            </label>
            <input
              onChange={this.usernameChange}
              value={username}
              type="text"
              id="Username"
              placeholder="Enter username"
              className="inputElm"
            />
          </div>
          <div className="labelInputContainer">
            <label htmlFor="Password" className="labelElm">
              Password*
            </label>
            <input
              onChange={this.passwordChange}
              value={password}
              type="password"
              id="Password*"
              placeholder="Enter password"
              className="inputElm"
            />
            {isError ? <p className="errorPara">{errorMsg}</p> : ''}
          </div>

          <button type="submit" className="loginBtn">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login

import React, { Component } from "react";
import "./auth.css";
import RegModalRegister from "./RegModalRegister"
import swal from 'sweetalert';

class Auth extends Component {

  onChange(e) {
    // this is actually not necessary!
    const user = Object.assign({}, this.props.authState);
    user[e.target.name] = e.target.value;
    this.props.setAuthState(user, () => {
      console.log("Staaaatee", this.props.authState)
    });
  }

  postAuth(route, user) {
    console.log("postAuth called")
    console.log("user?", user)
    return fetch(`http://127.0.0.1:8000/${route}/`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then((response) => {
      console.log('"auth', response);
      if(response.statusText === "Bad Request"){
        swal("Oops!", "Username/Password do not match. Please try again or register for a new account.", "warning");
        this.props.setAuthState({isAuth : false})
        return Promise.reject(response)
      }
      if(response.statusText === "OK"){
        return response.json();
      }
    })
    .then((responseToken) => {
      localStorage.setItem("token", responseToken.token)
      localStorage.setItem("user", this.props.authState.username)
      return this.props.setAuthState({
        user: this.props.authState.username,
        token: responseToken.token,
        username: "",
        password: "",
        isAuth: true
      })
    })
    .catch((err) => {
      console.log("auth no like you, brah", err);
    })
  }

  login() {
    // create an object with username and password keys and submit it to the Django API
    const user = {
      username: this.props.authState.username,
      password: this.props.authState.password
    }
    this.postAuth("api-token-auth", user)
    .then( () => {
      console.log("user logged in!")
    })
  }

  register() {
    // create an object with all the form values and submit it to the Django API
    const user = Object.assign({}, this.props.authState);
    this.postAuth("register", user)
    .then( () => {
      console.log("new user created")
      this.props.setAuthState({showUserForm: false, isAuth: true})
    })
    .then()
  }

  displayRegister() {
    this.props.setAuthState({
      register: true,
      showUserForm: true
    })
  }

  render() {
    const {
      username,
      first_name,
      last_name,
      email,
      password,
      register
    } = this.props.authState
    return (
      <div>
        {/* {register &&
        <div>
          <input
            type="text"
            placeholder="first name"
            name="first_name"
            value={first_name}
            onChange={e => this.onChange(e)}
          />
          <input
            type="text"
            placeholder="last name"
            name="last_name"
            value={last_name}
            onChange={e => this.onChange(e)}
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={e => this.onChange(e)}
          />
        </div>
        } */}
        <div className="flex-app">
  <div>
    <h1><span>👋</span> Hi there!</h1>
    <h1>Welcome to</h1>
    <h1 className="bold">Trackr</h1>
    <h2>The easiest way to manage<br></br>your job application process</h2>
  </div>
  <div className="flex-log-on">
    <input className="input-log-on" placeholder="Username" type="text" name="username" value={username} onChange={e => this.onChange(e)}></input>
    <input className="input-log-on" placeholder="Password" type="password"
    name="password" value={password} onChange={e => this.onChange(e)}></input>
    
    {register &&
        <div className="flex-log-on">
          <input
            type="text"
            placeholder="first name"
            className="input-log-on"
            name="first_name"
            value={first_name}
            onChange={e => this.onChange(e)}
          />
          <input
            type="text"
            placeholder="last name"
            className="input-log-on"
            name="last_name"
            value={last_name}
            onChange={e => this.onChange(e)}
          />
          <input
            type="email"
            placeholder="email"
            className="input-log-on"
            name="email"
            value={email}
            onChange={e => this.onChange(e)}
          />
        </div>
        }
        
    <button className="btn-log-on" onClick = {() => register ? this.register() : this.login()}>Log On</button>
    <div className="sign-up">
    <p>Not a member? <span className="sign-up-click" onClick={()=> this.displayRegister()}>Sign up now!</span></p>
      {/* <RegModalRegister /> */}
    </div>
  </div>
</div>    
      </div>
    );
  }
}

export default Auth


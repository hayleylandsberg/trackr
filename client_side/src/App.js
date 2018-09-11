import React, { Component } from 'react';
import './App.css';
import Auth from './auth-component'
import Nav from './nav-component'
import ProductForm from './product-component'
import AppDragDropDemo from './drag-drop-component';

class App extends Component {

  state = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    isAuth: false,
    register: false,
    showUserForm: false,
    user: "",
    showSellForm: false
  }

  componentDidMount() {
    let token = localStorage.getItem("token")
    let user = localStorage.getItem("user")
    if (token) {
      console.log("User still logged in", user)
      this.setState({
        isAuth: true,
        user: user
      });
    }
  }

  setAuthState(authObj) {
    this.setState(authObj)
  }


  logOut() {
    console.log("log OUT", localStorage.getItem("token"));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Set everything to false again?
    this.setAuthState({
      isAuth: false,
      user: "",
    })
    console.log(localStorage.getItem("token"));
  }

  render() {
    return (
      <div className="App">
        <Nav isAuth={this.state.isAuth} user={this.state.user} setAuthState={ (obj) => this.setAuthState(obj)} logOut={ () => this.logOut()}/>
        <div className="flex-app">
          <div>
            <h1><span>👋</span> Hi there!</h1>
            <h1>Welcome to</h1>
            <h1 className="bold">Trackr</h1>
            <h2>The easiest way to manage<br></br>your job application process</h2>
          </div>
        <div className="flex-log-on">
          <input className="input-log-on" placeholder="Username"></input>
          <input className="input-log-on" placeholder="Password" type="password"></input>
          <button className="btn-log-on">Log On</button>
        </div>
        </div>

        {this.state.showUserForm ? <Auth authState={this.state} setAuthState={ (obj) => this.setAuthState(obj)} /> : null}

        {this.state.showSellForm ? <ProductForm token={localStorage.getItem("token")}/> : null}

        <AppDragDropDemo />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import './nav.css';

class Nav extends Component {

  displayRegister() {
    this.props.setAuthState({
      register: true,
      showUserForm: true
    })
  }

  displayLogin() {
    this.props.setAuthState({
      register: false,
      showUserForm: true
    })
  }

  logOut() {
    this.props.logOut()
  }

  render() {
    const isAuth = this.props.isAuth
    console.log("isAuth?", isAuth)
    return (
      <nav>
        <h3>TRACKR</h3>
        <ul>
          { isAuth &&
            <span>
              <li>
                {/* <h3>Welcome, {this.props.user}</h3> */}
              </li>
            </span>
          }
          <li>
            <button className="btn-register" onClick = { () => isAuth ? this.logOut() : this.displayLogin()}> Log {isAuth ? "out" : "in"} </button>
          </li>
          { !isAuth &&
          <li>
            <button className="btn-register" onClick={ () => this.displayRegister()}>Register</button>
          </li>
          }
        </ul>
      </nav>
    )
  }

}

export default Nav

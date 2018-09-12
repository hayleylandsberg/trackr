import React, { Component } from "react"
import swal from 'sweetalert'


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  }


export default class Register extends Component {

    state={
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: ""
    }
    handleFieldChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this);

    createUser = function(){
         // Create user in API
         fetch("http://localhost:5001/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                username: this.state.username,
            })
        })

        // Set local storage with newly created user's id and show home view
        .then(newUser => {
            this.props.onRequestClose()
            swal("Congrats!", "Your user has been created, you will now be taken to your dashboard!", "success");
        })
    }.bind(this);

    render() {
        return (
            <form className="form-signup" onSumbit={this.handleLogin}>
            <h1 className="h3 mb-3 font-weight-normal">Register</h1>
            <div className="flexForm">
            <div id="firstFormDiv">
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input onChange={this.handleFieldChange} type="email" id="email" className="form-control" placeholder="Email address" required="" autoFocus="" />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input onChange={this.handleFieldChange} type="password" id="password" className="form-control" placeholder="Password" required="" />
            <label htmlFor="inputFirstName" className="sr-only">First Name</label>
            <input onChange={this.handleFieldChange} type="First Name" id="firstName" className="form-control" placeholder="First Name" required="" autoFocus="" />
            <label htmlFor="inputLastName" className="sr-only">Last Name</label>
            <input onChange={this.handleFieldChange} type="Last Name" id="lastName" className="form-control" placeholder="Last Name" required="" autoFocus="" />
            <label htmlFor="inputAddress" className="sr-only">Username</label>
            <input onChange={this.handleFieldChange} type="Username" id="username" className="form-control" placeholder="Username" required="" autoFocus="" />
            </div>
            </div>
            <button className="btn btn-lg btn-gray btn-block" type="button" onClick={this.createUser}>Sign up</button>
            </form>
        )
    }
}

import React, { Component } from 'react';
import './App.css';
import Auth from './auth-component'
import Nav from './nav-component'
import Dashboard from './drag-drop-component';

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
    showSellForm: false,
    userJobs: [],
    jobTasks: "",
    jobNotes: "",
    catChange: ''
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
    this.getUserJobs();
    // this.getJobNotes();
    // this.getJobTasks();
  }

  setAuthState(authObj) {
    this.setState(authObj)
  }

  getUserJobs() {
  let token = localStorage.getItem("token")
  fetch(`http://127.0.0.1:8000/jobs/`, {
    method: 'GET',
    headers: {
      "Authorization": `Token ${token}`
    }
  })
    .then((response) => {
      return response.json();
    })
    .then((jobs) => {
      console.log('userJobs', jobs);
      this.setState({ userJobs: jobs }, () => {
        console.log("jobs", this.state.userJobs)
      })
    })
    .catch((err) => {
      console.log("fetch no like you, brah", err);
    })
  }


  deleteJob(token) {
    fetch(`http://127.0.0.1:8000/jobs/`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${token}`
        },
        body: JSON.stringify({
            
        })
    })
    .then(() => {
        this.getUserJobs()
    })
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


  showView = function (e, data) {
    let view = null

    // Click event triggered switching view
    if (e.hasOwnProperty("target")) {
      view = e.target.id.split("__")[1]

      // View switch manually triggered by passing in string
    } else {
      view = e
      console.log("view changed!")
    }
    // if (view === "profile") {
    //   this.setState({ currentView: "profile"})

    // }
    // Update state to correct view will be rendered
    this.setState({
      currentView: view,
    })

  }.bind(this)

  setJobState(userJobs) {
    this.setState({
      ...this.state,
      userJobs
    });
  }


  View = () => {
    if (this.state.isAuth === false) {
      return this.state.showUserForm ? <Auth authState={this.state} setAuthState={(obj) => this.setAuthState(obj)} /> : null
    }
    else if (this.state.isAuth === true) {
      switch (this.state.currentView) {
        case 'home':
          return <Dashboard user={this.state.user} userJobs={this.state.userJobs} setJobState={(jobs)=> this.setJobState(jobs)} catChange={this.state.catChange}  />
        default:
          return <Dashboard user={this.state.user} userJobs={this.state.userJobs} setJobState={(jobs)=> this.setJobState(jobs)} catChange={this.state.catChange} />

      }
    }
  }


  
  render() {
    return (
      <div className="App">
        <Nav isAuth={this.state.isAuth} user={this.state.user} setAuthState={(obj) => this.setAuthState(obj)} displaySell={() => this.displaySell()} logOut={() => this.logOut()} viewHandler={this.showView} />
        {this.View()}
      </div>
    );
  }
}

export default App;

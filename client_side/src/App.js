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

  View = () => {
    if (this.state.isAuth === false) {
      return this.state.showUserForm ? <Auth authState={this.state} setAuthState={(obj) => this.setAuthState(obj)} /> : null
    }
    else if (this.state.isAuth === true) {
      switch (this.state.currentView) {
        case 'home':
          return <Dashboard user={this.state.user}/>
        // case 'profile':
        //   return <Profile resource={this.state.profileData} />
        // case 'addPet':
        //   return <AddPetForm viewHandler={this.showView} />
        // case 'addAllergy':
        //   return <AllergiesForm viewHandler={this.showView} userPets={this.state.userPets} />
        // // addCommand
        // case 'addCommand':
        //   return <CommandsForm viewHandler={this.showView} userPets={this.state.userPets} />
        default:
          return <Dashboard user={this.state.user}/>

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

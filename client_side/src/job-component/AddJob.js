import React, { Component } from "react"
import swal from 'sweetalert'
import './job.css'
import coral from '../images/coral.png'
import orange from '../images/orange.png'
import yellow from '../images/yellow.png'
import green from '../images/green.png'
import mint from '../images/mint.png'
import aqua from '../images/aqua.png'
import blue from '../images/blue.png'
import pink from '../images/pink.png'
import purple from '../images/purple.png'
import gray from '../images/gray.png'

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
  
export default class AddJob extends Component {

    state={
        jobs: [],
        company: "",
        title: "",
        location: "",
        image: "",
        salary: "",
        url: "",
        description: "",
        deadline_date: "",
        applied_date: "",
        interview_date1: "",
        interview_date2: "",
        offer_date: "",
        card_color: "",
        category: "",
        user_id: ""
    }

    activeUser = localStorage.getItem("user")

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
            this.props.setJobState(jobs, () => {
              console.log("jobs", this.props.userJobs)
            })
          })
          .catch((err) => {
            console.log("fetch no like you, brah", err);
          })
        }

    // handleChangeImage(evt) {
    //     console.log("Uploading");
    //     let self = this
    //     const reader = new FileReader();
    //     let file = evt.target.files[0];
    
    //     reader.onload = function (upload) {
    //       self.setState({
    //         image: upload.target.result
    //       });
    //       console.log(self.state.image);
    //     };
    //     reader.readAsDataURL(file);
    //     console.log("Uploaded");
    //   }

    handleFieldChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this);

    displaySuccess(data) {
        console.log("Job Added Bitchesssss!", data)
    }

    changeColor(color){
        this.setState({
            card_color: color
       })
       console.log("Change color")
    }
    

    createJob = function(){
         // Create user in API
         let token = localStorage.getItem("token")
         fetch(`http://127.0.0.1:8000/create_jobs/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify({
                company: this.state.company,
                title: this.state.title,
                location: this.state.location,
                salary: this.state.salary,
                url: this.state.url,
                description: this.state.description,
                card_color: this.state.card_color
            })
        })

        .then(response => {
            return response.json()
        })

        .then(response => {
            return this.displaySuccess(response)
        })
        // Set local storage with newly created user's id and show home view
        .then(newJob => {
            this.props.onRequestClose()
            swal("Success!", "Your job has been added to your dashboard.", "success")
            this.getUserJobs()
        })
        .catch((err) => {
            return console.log("You SUCK!!!", err)
        })
        
    }.bind(this);

    render() {
        return (
            <form className="form-signup" onSumbit={this.handleLogin}>
            <h2 className="h3 mb-3 font-weight-normal">Job Entry</h2>
            <div className="flexForm-Job">
            <label htmlFor="inputCompany" className="sr-only">Company</label>
            <input onChange={this.handleFieldChange} type="name" id="company" className="form-control" placeholder="Company" required="" autoFocus="" />
            <label htmlFor="inputTitle" className="sr-only">Job Title</label>
            <input onChange={this.handleFieldChange} type="title" id="title" className="form-control" placeholder="Job Title" required="" />
            <label htmlFor="inputLocation" className="sr-only">Location</label>
            <input onChange={this.handleFieldChange} type="location" id="location" className="form-control" placeholder="Location" required="" autoFocus="" />
            <label htmlFor="inputSalary" className="sr-only">Salary</label>
            <input onChange={this.handleFieldChange} type="salary" id="salary" className="form-control" placeholder="Salary" required="" autoFocus="" />
            <label htmlFor="inputUrl" className="sr-only">Job Post URL</label>
            <input onChange={this.handleFieldChange} type="url" id="url" className="form-control" placeholder="Job Post URL" required="" autoFocus="" />
            <label htmlFor="inputdescription" className="sr-only">Description</label>
            <input onChange={this.handleFieldChange} type="description" id="description" className="form-control" placeholder="Description" required="" autoFocus="" />
            {/* <label htmlFor="inputdescription" className="sr-only">Company Logo</label>
            <input
                  ref="file"
                  type="file"
                  placeholder="Image"
                  name="image"
                  id="file"
                  onChange={e => this.handleChangeImage(e)}
                  encType="multipart/form-data"
                /> */}
            </div>

            <div>
            <label htmlFor="inputdescription" className="sr-only">Select Color</label>
            <div className="flex-color">
                <img src={coral} alt="coral" onClick={()=> this.changeColor("#ED5565")}></img>
                <img src={orange} alt="orange" onClick={()=> this.changeColor("#FC6E51")}></img>
                <img src={yellow} alt="yellow" onClick={()=> this.changeColor("#FFCE00")}></img>
                <img src={green} alt="green" onClick={()=> this.changeColor("#A0D468")}></img>
                <img src={mint} alt="mint" onClick={()=> this.changeColor("#48CFAD")}></img>
                <img src={aqua} alt="aqua" onClick={()=> this.changeColor("#4FC1E9")}></img>
                <img src={blue} alt="blue" onClick={()=> this.changeColor("#5D9CEC")}></img>
                <img src={purple} alt="purple" onClick={()=> this.changeColor("#AC92EC")}></img>
                <img src={pink} alt="pink" onClick={()=> this.changeColor("#EC87C0")}></img>
                <img src={gray} alt="gray" onClick={()=> this.changeColor("#656D78")}></img>
            </div>
            </div>

            <div className="btn-center-flex">
            <button className="new-job-btn" type="button" onClick={this.createJob}>Add Job</button>
            </div>
            </form>
        )
    }
}

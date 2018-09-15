import React, { Component } from "react"
import swal from 'sweetalert'
import './job.css'

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

    activeUser = localStorage.getItem("yakId")

    handleChangeImage(evt) {
        console.log("Uploading");
        let self = this
        const reader = new FileReader();
        let file = evt.target.files[0];
    
        reader.onload = function (upload) {
          self.setState({
            image: upload.target.result
          });
          console.log(self.state.image);
        };
        reader.readAsDataURL(file);
        console.log("Uploaded");
      }

    handleFieldChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this);

    createJob = function(){
         // Create user in API
         fetch(`http://127.0.0.1:8000/create_job/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                company: this.state.company,
                title: this.state.title,
                location: this.state.location,
                salary: this.state.salary,
                url: this.state.url,
                description: this.state.description,
                image: this.state.image
            })
        })

        // Set local storage with newly created user's id and show home view
        .then(newUser => {
            this.props.onRequestClose()
            swal("Success!", "Your job has been added to your dashboard.", "success")
            this.props.displayAllJobs()
        })
        
    }.bind(this);

    render() {
        return (
            <form className="form-signup" onSumbit={this.handleLogin}>
            <h2 className="h3 mb-3 font-weight-normal">Job Entry</h2>
            <div className="flexForm-Job">
            <label htmlFor="inputCompany" className="sr-only">Company</label>
            <input onChange={this.handleFieldChange} type="name" id="name" className="form-control" placeholder="Company" required="" autoFocus="" />
            <label htmlFor="inputTitle" className="sr-only">Job Title</label>
            <input onChange={this.handleFieldChange} type="title" id="title" className="form-control" placeholder="Job Title" required="" />
            <label htmlFor="inputLocation" className="sr-only">Location</label>
            <input onChange={this.handleFieldChange} type="location" id="location" className="form-control" placeholder="Location" required="" autoFocus="" />
            <label htmlFor="inputSalary" className="sr-only">Salary</label>
            <input onChange={this.handleFieldChange} type="salary" id="salary" className="form-control" placeholder="Salary" required="" autoFocus="" />
            <label htmlFor="inputUrl" className="sr-only">Job Post URL</label>
            <input onChange={this.handleFieldChange} type="jobPostUrl" id="url" className="form-control" placeholder="Job Post URL" required="" autoFocus="" />
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
            <label htmlFor="inputdescription" className="sr-only">Selection Color</label>
            <div className="flex-color">
                <button className="color-btn"><img src={require('../images/coral.png')}></img></button>
                <button className="color-btn"><img src={require('../images/orange.png')}></img></button>
                <button className="color-btn"><img src={require('../images/yellow.png')}></img></button>
                <button className="color-btn"><img src={require('../images/green.png')}></img></button>
                <button className="color-btn"><img src={require('../images/mint.png')}></img></button>
                <button className="color-btn"><img src={require('../images/aqua.png')}></img></button>
                <button className="color-btn"><img src={require('../images/blue.png')}></img></button>
                <button className="color-btn"><img src={require('../images/purple.png')}></img></button>
                <button className="color-btn"><img src={require('../images/pink.png')}></img></button>
                <button className="color-btn"><img src={require('../images/gray.png')}></img></button>
            </div>
            </div>

            <div className="btn-center-flex">
            <button className="new-job-btn" type="button" onClick={this.createJob}>Add Job</button>
            </div>
            </form>
        )
    }
}

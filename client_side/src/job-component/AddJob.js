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

    handleFieldChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this);

    createDoctor = function(){
         // Create user in API
         fetch(`http://localhost:5001/doctors?&userId=${this.props.activeUser}&_sort=id&_order=desc&_expand=user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.name,
                specialty: this.state.specialty,
                facility: this.state.facility,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                userId: parseInt(this.activeUser)
            })
        })

        // Set local storage with newly created user's id and show home view
        .then(newUser => {
            this.props.onRequestClose()
            swal("Success!", "Your doctor has been added to your Doctors List.", "success")
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
            <input onChange={this.handleFieldChange} type="title" id="specialty" className="form-control" placeholder="Job Title" required="" />
            <label htmlFor="inputLocation" className="sr-only">Location</label>
            <input onChange={this.handleFieldChange} type="location" id="location" className="form-control" placeholder="Location" required="" autoFocus="" />
            <label htmlFor="inputSalary" className="sr-only">Salary</label>
            <input onChange={this.handleFieldChange} type="salary" id="salary" className="form-control" placeholder="Salary" required="" autoFocus="" />
            <label htmlFor="inputUrl" className="sr-only">Job Post URL</label>
            <input onChange={this.handleFieldChange} type="jobPostUrl" id="jobPostUrl" className="form-control" placeholder="Job Post URL" required="" autoFocus="" />
            <label htmlFor="inputdescription" className="sr-only">Description</label>
            <input onChange={this.handleFieldChange} type="description" id="description" className="form-control" placeholder="Description" required="" autoFocus="" />
            </div>
            <div className="btn-center-flex">
            <button className="new-job-btn" type="button" onClick={this.createJob}>Add Job</button>
            </div>
            </form>
        )
    }
}

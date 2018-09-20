import React, { Component } from "react"
import swal from 'sweetalert'
import './dragdrop.css'

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
  
export default class ShowDetails extends Component {

    state={
        jobs: [],
        company: "",
        title: "",
        location: "",
        image: "",
        salary: "",
        link: "",
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
            this.setState({ userJobs: jobs }, () => {
              console.log("jobs", this.props.userJobs)
            })
          })
          .catch((err) => {
            console.log("fetch no like you, brah", err);
          })
        }

    handleFieldChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this);

    createJob = function(){
         // Create user in API
         let token = localStorage.getItem("token")
         fetch(`http://127.0.0.1:8000/create_job/`, {
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
                link: this.state.link,
                description: this.state.description
            })
        })

            
        // Set local storage with newly created user's id and show home view
        .then(newJob => {
            this.props.onRequestClose()
            swal("Success!", "Your job has been added to your dashboard.", "success")
            this.getUserJobs()
        })
        
    }.bind(this);

    render() {
        return (
            <form className="form-signup" onSumbit={this.handleLogin}>
            <div className="flex-close-modal">
                <h2 className="h3 mb-3 font-weight-normal">Job Details</h2>
                <img src={require("../images/letter-x-black.png")} onClick={()=> this.props.onRequestClose()} width="10px" height="10px"></img>
            </div>
            <div className="flexForm-details">
                <div className="detail-paragraph-1">
                    <div className="flex-detail-item">
                        <label htmlFor="inputCompany" className="sr-only">Company</label>
                        <p>{this.props.job.company}</p>
                    </div>
                    <div className="flex-detail-item">
                        <label htmlFor="inputTitle" className="sr-only">Job Title</label>
                        <p>{this.props.job.title}</p>
                    </div>
                    <div className="flex-detail-item">
                        <label htmlFor="inputLocation" className="sr-only">Location</label>
                        <p>{this.props.job.location}</p>
                    </div>
                    <div className="flex-detail-item">
                        <label htmlFor="inputSalary" className="sr-only">Salary</label>
                        <p>${this.props.job.salary}</p>
                    </div>
                    <div className="flex-detail-item">
                        <label htmlFor="inputLink" className="sr-only">Job Post Link</label>
                        <p><a href={this.props.job.link}>See job posting</a></p>
                    </div>
                    <div className="flex-detail-item">
                        <label htmlFor="inputdescription" className="sr-only">Description</label>
                        <p>{this.props.job.description}</p>
                    </div>
                </div>
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
                <div className="detail-paragraph-2">
                    <div className="flex-detail-item">
                        <label htmlFor="inputUrl" className="sr-only">Deadline Date</label>
                        <p>{this.props.job.deadline_date}</p>
                    </div>
                    <div className="flex-detail-item">
                        <label htmlFor="inputUrl" className="sr-only">Applied Date</label>
                        <p>{this.props.job.applied_date}</p>
                    </div>
                    <div className="flex-detail-item">
                        <label htmlFor="inputUrl" className="sr-only">Interview Date 1</label>
                        <p>{this.props.job.interview_date1}</p>
                    </div>
                    <div className="flex-detail-item">
                        <label htmlFor="inputUrl" className="sr-only">Interview Date 2</label>
                        <p>{this.props.job.interview_date2}</p>
                    </div>
                    <div className="flex-detail-item">
                        <label htmlFor="inputUrl" className="sr-only">Offer Date</label>
                        <p>{this.props.job.offer_date}</p>
                    </div>
                </div>
            </div>
            </form>
        )
    }
}

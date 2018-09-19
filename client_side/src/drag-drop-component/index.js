import React, { Component } from 'react';
import './dragdrop.css';
import RegModal from "../job-component/RegModalJob"
import RegModalDetails from "./RegModalDetails"

export default class Dashboard extends Component {
    // state = {
    //     jobs: [
    //         {name:"Google", title:"Software Engineer", location:"San Francisco, CA", category:"wishlist", bgcolor: "#ED5565"},
    //         {name:"Shipt", title:"UX Designer", location:"San Francisco, CA", category:"wishlist", bgcolor:"#FFCE54"},
    //         {name:"Airbnb", title:"Product Designer", location:"San Francisco, CA", category:"applied", bgcolor:"#48CFAD"},
    //         {name:"TeacherFindr", title:"UX Designer", location:"San Francisco, CA", category:"rejected", bgcolor:"#5D9CEC"},
    //         {name:"Facebook", title:"UX Designer", location:"San Francisco, CA", category:"offer", bgcolor:"#EC87C0"},
    //         {name:"Twitter", title:"UX Designer", location:"San Francisco, CA", category:"rejected", bgcolor:"#FC6E51"},
    //         {name:"Instacart", title:"UI Engineer", location:"San Francisco, CA", category:"offer", bgcolor:"#A0D468"},
    //         {name:"Nextdoor", title:"UX/UI Designer", location:"San Francisco, CA", category:"phone", bgcolor:"#AC92EC"},
    //         {name:"Apple", title:"Product Designer", location:"San Francisco, CA", category:"onsite", bgcolor:"#4FC1E9"}
    //       ]
    // }

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

    displaySuccess(data) {
        console.log("Category changed!", data)
    }

    updateCat = function(job){
        // Create user in API
        let token = localStorage.getItem("token")
        fetch(`${job.url}`, {
           method: "PATCH",
           headers: {
               "Content-Type": "application/json",
               "Authorization": `Token ${token}`
           },
           body: JSON.stringify({
               category: job.category
           })
       })
       .then((response) => {
           return response.json()
       })
       .then((response) => {
           this.getUserJobs()
           this.displaySuccess(response)
       })
       // Set local storage with newly created user's id and show home view
    //    .then(e => {
    //        this.props.getUserJobs();
    //     })
    }.bind(this);

    onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
        console.log("Hi there, I'm attempting to drop")
       let id = ev.dataTransfer.getData("id");
       let jobs = this.props.userJobs.filter((job) => {
        console.log("What is id and job?", id, job)
           if (job.company == id) {
               job.category = cat;
               console.log("What cat ondrop", job.category)
               this.updateCat(job);
           }
           return jobs
       });

    //    this.props.setJobState(
    //        jobs
    //    );
    }


    render() {
        let jobs = {
            wishlist: [],
            applied: [],
            phone: [],
            onsite: [],
            offer: [],
            rejected: []
        }
        console.log("drag and drop jobs", this.props.userJobs)
        this.props.userJobs.forEach ((t) => {
            console.log("this is the id", t)
            jobs[t.category].push(
                <div key={t.company} 
                    onDragStart = {(e) => this.onDragStart(e, t.company)}
                    draggable
                    className="draggable"
                    style = {{backgroundColor: t.card_color}}
                >
                    <div>
                        <img src={require("../images/trackr-circle-logo.png")} alt="tackr-logo"></img>
                    </div>
                    <div className="flex-card-text">
                        <img className="delete-btn" onClick={()=> this.props.deleteJob(t.pk)} src={require("../images/letter-x.png")}></img>
                        <p className="name">{t.company}</p>
                        <p className="title">{t.title}</p>
                        <p className="location">{t.location}</p>
                        <RegModalDetails job={t}/>
                    </div>
                </div>
            );
        });

        return (
          <div>
            <div className="flex-banner">
              <h2>Welcome, {this.props.user}</h2>
              {/* <button className="add-job-btn">New Job Entry</button> */}
              <RegModal setJobState={(job)=>{this.props.setJobState(job)}}/>
            </div>
            <div className="container-drag">
                {/* <h2 className="header">DRAG & DROP DEMO</h2> */}
                <div className="wishlist"
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "wishlist")}}>
                    <div className="job-header">WISH LIST
                    <img src={require("../images/wishlist.png")} alt="wishlist"></img>
                    </div>
                    {jobs.wishlist}
                </div>
                <div className="droppable" onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "applied")}>
                     <div className="job-header">APPLIED
                     <img src={require("../images/applied.png")} alt="applied"></img>
                     </div>
                    {jobs.applied}
                </div>
                <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "phone")}>
                     <div className="job-header">PHONE
                     <img src={require("../images/call.png")} alt="phone"></img>
                     </div>
                     {jobs.phone}
                </div>
                <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "onsite")}>
                     <div className="job-header">ONSITE
                     <img src={require("../images/skyline.png")} alt="onsite"></img>
                     </div>
                     {jobs.onsite}
                </div>
                <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "offer")}>
                     <div className="job-header">OFFER
                     <img src={require("../images/handshake.png")} alt="offer"></img>
                     </div>
                     {jobs.offer}
                </div>
                <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "rejected")}>
                     <div className="job-header">REJECTED
                     <img src={require("../images/no-stopping.png")} alt="rejected"></img>
                     </div>
                     {jobs.rejected}
                </div>
            </div>
          </div>
        );
    }
}
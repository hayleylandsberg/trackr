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

    // updateCat = function(catId){
    //     // Create user in API
    //     fetch(`http://127.0.0.1:8000/jobs/${catId}`, {
    //        method: "PATCH",
    //        headers: {
    //            "Content-Type": "application/json"
    //        },
    //        body: JSON.stringify({
    //            category: this.props.catChange
    //        })
    //    })
    //    // Set local storage with newly created user's id and show home view
    // //    .then(e => {
    // //        this.props.getUserJobs();
    // //     })
    // }.bind(this);

    onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
       let id = ev.dataTransfer.getData("id");
       
       let jobs = this.props.userJobs.filter((job) => {
           if (job.name == id) {
               job.category = cat;
           }
           return job;
       });

       this.props.setJobState(
           jobs
       );
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

        this.props.userJobs.forEach ((t) => {
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
                        <img className="delete-btn" onClick={()=> this.props.deleteJob(this.props.userJobs.id)} src={require("../images/letter-x.png")}></img>
                        <p className="name">{t.company}</p>
                        <p className="title">{t.title}</p>
                        <p className="location">{t.location}</p>
                        <RegModalDetails />
                    </div>
                </div>
            );
        });

        return (
          <div>
            <div className="flex-banner">
              <h2>Welcome, {this.props.user}</h2>
              {/* <button className="add-job-btn">New Job Entry</button> */}
              <RegModal />
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
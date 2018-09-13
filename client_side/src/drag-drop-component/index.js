import React, { Component } from 'react';
import './dragdrop.css';
import RegModal from "../job-component/RegModalJob"

export default class Dashboard extends Component {
    state = {
        jobs: [
            {name:"Google", title:"Software Engineer", location:"San Francisco, CA", category:"wishlist", bgcolor: "#ED5565"},
            {name:"Shipt", title:"UX Designer", location:"San Francisco, CA", category:"wishlist", bgcolor:"#FFCE54"},
            {name:"Airbnb", title:"Product Designer", location:"San Francisco, CA", category:"applied", bgcolor:"#48CFAD"},
            {name:"TeacherFindr", title:"UX Designer", location:"San Francisco, CA", category:"rejected", bgcolor:"#5D9CEC"},
            {name:"Facebook", title:"UX Designer", location:"San Francisco, CA", category:"offer", bgcolor:"#EC87C0"},
            {name:"Twitter", title:"UX Designer", location:"San Francisco, CA", category:"rejected", bgcolor:"#FC6E51"},
            {name:"Instacart", title:"UI Engineer", location:"San Francisco, CA", category:"offer", bgcolor:"#A0D468"},
            {name:"Nextdoor", title:"UX/UI Designer", location:"San Francisco, CA", category:"phone", bgcolor:"#AC92EC"},
            {name:"Apple", title:"Product Designer", location:"San Francisco, CA", category:"onsite", bgcolor:"#4FC1E9"}
          ]
    }

    onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
       let id = ev.dataTransfer.getData("id");
       
       let jobs = this.state.jobs.filter((job) => {
           if (job.name == id) {
               job.category = cat;
           }
           return job;
       });

       this.setState({
           ...this.state,
           jobs
       });
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

        this.state.jobs.forEach ((t) => {
            jobs[t.category].push(
                <div key={t.name} 
                    onDragStart = {(e) => this.onDragStart(e, t.name)}
                    draggable
                    className="draggable"
                    style = {{backgroundColor: t.bgcolor}}
                >
                    <p className="name">{t.name}</p>
                    <p className="title">{t.title}</p>
                    <p className="location">{t.location}</p>
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
                    <div className="job-header">WISH LIST</div>
                    {jobs.wishlist}
                </div>
                <div className="droppable" onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "applied")}>
                     <div className="job-header">APPLIED</div>
                    {jobs.applied}
                </div>
                <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "phone")}>
                     <div className="job-header">PHONE</div>
                     {jobs.phone}
                </div>
                <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "onsite")}>
                     <div className="job-header">ONSITE</div>
                     {jobs.onsite}
                </div>
                <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "offer")}>
                     <div className="job-header">OFFER</div>
                     {jobs.offer}
                </div>
                <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "rejected")}>
                     <div className="job-header">REJECTED</div>
                     {jobs.rejected}
                </div>
            </div>
          </div>
        );
    }
}
import React, { Component } from 'react';
import './dragdrop.css';
import RegModal from "../job-component/RegModalJob"

export default class Dashboard extends Component {
    state = {
        tasks: [
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
       
       let tasks = this.state.tasks.filter((task) => {
           if (task.name == id) {
               task.category = cat;
           }
           return task;
       });

       this.setState({
           ...this.state,
           tasks
       });
    }

    render() {
        let tasks = {
            wishlist: [],
            applied: [],
            phone: [],
            onsite: [],
            offer: [],
            rejected: []
        }

        this.state.tasks.forEach ((t) => {
            tasks[t.category].push(
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
                    <div className="task-header">WISH LIST</div>
                    {tasks.wishlist}
                </div>
                <div className="droppable" onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "applied")}>
                     <div className="task-header">APPLIED</div>
                    {tasks.applied}
                </div>
                <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "phone")}>
                     <div className="task-header">PHONE</div>
                     {tasks.phone}
                </div>
                <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "onsite")}>
                     <div className="task-header">ONSITE</div>
                     {tasks.onsite}
                </div>
                <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "offer")}>
                     <div className="task-header">OFFER</div>
                     {tasks.offer}
                </div>
                <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "rejected")}>
                     <div className="task-header">REJECTED</div>
                     {tasks.rejected}
                </div>
            </div>
          </div>
        );
    }
}
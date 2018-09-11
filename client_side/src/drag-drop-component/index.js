import React, { Component } from 'react';
import './dragdrop.css';

export default class AppDragDropDemo extends Component {
    state = {
        tasks: [
            {name:"Google, Software Engineer",category:"wishlist", bgcolor: "yellow"},
            {name:"Shipt, UX Designer", category:"wishlist", bgcolor:"pink"},
            {name:"Airbnb, UI Engineer", category:"applied", bgcolor:"skyblue"},
            {name:"TeacherFindr, UX Designer", category:"rejected", bgcolor:"seagreen"}
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
                    {t.name}
                </div>
            );
        });

        return (
            <div className="container-drag">
                {/* <h2 className="header">DRAG & DROP DEMO</h2> */}
                <div className="wishlist"
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "wishlist")}}>
                    <span className="task-header">WISH LIST</span>
                    {tasks.wishlist}
                </div>
                <div className="droppable" onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "applied")}>
                     <span className="task-header">APPLIED</span>
                    {tasks.applied}
                </div>
                <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "phone")}>
                     <span className="task-header">PHONE</span>
                     {tasks.phone}
                </div>
                <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "onsite")}>
                     <span className="task-header">ONSITE</span>
                     {tasks.onsite}
                </div>
                <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "offer")}>
                     <span className="task-header">OFFER</span>
                     {tasks.offer}
                </div>
                <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "rejected")}>
                     <span className="task-header">REJECTED</span>
                     {tasks.rejected}
                </div>
            </div>
        );
    }
}
import React from 'react';
import Modal from 'react-modal';
import AddJob from "./AddJob";
import '../drag-drop-component/dragdrop.css';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)


class RegModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div>
        {/* <button className="btn btn-lg btn-gray btn-block" id="mainSignUp" type="button"  onClick={this.openModal}>Add a Doctor</button> */}
        <button className="add-job-btn" onClick={this.openModal}>New Job Entry</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <AddJob activeUser = {this.props.activeUser} displayAllJobs={this.props.displayAllJobs} onRequestClose={this.closeModal} setJobState={(job)=>{this.props.setJobState(job)}}/>
        </Modal>
      </div>
    );
  }
}

export default RegModal
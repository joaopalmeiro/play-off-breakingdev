import React, { Component } from 'react';
import Modal from './Modal';

class ModalLauncher extends Component {
  
  // Init of the component before it is mounted.
  // Sets the modal visibility (showModal) to false.
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }
  
  // Handle the visibility of the modal.
  // If `state.showModal` is false, sets it to true,
  // if is true, sets it to false.
  handleToggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    const { showModal } = this.state;

    return (
      <div>
        {/* Dummy */}
        <button
          type="button"
          className="modalButton"
          onClick={() => this.handleToggleModal()}>
          More Info
        </button>

        {showModal &&
          <Modal onCloseRequest={() => this.handleToggleModal()}>
            <p>Lorem ipsum</p>
          </Modal>}
      </div>
    );
  }
}

export default ModalLauncher;

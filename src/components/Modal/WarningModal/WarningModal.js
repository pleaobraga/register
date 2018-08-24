import React, { Component } from 'react'
import Modal from 'react-modal'
import './style/index.scss'

const customStyles = {
  content : {
    top                   : '30%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    borderRadius          : '14px'
  }
};

/**
 *
 *
 * @class WarningModal
 * @extends {Component}
 */
class WarningModal extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    if(this.props.hasOwnProperty('onCloseModal'))
      this.props.onCloseModal()

    this.setState({modalIsOpen: false});
  }

  componentWillReceiveProps(nexProps) {
    if(nexProps.openModal) {
      this.setState({modalIsOpen: true})
    }
  }

  render() {

    let {
      titleClass,
      title,
      textContent
    } = this.props

    return (
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 className={`title ${titleClass}`} >{title}</h2>
          <p className="text-modal" >
            {textContent}
          </p>
          <button 
            className="close-modal-button" 
            onClick={this.closeModal}
          >
            Fechar
          </button>
        </Modal>
    );
  }
}

export default WarningModal
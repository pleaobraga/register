import React, { Component } from 'react'
import { connect } from 'react-redux'
import WarningModal from '../WarningModal/WarningModal'

class ErrorModal extends Component {

    constructor() {
        super()
        this.state = {
            openModal: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.error.hasError) 
            this.setState({ openModal: true })
    }

    render() {
        return(
            <WarningModal 
                title="Ocorreu um erro"
                textContent={this.props.error.message}
                openModal={this.state.openModal}
                titleClass="red-title" 
            />
        )
    }


}


const mapStateToProps = (state) => ({
    error: state.error
})
  


export default connect(mapStateToProps)(ErrorModal);
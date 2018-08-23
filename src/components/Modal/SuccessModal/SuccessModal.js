import React, { Component } from 'react'
import { connect } from 'react-redux'
import WarningModal from '../WarningModal/WarningModal'

class SuccessModal extends Component {

    constructor() {
        super()
        this.state = {
            openModal: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.saveRegister) 
            this.setState({ openModal: true })
    }

    render() {
        return(
            <WarningModal 
                title="Sucesso"
                textContent={"Seu cadastro foi efetuado com sucesso"}
                openModal={this.state.openModal}
                titleClass="green-title" 
            />
        )
    }


}


const mapStateToProps = (state) => ({
    saveRegister: state.saveRegister,
})
  


export default connect(mapStateToProps)(SuccessModal);
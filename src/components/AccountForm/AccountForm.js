import React, { Component } from 'react'
import InputGroup from '../InputGroup/InputGroup'
import PasswordStrength from '../PasswordStrength/PasswordStrength'
import _ from 'lodash'
import './style/index.scss'
import * as validationFunctions from './ValidationsForm'
import { connect } from 'react-redux'
import { 
    postRegisterData, 
    checkEmailRegistered, 
} from '../../actions/index'


class AccountForm extends Component {

    constructor() {
        super()
        this.state = {
            input: {
                name: {
                    value:'',
                    errorMessage:'',
                    name: 'name'
                },
                email: {
                    value:'',
                    errorMessage:'',
                    name: 'email'
                },
                phone: {
                    value:'',
                    errorMessage:'',
                    name: 'phone',
                    mask: [ /\d/, /\d/, /\d/ , ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/ ]
                },
                password: {
                    value:'',
                    errorMessage:'',
                    name: 'password',
                    changed: false,
                    validation: {
                        length: false,
                        captalize: false,
                        number: false
                    }
                },
                confirmPassword:  {
                    value:'',
                    errorMessage:'',
                    name: 'confirmPassword'
                },
            },
            validationMessage: {
                required: 'Campo Obrigatório',
                match: 'Senha nao corresponde a anterior',
                email: 'Digite um email válido',
                name: 'Digite um nome válido',
                phone: 'O número de telefone precisa ter 9 digitos',
                emailRegistered: 'O email informado ja foi registrado' 
            },
            submited: false,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onBlurHandler = this.onBlurHandler.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.emailRegistered == true) {
            let {input, validationMessage} = this.state
            input.email.errorMessage = validationMessage.emailRegistered
            this.setState({input})
        }
    }

    handleSubmit(event) {
        event.preventDefault();
    
        if(this.isFormValid()) {

            let {
                name, 
                email,
                phone,
                password,
            } = this.state.input

            let newRegister = {
                name: name.value, 
                email: email.value,
                phone: phone.value,
                password: password.value,
            }

            this.props.postRegister(newRegister)

        }
    }

    isFormValid() {
        let { input } = this.state,
            formIsValid = true

        _.forIn(input, (value) => { 
            this.checkFieldHasError(value.name)
            if( this.checkHasInputError(value) == false ) 
                formIsValid = false 
        });

        return formIsValid
    }

    checkHasInputError(input) {
        return input.errorMessage === ""
    }

    checkFieldHasError(name) {

        let { input } = this.state

        if(input[name].value.length === 0 && input[name].errorMessage.length === 0 ) {
            input = this.updateInputObject(input[name].value, name)    
            this.setState({input});
        }
    }

    handleInputChange(event) {
        const { value, name } = event.target;
        let { input } = this.state

        input = this.updateInputObject(value, name)    
        this.setState({input});
    }
    

    updateInputObject(value, field) {
        const {
                checkEmptyInput,
                checkEmailValidation,
                checkConfirmPassword,
                checkPasswordValidations,
                checkHasOnlyLetters,
                checkMinLength9
            } = validationFunctions

        let { input, validationMessage } = this.state,
            { 
              password,
              email,
              name,
              confirmPassword,
              phone
            } = input

        input[field].value = value

        switch(field) {
            case 'name':

                name.errorMessage = checkEmptyInput(name) ? validationMessage.required 
                    : !checkHasOnlyLetters(name) ? validationMessage.name : ''

                return input

            case 'email':

                email.errorMessage = !checkEmailValidation(value) ? validationMessage.email 
                    : checkEmptyInput(email) ? validationMessage.required : ''

                return input

            case 'password':

                if(!password.changed) password.changed = true

                password = checkPasswordValidations(password)
                confirmPassword.errorMessage = checkEmptyInput(confirmPassword) ? confirmPassword.errorMessage 
                    : !checkConfirmPassword(password.value, confirmPassword.value) ? validationMessage.match : ''
                
                return input

            case 'confirmPassword':

                confirmPassword.errorMessage = checkEmptyInput(confirmPassword) ? validationMessage.required 
                    : !checkConfirmPassword(password.value, confirmPassword.value) ? validationMessage.match : ''

                return input   

            case 'phone':

                phone.errorMessage = checkEmptyInput(phone) ? validationMessage.required 
                    : !checkMinLength9(phone.value) ? validationMessage.phone : ''

                return input
                
            default:
                return input
        }
    }

    onBlurHandler(email) {
        let {input} = this.state
        input.email.errorMessage = ""
        this.props.checkEmailRegistered(email)
    }

    render() {
        let {
             name, 
             email,
             phone,
             password,
             confirmPassword 
            } = this.state.input,
            {checkPassword} = validationFunctions,
            {fetchingEmail} = this.props

        return(
            <form className='account-form' onSubmit={this.handleSubmit} >
                <div className='header' >
                    <h4>Formulário de cadastro</h4>
                </div>
                <div className='form-data' >
                    <InputGroup 
                        inputProps={name}
                        label={'Nome completo'} 
                        placeHolder="Digite seu nome completo"
                        onInputChange={this.handleInputChange}
                        showMensageError={ name.errorMessage.length > 0}
                    />

                    <InputGroup 
                        inputProps={email}
                        label={'E-mail'} 
                        placeHolder="Digite seu email"
                        onInputChange={this.handleInputChange}
                        showMensageError={email.errorMessage.length > 0}  
                        onBlurHandler={this.onBlurHandler}  
                        disabled={fetchingEmail}
                    />

                    <InputGroup 
                        inputProps={phone}
                        label={'Telefone'} 
                        placeHolder="Digite seu telefone"
                        onInputChange={this.handleInputChange}
                        showMensageError={phone.errorMessage.length > 0}
                        mask={true}     
                    />

                    <InputGroup 
                        inputProps={password}
                        label={'Senha'} 
                        placeHolder="Digite sua senha"
                        onInputChange={this.handleInputChange}
                        success={checkPassword(password) === 0}
                        inputType='password'
                        showMensageError={ password.changed && checkPassword(password) > 0}
                    />
                    
                    <PasswordStrength 
                        validation={password.validation}  
                        changed={password.changed}
                        errorNumber={checkPassword(password)}
                    />

                    <InputGroup 
                        inputProps={confirmPassword}
                        label={'Confirme sua senha'} 
                        placeHolder="Digite sua senha novamente"
                        onInputChange={this.handleInputChange}
                        inputType='password'
                        showMensageError={confirmPassword.errorMessage.length > 0}
                    />

                </div>
                <button>Cadastrar</button>
            </form>
        )
    }
}

const mapStateToProps = (state) => ({
    fetchingEmail: state.fetchingEmail,
    fetchingRegister: state.fetchingRegister,
    emailRegistered: state.emailRegistered,
    saveRegister: state.saveRegister,
    error: state.error
})

const mapDispatchToProps = dispatch => ({
    checkEmailRegistered: (email) => dispatch(checkEmailRegistered(email)),
    postRegister: (register) => dispatch(postRegisterData(register))
})
  


export default connect(mapStateToProps, mapDispatchToProps)(AccountForm);
import React, { Component } from 'react'
import InputGroup from '../InputGroup/InputGroup'
import PasswordStrength from '../PasswordStrength/PasswordStrength'
import _ from 'lodash'
import './style/index.scss'

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
                phone: 'O número de telefone precisa ter 9 digitos' 
            },
            submited: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
    
        let { submited, input: { password } } = this.state

        submited === false ? this.setState({submited: true}) : null

        if(!password.changed) {
            password.changed = true
            this.setState({password})
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
            } = this

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

    //input validation functions

    checkEmptyInput(field) {
        return field.value.length === 0
    }

    checkMinLength9(value) {
        return value.replace( /\D/g, '').length === 9
    }

    checkHasOnlyLetters(field) {
        const regex = /^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/g
        return regex.test(field.value)
    }
    

    checkEmailValidation(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regex.test(email)
    }

    checkConfirmPassword(password, confirmPassword) {
        return password === confirmPassword
    }

    checkPassword(password) {
        let error = 0
        _.forIn(password.validation, (value, key) => value === false ? error++ : null ) 
        return error
    }

    checkPasswordValidations(password) {
        const regexPattern = {
            length: /.{6,}/g,
            captalize: /[A-Z]{1,}/g,
            number: /[0-9]{1,}/g
        }

        password.validation.length = regexPattern.length.test(password.value)
        password.validation.captalize = regexPattern.captalize.test(password.value)
        password.validation.number = regexPattern.number.test(password.value)

        return password
    }

    render() {
        let {
             name, 
             email,
             phone,
             password,
             confirmPassword 
            } = this.state.input,
            { submited } = this.state

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
                        showMensageError={ name.errorMessage.length > 0}/>

                    <InputGroup 
                        inputProps={email}
                        label={'E-mail'} 
                        placeHolder="Digite seu email"
                        onInputChange={this.handleInputChange}
                        showMensageError={email.errorMessage.length > 0}/>

                    <InputGroup 
                        inputProps={phone}
                        label={'Phone'} 
                        placeHolder="Digite seu telefone"
                        onInputChange={this.handleInputChange}
                        showMensageError={phone.errorMessage.length > 0}
                        mask={true} />

                    <InputGroup 
                        inputProps={password}
                        label={'Senha'} 
                        placeHolder="Digite sua senha"
                        onInputChange={this.handleInputChange}
                        success={this.checkPassword(password) === 0}
                        inputType='password'
                        showMensageError={ password.changed && this.checkPassword(password) > 0}/>
                    
                    <PasswordStrength 
                        validation={password.validation}  
                        changed={password.changed}
                        errorNumber={this.checkPassword(password)}/>

                    <InputGroup 
                        inputProps={confirmPassword}
                        label={'Confirme sua senha'} 
                        placeHolder="Digite sua senha novamente"
                        onInputChange={this.handleInputChange}
                        inputType='password'
                        showMensageError={confirmPassword.errorMessage.length > 0}/>
                </div>
                <button>Cadastrar</button>
            </form>
        )
    }
}

export default AccountForm 
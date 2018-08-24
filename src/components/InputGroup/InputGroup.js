import React from 'react'
import _ from 'lodash'
import './style/index.scss'
import MaskedInput from 'react-text-mask'


/**
 * Statless Component Input Group
 *
 * @param {object} props
 * @returns
 */
const InputGroup = (props) => {

    if(!_.isEmpty(props)) {

        let {
             errorMessage,
             value,
             name, 
            } = props.inputProps


        const onBlurHandler = (value) => {
            if(errorMessage == "" && props.hasOwnProperty('onBlurHandler'))
                props.onBlurHandler(value)
        }

        return (
            <div 
                className={
                    `input-group 
                        ${props.showMensageError ? 'error' : '' }
                        ${props.success ? 'success' : '' }`
                } 
            >
                <label>{props.label}</label>
                {
                    props.mask ? (
                        <MaskedInput 
                            value={value} 
                            placeholder={props.placeHolder}
                            name={name}
                            onChange={(event) => props.onInputChange(event)}
                            mask={props.inputProps.mask}
                        />
                    ) : (
                        <input 
                            type={props.inputType ? props.inputType : 'text' } 
                            value={value} 
                            placeholder={props.placeHolder}
                            name={name}
                            onChange={(event) => props.onInputChange(event)}
                            onBlur={() => onBlurHandler(value)}
                            disabled={props.hasOwnProperty('disabled') ? props.disabled : false }
                        />
                    )
                }
                
                <span 
                    className={props.showMensageError ? '' : 'hidden'} >
                    {errorMessage}
                </span>
            </div>
        )
    }

    return null
}

export default InputGroup

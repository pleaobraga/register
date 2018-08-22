import React from 'react'
import _ from 'lodash'
import './style/index.scss'
import MaskedInput from 'react-text-mask'


const InputGroup = (props) => {

    if(!_.isEmpty(props)) {

        let {
             errorMessage,
             value,
             name, 
            } = props.inputProps


        const onBlurFunction = (value) => {
            if(!errorMessage != "" && props.hasOwnProperty('onBlurFunction'))
                props.onBlurFunction(value)
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
                            onBlur={onBlurFunction(value)}
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

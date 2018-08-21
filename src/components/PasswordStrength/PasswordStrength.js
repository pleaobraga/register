import React from 'react'
import _ from 'lodash'
import './style/index.scss'

const PasswordStrength = (props) => {

    const barColor = (error) => {
        return error === 0 ? 'end-require' 
            : error === 1 ? 'midle-require'
            : error === 2 ? 'start-require' : 'empty'
    }


    if(!_.isEmpty(props)) {

        let { length, captalize, number } = props.validation,
            { changed, errorNumber: error } = props
        
        return (
            <div className='password-strength' >
                <div className='section-bar' >
                    <span 
                        className={`strength-bar ${barColor(error)}`} >
                    </span>
                    <span 
                        className={`strength-bar 
                                    ${error <= 1 ? barColor(error) : 'empty'}`} >
                    </span>
                    <span 
                        className={`strength-bar 
                                    ${error === 0 ? barColor(error) : 'empty'}`} >
                    </span>
                </div>
                <div className='section-explanation' >
                    <p>
                        <span className={
                                `circle-indicator 
                                ${!changed ? 'empty' : length ? 'success' : 'error'}`} >
                        </span> 
                        Pelo menos 6 caracteres
                    </p>
                    <p>
                        <span className={
                                `circle-indicator 
                                ${!changed ? 'empty' : captalize ? 'success' : 'error'}`} >
                        </span> 
                        Pelo menos 1 letra maiúscula
                    </p>
                    <p>
                        <span className={
                                `circle-indicator 
                                ${!changed ? 'empty' : number ? 'success' : 'error'}`} >
                        </span> 
                        Pelo menos 1 número
                    </p>
                </div>
            </div>
        )
    }

    return null
}

export default PasswordStrength

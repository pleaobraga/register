import * as constant from '../utils/constants'
import * as api from '../utils/apiRegister'

//email 
const checkEmail = () => ({
    type: constant.CHECK_EMAIL,
})

const checkEmailSuccess = (resp) => ({
    type: constant.CHECK_EMAIL_SUCCESS,
    resp
})

const checkEmailError = (error) => ({
    type: constant.CHECK_EMAIL_ERROR,
    error
})



//save data
const postRegister = () => ({
    type: constant.POST_REGISTER,
})

const postRegisterSuccess = (resp) => ({
    type: constant.POST_REGISTER_SUCCESS,
    resp
})

const postRegisterError = (error) => ({
    type: constant.POST_REGISTER_ERROR,
    error
})


export const checkEmailRegistered = email => dispatch => {
    
    dispatch(checkEmail())

    return api.checkEmail(email)
        .then(response => {
            dispatch(checkEmailSuccess(response.data))
            return response.data
        })
        .catch( error => {
            console.log(error)
            dispatch(checkEmailError(error))}
        )
}

export const postRegisterData = register => dispatch => {

    dispatch(postRegister())

    return api.postRegister(register)
        .then(response => {
            dispatch(postRegisterSuccess(response.data))
            return response.data
        })
        .catch( error => {
            console.log(error)
            dispatch(postRegisterError(error))}
        )
}
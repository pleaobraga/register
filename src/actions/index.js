import * as constant from '../utils/constants'


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

const postRegister= () => ({
    type: constant.SAVE_REGISTER,
})

const postDataSuccess = (resp) => ({
    type: constant.SAVE_REGISTER_SUCCESS,
    resp
})

const postDataError = (error) => ({
    type: constant.SAVE_REGISTER_ERROR,
    error
})
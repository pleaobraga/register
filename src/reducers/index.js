import * as constant from '../utils/constants'

let initialState = {
    fetchingEmail: false,
    fetchingRegister: false,
    emailRegistered: false,
    saveRegister: false,
    error: {
        hasError: false,
        message: ""
    }
}

const register = (state = initialState, action) => {

    let error = {
        hasError: "",
        message: ""
    }

    switch(action.type) {
        case constant.CHECK_EMAIL:
            return {...state, fetchingEmail: true, emailRegistered:false}


        case constant.CHECK_EMAIL_SUCCESS:
            return {...state, fetchingEmail: false, emailRegistered: action.resp}


        case constant.CHECK_EMAIL_ERROR:

            error = {
                hasError: true,
                message: action.error
            }

            return {...state, fetchingEmail: false, emailRegistered: false, error}


        case constant.POST_REGISTER:
            return {...state, fetchingRegister: false}


        case constant.POST_REGISTER_SUCCESS:
            return {...state, fetchingRegister: false, saveRegister: true}

        
        case constant.POST_REGISTER_ERROR:

            error = {
                hasError: true,
                message: action.error
            }

            return {...state, fetchingRegister: false, saveRegister: false, error}

        default: 
            return state
    }
}

export default register;
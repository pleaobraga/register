import axios from 'axios'
import * as constant from './constants'


//Registers request
export const getRegisters = () => {
    return axios.get(`${constant.URL_BASE}/`);
}

//create a register
export const postRegister = (register) => {
    return axios.post(`${constant.URL_BASE}/`, register);
}

export const checkEmail = (email) => {
    return axios.post(`${constant.URL_BASE}/check-email`, email);
}
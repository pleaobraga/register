//input validation functions

export const checkEmptyInput = (field) => {
    return field.value.length === 0
}

export const checkMinLength9 = (value) => {
    return value.replace( /\D/g, '').length === 9
}

export const checkHasOnlyLetters = (field) => {
    const regex = /^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/g
    return regex.test(field.value)
}

export const checkEmailValidation = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email)
}

export const checkConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword
}

export const checkPassword = (password) => {
    let error = 0
    _.forIn(password.validation, (value, key) => value === false ? error++ : null ) 
    return error
}

export const checkPasswordValidations = (password) => {
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

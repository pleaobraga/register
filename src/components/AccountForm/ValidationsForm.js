//input validation functions

 /**
 * check if input is empty
 *
 * @param {object} field
 * @returns {boolean}
 */
export const checkEmptyInput = (field) => {
    return field.value.length === 0
}

 /**
 * check if value has length = 9
 *
 * @param {*} value
 * @returns {boolean}
 */
export const checkMinLength9 = (value) => {
    return value.replace( /\D/g, '').length === 9
}

 /**
 * check if field has only letters
 *
 * @param {objecy} field
 * @returns {boolean}
 */
export const checkHasOnlyLetters = (field) => {
    const regex = /^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/g
    return regex.test(field.value)
}

 /**
 * check if email is valid
 *
 * @param {*} email
 * @returns {boolean}
 */
export const checkEmailValidation = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email)
}

 /**
 * check if password and 
 * confirm password are the same
 *
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {boolean}
 */
export const checkConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword
}

 /**
 * check if the password is strong
 *
 * @param {object} password
 * @returns {number}
 */
export const checkPassword = (password) => {
    let error = 0
    _.forIn(password.validation, (value, key) => value === false ? error++ : null ) 
    return error
}

 /**
 * check error from password
 *
 * @param {object} password
 * @returns
 */
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

import axios from '../utils/axios-customize'

export const callRegister = (email, password, name, age, gender, address) => {
    return axios.post('/api/v1/auth/register', {email, password, name, age, gender, address})
}

export const callLogin = (username, password) => {
    return axios.post('/api/v1/auth/login', {username, password})
}

export const callFetchAccount = () => {
    return axios.get('/api/v1/auth/account')
}
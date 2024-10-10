import axios from '../utils/axios-customize'
//Module Auth
export const callRegister = (email, password, name, age, gender, address) => {
    return axios.post('/api/v1/auth/register', {email, password, name, age, gender, address})
}

export const callLogin = (username, password) => {
    return axios.post('/api/v1/auth/login', {username, password})
}

export const callFetchAccount = () => {
    return axios.get('/api/v1/auth/account')
}

export const callLogout = () => {
    return axios.post('/api/v1/auth/logout')
}



//Module User
export const callFetchDataUser = (qs) => {
    return axios.get(`/api/v1/users?${qs}`)
}

export const callFetchRole = () => {
    return axios.get(`/api/v1/roles`)
}

export const callUpdateUser = (id, name, idCard, phone, age, gender, role, address ) => {
    return axios.patch(`/api/v1/users/${id}`, {name, idCard, phone, age, gender, role, address})
}

export const callSoftDeleteUser = (id) => {
    return axios.delete(`/api/v1/users/${id}`)
}


//Module Permission
export const callFetchDataPermission = (qs) => {
    return axios.get(`/api/v1/permissions?${qs}`)
}

export const callCreatePermission = (name, apiPath, method, module) => {
    return axios.post(`/api/v1/permissions`, {name, apiPath, method, module})
}

export const callUpdatePermission = (id, name, apiPath, method, module) => {
    return axios.patch(`/api/v1/permissions/${id}`, {name, apiPath, method, module})
}
export const callDeletePermission = (id) => {
    return axios.delete(`/api/v1/permissions/${id}`)
}
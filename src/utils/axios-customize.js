import axios from "axios";

const baseURL = import.meta.env.VITE_BE_URL;
const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true

});

instance.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('access_token')}`};
// Add a request interceptor

const handleRefreshToken = async () =>{
    const res = await instance.get('/api/v1/auth/refresh');
    if(res && res.data){
        return res.data.access_token;
     
    }
    return null;
  
}

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
},async function (error) {
    
    if (error.config && error.response && +error.response.status === 401) {
        const access_token = await  handleRefreshToken();
        if(access_token){
            error.config.headers['Authorization'] = `Bearer ${access_token}`;
            localStorage.setItem('access_token', access_token);
            console.log(access_token)
            return instance.request(error.config);
        }
        
       
      }
    


    return error?.response?.data ??  Promise.reject(error);
});
export default instance
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URI
});

const getToken = ()=>{
    let info = window.localStorage.getItem('kauth')
    info = JSON.parse(info)
    if(info && info.token){
        let token = info.token.accessToken;
        return token;
                  
    }
    return null
}

api.interceptors.request.use(
    config => {
        if (getToken())
            config.headers["Authorization"] = `Bearer ${getToken()}`;
        config.headers["Content-Type"] = "application/json";
        return config;
    },
    error => {
        Promise.reject(error);
    }
)

export default api;

import axios from 'axios';

// export function retrieveHelloWorldBean() {
//     return axios.get('http://localhost:8080/hello-world-bean')
// }

const apiClinet = axios.create(
    {
        baseURL:'http://localhost:8080' 
    }
)
export const retrieveHelloWorldBean = () => axios.get('http://localhost:8080/hello-world-bean') 

// Response to preflight request doesn't pass access control check
// No 'Access-Control-Allow-Origin' header is present on the requested resource
export const retrieveHelloWorldPathVariable = (username) => apiClinet.get(`/hello-world/path-variable/${username}`, {
    headers: {
        Authorization : 'Basic aW4yOG1pbnV0ZXM6ZHVtbXk='
    }
})

export const excuteBasicAuthenticationService 
    = (token) => apiClinet.get(`/basicauth`, {
        headers: {
            Authorization : token 
        }
})
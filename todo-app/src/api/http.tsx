import axios from 'axios'



const http = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer token"
    },
    timeout: 3000
})

export default http
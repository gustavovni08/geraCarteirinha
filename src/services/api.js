import axios from "axios"

const api = axios.create({
    // baseURL: 'https://api.hbcard.com.br/'
    baseURL: 'http://localhost:3000'
});

export default api
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://3330-f449d967-a44d-4e40-ab7f-7a258ea80e5f.ws-us02.gitpod.io/'
});

export default api;
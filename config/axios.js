import axios from "axios";


const instanse = axios.create({
    baseURL: 'http://localhost:1000'
});

export default instanse;
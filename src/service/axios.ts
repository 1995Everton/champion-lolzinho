import axios from 'axios';

export default axios.create({
    baseURL: 'https://league-of-legends-api-v1.herokuapp.com/api'
})
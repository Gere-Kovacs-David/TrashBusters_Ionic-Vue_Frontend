import axios from 'axios';

export const client = axios.create({
    baseURL: 'http://3.120.205.115:8000',
    });
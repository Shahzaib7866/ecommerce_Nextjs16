
import axios from "axios";

const APP_URL = 'http://localhost:8000/api';


export const register = (data) => axios.post(APP_URL + '/register', data);

export const login = (data) => axios.post(APP_URL + '/login', data);












import axios from 'axios'
import {baseURL} from '../api'
export const getProducts=()=>{
    return axios.get(baseURL)
    .then(response => response.data)
}
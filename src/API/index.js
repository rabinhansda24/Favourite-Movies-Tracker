import axios from "axios";

import { appConstants } from "../constants/AppConstants";


const APIKit = axios.create({
    baseURL: appConstants.API_BASE,
    responseType: 'json'
})

APIKit.interceptors.request.use((config) => {
    config.headers["Content-Type"] = "application/json"
    return config
})


export const setAPIToken = (token) => {
    APIKit.interceptors.request.use((config) => {
        config.headers.Authorization = 'Bearer ' + token
        return config
    })
}

export default APIKit



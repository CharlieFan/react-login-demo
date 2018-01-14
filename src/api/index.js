import axios from 'axios'

let myAxios = axios.create({
    baseURL: 'http://sdchallenge.com:8080',
    timeout: 20000,
    responseType: 'json',
    // Add header config
    headers: {
        "Content-Type": "application/json"
    }
})

function processData(data = {}) {
    return JSON.stringify(data)
}

function getToken() {
    return localStorage.getItem('token')
}

export function apiGet(url, params) {
    return myAxios.get(url, {
        params: processData(params),
        headers: {
            'Authorization': getToken()
        }
    }).then((res) => {
        return res
    }).catch((err) => {
        // TODO: add err handler
        throw err
    })
}

export function apiPost(url, data) {
    return myAxios.post(url, processData(data)).then((res) => {
        return res.data
    }).catch((err) => {
        // TODO: add error handler
        throw err
    })
}
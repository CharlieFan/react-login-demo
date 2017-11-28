import axios from 'axios'

let myAxios = axios.create({
    baseURL: 'https://BaseURLHERE/',
    timeout: 20000,
    responseType: 'json',
    // TODO: Add header config
    // headers: {
    //     'authentication': 
    // }
})

function processData(data = {}) {
    // TODO APPEND TOKEN to data
    return JSON.stringify(data)
}

export function apiGet(url, params) {
    return myAxios.get(url, {
        params: processData(params)
    }).then((res) => {
        return res.data
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
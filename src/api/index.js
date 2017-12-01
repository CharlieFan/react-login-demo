import axios from 'axios'

function buildHttpHeader() {
    return {}
}

let myAxios = axios.create({
    baseURL: 'https://BaseURLHERE/',
    timeout: 20000,
    responseType: 'json',
    // TODO: Add header config
    headers: buildHttpHeader()
})

function processData(data = {}) {
    // TODO APPEND TOKEN to data maybe?
    return JSON.stringify(data)
}

function getToken() {
    return 'need token here'
}

export function apiGet(url, params) {
    return myAxios.get(url, {
        params: processData(params),
        headers: {
            'token': getToken()
        }
    }).then((res) => {
        return res.data
    }).catch((err) => {
        // TODO: add err handler
        throw err
    })
}

export function apiPost(url, data) {
    return myAxios.post(url, processData(data), {
        headers: {
            'token': 'need token here'
        }
    }).then((res) => {
        return res.data
    }).catch((err) => {
        // TODO: add error handler
        throw err
    })
}
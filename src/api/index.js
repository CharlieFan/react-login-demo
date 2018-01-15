import axios from 'axios'

let getToken = () => {
    let token = localStorage.getItem('token')
    return token
}

let myAxios = axios.create({
    baseURL: 'http://sdchallenge.com:8080',
    timeout: 20000,
    responseType: 'json',
})

function processData(data = {}) {
    return JSON.stringify(data)
}


export function apiGet(url, query = null) {
    return myAxios.get(url, {
        params: query,
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    }).then((res) => {
        return res.data
    }).catch((err) => {
        // TODO: add err handler
        if (err.response.status === 401) {
            localStorage.removeItem('token')
            window.location.href = '/'
        }
        throw err
    })
}

export function apiPost(url, data, header = false) {
    let requestHeaders = {
        "Content-Type": "application/json"
    }
    
    if (header) {
        requestHeaders["Authorization"] = `Bearer ${getToken()}`
    }

    return myAxios.post(url, processData(data), {
        headers: requestHeaders
    })
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        // TODO: add error handler
        if (err.response.status === 401) {
            localStorage.removeItem('token')
            window.location.href = '/'
        }
        
        throw err
    })
}
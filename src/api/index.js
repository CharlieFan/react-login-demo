import axios from 'axios'

let getToken = () => {
    let token = localStorage.getItem('token')
    return token
}

let myAxios = axios.create({
    baseURL: 'http://sdchallenge.com:8080',
    timeout: 20000,
    responseType: 'json',
    // Add header config
    // headers: {
    //     "Content-Type": "application/json",
    // }
})

function processData(data = {}) {
    return JSON.stringify(data)
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

export function apiPost(url, data, header = false) {
    let requestHeaders = {
        "Content-Type": "application/json"
    }
    
    if (header) {
        requestHeaders["Authorization"] = `Bearer ${getToken()}`
    }
    // console.log(data)
    // console.log(requestHeaders)

    // return myAxios.post(url, processData(data))
    return myAxios.post(url, processData(data), {
        headers: requestHeaders
    })
    .then((res) => {
        return res
    })
    .catch((err) => {
        // TODO: add error handler
        throw err
    })
}
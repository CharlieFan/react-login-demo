import {apiGet, apiPost} from './index'

export default {
    user: {
        signup(data) {
            return apiPost('/authentication/signup', data)
        },
        login(data) {
            return apiPost('/authentication/login', data)
        },
        logout() {
            return apiPost('/authentication/logout', {}, true)
        }
    },
    home: {
        fetchAlcohol() {
            return apiGet('/products')
        }
    }
}
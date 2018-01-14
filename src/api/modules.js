import {apiGet, apiPost} from './index'

export default {
    user: {
        signup(data) {
            return apiPost('/authentication/signup', data)
        },
        login(data) {
            return apiPost('loginUrl', data)
        }
    },
    home: {
        fetchAlcohol() {
            return apiGet('/products')
        }
    }
}
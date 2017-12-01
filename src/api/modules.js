import {apiGet, apiPost} from './index'

export default {
    user: {
        signup(data) {
            return apiPost('url here', data)
        },
        login(data) {
            return apiPost('loginUrl', data)
        },
        logout() {
            return apiPost('logoutUrl', data)
        },
    },
    home: {
        fetchAlcohol() {
            return apiGet('getDataUrl')
        }
    }
}
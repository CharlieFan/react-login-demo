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
        },
        getUserInfo() {
            return apiGet('/user/user_information')
        }
    },
    home: {
        getAlcohol(query, page = 1) {
            
            return apiGet('/lcbo/search', {
                q: query,
                page: page
            })
        }
    }
}
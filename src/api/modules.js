import {apiGet, apiPost} from './index'

export default {
    user: {
        sigup(data) {
            return apiPost('url here', data)
        }
    }
}
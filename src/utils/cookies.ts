import Cookies from 'js-cookie'

// User
const tokenKey = 'x-access-token'
export const getToken = () => Cookies.get(tokenKey)

const baseApiKey = 'base_api'
export const getBaseApi = () => Cookies.get(baseApiKey)

import Cookies from 'js-cookie'

// User
const tokenKey = 'x-access-token'
const refreshTokenKey = 'x-refresh-token'
export const getToken = () => Cookies.get(tokenKey)
export const setToken = (token: string) => Cookies.set(tokenKey, token)
export const removeToken = () => Cookies.remove(tokenKey)

export const getRefreshToken = () => Cookies.get(refreshTokenKey)
export const setRefreshToken = (token: string) => Cookies.set(refreshTokenKey, token)
export const removeRefreshToken = () => Cookies.remove(refreshTokenKey)

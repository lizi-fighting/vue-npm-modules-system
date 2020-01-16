import request from '@/utils/request'

export const getUsers = (params: any) =>
  request({
    url: '/user/list',
    method: 'post',
    params
  })

export const getUserInfo = (data: any) =>
  request({
    url: '/oauth/info',
    method: 'post',
    data
  })

export const changeEnabled = (id: string, enabled: boolean) =>
  request({
    url: `/user/enabled/${id}/${enabled}`,
    method: 'put'
  })

export const login = (data: any) =>
  request({
    url: '/oauth/token',
    method: 'post',
    params: data
  })

export const refreshToken = (token: string) =>
  request({
    url: '/oauth/token',
    method: 'post',
    params: {
      grant_type: 'refresh_token',
      refresh_token: token
    }
  })

export const logout = () =>
  request({
    url: '/user/logout',
    method: 'post'
  })

export const register = (data: any) =>
  request({
    url: '/user/register',
    method: 'post',
    data
  })

export const saveUser = (data: any) =>
  request({
    url: '/user/save',
    method: 'post',
    params: data
  })

export const delUser = (id: string) =>
  request({
    url: `/user/del/${id}`,
    method: 'post'
  })

export const checkUser = (data: any) =>
  request({
    url: '/user/check',
    method: 'post',
    params: data
  })

export const getUser = (id: any) =>
  request({
    url: `/user/get/${id}`,
    method: 'get'
  })

export const changePwd = (data: any) =>
  request({
    url: `/user/changePwd/${data.id}`,
    method: 'post',
    params: data
  })

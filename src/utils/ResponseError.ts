// code == 400： 业务异常
// code == 401： 请求未授权
// code == 404： 未找到请求内容
// code == 405： 不支持当前请求
// code == 415： 不支持当前媒体类型
// code == 500： 服务器异常

const responseErrorMessage: {[key: number]: string} = {
  '400': '业务异常',
  '401': '用户会话已过期',
  '404': '未找到请求内容',
  '405': '不支持当前请求',
  '415': '不支持当前媒体类型',
  '500': '服务器异常，请稍后重试'
}

export const ResponseError = (code: number): string => {
  return responseErrorMessage[code] || ''
}

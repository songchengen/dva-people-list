import request from './../utils/request'

export function queryAll() {
  return request('/api/users', { method: 'get' })
}

export function queryOne(id) {
  return request(`/api/user?id=${id}`, { method: 'get'})
}

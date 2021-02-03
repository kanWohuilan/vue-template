import http from '@/utils/http'

export function searchUser(name) {
  return http({
    url: '/vue-element-admin/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return http({
    url: '/vue-element-admin/transaction/list',
    method: 'get',
    params: query
  })
}

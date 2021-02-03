import http from '@/utils/http'

export function getList(params) {
  return http({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

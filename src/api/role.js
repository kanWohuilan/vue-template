import http from '@/utils/http'

export function getRoutes() {
  return http({
    url: '/vue-element-admin/routes',
    method: 'get'
  })
}

export function getRoles() {
  return http({
    url: '/vue-element-admin/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return http({
    url: '/vue-element-admin/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return http({
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return http({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}

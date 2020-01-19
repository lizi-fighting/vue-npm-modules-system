import { RouteConfig } from 'vue-router'

import { User, Dept } from '../../src/packages/index'

const systemViews: RouteConfig[] = [
  {
    path: 'user',
    component: User,
    name: 'UserList',
    meta: { title: 'user', roles: ['admin'] }
  },
  {
    path: 'dept',
    component: Dept,
    name: 'Dept',
    meta: { title: 'dept' }
  }
]

export default systemViews

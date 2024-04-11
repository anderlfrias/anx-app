import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [
  ...authRoute
]

export const protectedRoutes = [
  {
    key: 'home',
    path: '/home',
    component: React.lazy(() => import('views/Home')),
    authority: [],
  },
  {
    key: 'roles',
    path: '/roles',
    component: React.lazy(() => import('views/roles')),
    authority: [],
  },
  {
    key: 'users',
    path: '/users',
    component: React.lazy(() => import('views/users')),
    authority: [],
  }
]
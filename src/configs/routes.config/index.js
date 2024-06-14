import React from 'react'
import authRoute from './authRoute'
import { ADMIN, ROOT } from 'constants/roles.constant'

export const publicRoutes = [
  ...authRoute
]

export const protectedRoutes = [
  {
    key: 'home',
    path: '/home',
    component: React.lazy(() => import('views/Home')),
    authority: [],
    // meta: {
    //   headerContainer: true,
    //   header: React.lazy(() => import('components/custom/HomeHeader')),
    //   footer: false,
    //   layout: 'blank',
    // },
  },
  {
    key: 'profile',
    path: '/profile',
    component: React.lazy(() => import('views/profile')),
    authority: [],
  },
  {
    key: 'apps',
    path: '/apps',
    component: React.lazy(() => import('views/apps')),
    authority: [ADMIN, ROOT],
  },
  {
    key: 'apps',
    path: '/apps/create',
    component: React.lazy(() => import('views/apps/create')),
    authority: [ADMIN, ROOT],
  },
  {
    key: 'apps',
    path: '/apps/:id',
    component: React.lazy(() => import('views/apps/edit')),
    authority: [ADMIN, ROOT],
  },
  {
    key: 'roles',
    path: '/roles',
    component: React.lazy(() => import('views/roles')),
    authority: [ADMIN, ROOT],
  },
  {
    key: 'roles',
    path: '/roles/create',
    component: React.lazy(() => import('views/roles/create')),
    authority: [ADMIN, ROOT],
  },
  {
    key: 'roles',
    path: '/roles/:id',
    component: React.lazy(() => import('views/roles/edit')),
    authority: [ADMIN, ROOT],
  },
  {
    key: 'users',
    path: '/users',
    component: React.lazy(() => import('views/users')),
    authority: [ADMIN, ROOT],
  },
  {
    key: 'users',
    path: '/users/create',
    component: React.lazy(() => import('views/users/create')),
    authority: [ADMIN, ROOT],
  },
  {
    key: 'users',
    path: '/users/:id',
    component: React.lazy(() => import('views/users/edit')),
    authority: [ADMIN, ROOT],
  },
  {
    key: 'users',
    path: '/users/:id/profile',
    component: React.lazy(() => import('views/users/profile')),
    authority: [ADMIN, ROOT],
  },
  {
    key: 'users',
    path: '/users/:id/change-password',
    component: React.lazy(() => import('views/users/change-password')),
    authority: [ADMIN, ROOT],
  },
  {
    key: 'restrictions',
    path: '/restrictions',
    component: React.lazy(() => import('views/restrictions')),
    authority: [ADMIN, ROOT],
  },
  {
    key: 'restrictions',
    path: '/restrictions/create',
    component: React.lazy(() => import('views/restrictions/create')),
    authority: [ADMIN, ROOT],
  },
  {
    key: 'restrictions',
    path: '/restrictions/:id',
    component: React.lazy(() => import('views/restrictions/edit')),
    authority: [ADMIN, ROOT],
  },
  {
    key: 'access',
    path: '/users-access',
    component: React.lazy(() => import('views/access')),
    authority: [ADMIN, ROOT],
  },
  {
    key: 'log',
    path: '/logs',
    component: React.lazy(() => import('views/logs')),
    authority: [ROOT],
  },
  {
    key: 'log',
    path: '/logs/:id',
    component: React.lazy(() => import('views/logs/details')),
    authority: [ROOT],
  },
  {
    key: 'change-password',
    path: '/change-password',
    component: React.lazy(() => import('views/change-password')),
    authority: [],
  },
]
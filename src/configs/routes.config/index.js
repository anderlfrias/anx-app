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
    key: 'profile',
    path: '/profile',
    component: React.lazy(() => import('views/profile')),
    authority: [],
  },
  {
    key: 'apps',
    path: '/apps',
    component: React.lazy(() => import('views/apps')),
    authority: [],
  },
  {
    key: 'apps',
    path: '/apps/create',
    component: React.lazy(() => import('views/apps/create')),
    authority: [],
  },
  {
    key: 'apps',
    path: '/apps/:id',
    component: React.lazy(() => import('views/apps/edit')),
    authority: [],
  },
  {
    key: 'roles',
    path: '/roles',
    component: React.lazy(() => import('views/roles')),
    authority: [],
  },
  {
    key: 'roles',
    path: '/roles/create',
    component: React.lazy(() => import('views/roles/create')),
    authority: [],
  },
  {
    key: 'roles',
    path: '/roles/:id',
    component: React.lazy(() => import('views/roles/edit')),
    authority: [],
  },
  {
    key: 'users',
    path: '/users',
    component: React.lazy(() => import('views/users')),
    authority: [],
  },
  {
    key: 'users',
    path: '/users/create',
    component: React.lazy(() => import('views/users/create')),
    authority: [],
  },
  {
    key: 'users',
    path: '/users/:id',
    component: React.lazy(() => import('views/users/edit')),
    authority: [],
  },
  {
    key: 'users',
    path: '/users/:id/profile',
    component: React.lazy(() => import('views/users/profile')),
    authority: [],
  },
  {
    key: 'users',
    path: '/users/:id/change-password',
    component: React.lazy(() => import('views/users/change-password')),
    authority: [],
  },
  {
    key: 'restrictions',
    path: '/restrictions',
    component: React.lazy(() => import('views/restrictions')),
    authority: [],
  },
  {
    key: 'restrictions',
    path: '/restrictions/create',
    component: React.lazy(() => import('views/restrictions/create')),
    authority: [],
  },
  {
    key: 'restrictions',
    path: '/restrictions/:id',
    component: React.lazy(() => import('views/restrictions/edit')),
    authority: [],
  },
  {
    key: 'access',
    path: '/users-access',
    component: React.lazy(() => import('views/access')),
    authority: [],
  },
  {
    key: 'log',
    path: '/logs',
    component: React.lazy(() => import('views/logs')),
    authority: [],
  },
  {
    key: 'log',
    path: '/logs/:id',
    component: React.lazy(() => import('views/logs/details')),
    authority: [],
  },
  {
    key: 'change-password',
    path: '/change-password',
    component: React.lazy(() => import('views/change-password')),
    authority: [],
  },
]
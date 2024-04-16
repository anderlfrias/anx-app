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
  // {
  //   key: 'apps',
  //   path: '/apps/:id',
  //   component: React.lazy(() => import('views/apps/edit')),
  //   authority: [],
  // },
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
]
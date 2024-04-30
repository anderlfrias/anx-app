import React from 'react'
import { FaUsers, FaUsersCog, FaUsersSlash } from 'react-icons/fa'
import {
  HiHome,
  HiViewGridAdd,
} from 'react-icons/hi'

const navigationIcon = {
  home: <HiHome />,
  users: <FaUsers />,
  roles: <FaUsersCog />,
  apps: <HiViewGridAdd />,
  restrictions: <FaUsersSlash />,
}

export default navigationIcon
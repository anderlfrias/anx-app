import React from 'react'
import { FaUserShield, FaUsers, FaUsersCog } from 'react-icons/fa'
import {
  HiHome,
  HiViewGridAdd,
} from 'react-icons/hi'

const navigationIcon = {
  home: <HiHome />,
  users: <FaUsers />,
  roles: <FaUsersCog />,
  apps: <HiViewGridAdd />,
  permissions: <FaUserShield />,
}

export default navigationIcon
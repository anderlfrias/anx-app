import React from 'react'
import { FaUsers, FaUsersCog, FaUsersSlash } from 'react-icons/fa'
import {
  HiHome,
  HiViewGridAdd,
} from 'react-icons/hi'
import { BiGitMerge } from "react-icons/bi";

const navigationIcon = {
  home: <HiHome />,
  users: <FaUsers />,
  roles: <FaUsersCog />,
  apps: <HiViewGridAdd />,
  restrictions: <FaUsersSlash />,
  log: <BiGitMerge />,
  // log: <FaHistory />,
  // log: <FaProjectDiagram />,
}

export default navigationIcon
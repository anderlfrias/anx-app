import React from 'react'
import { FaUsersCog } from 'react-icons/fa'
import {
    HiOutlineColorSwatch, 
	HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiHome,
} from 'react-icons/hi'

const navigationIcon = {
    home: <HiHome />,
    roles: <FaUsersCog />,
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />
}

export default navigationIcon
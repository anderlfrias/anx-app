import Header from 'components/template/Header'
import React from 'react'
import CustomModeSwitcher from './CustomModeSwitcher'
import UserDropdown from 'components/template/UserDropdown'

const HeaderActionsEnd = () => {
  return (
    <>
      <CustomModeSwitcher />
      <UserDropdown hoverable={false} />
    </>
  )
}

export default function HomeHeader() {
  return (
    <div className="flex flex-col flex-auto relative bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
      <Header
        className="border-b border-gray-200 dark:border-gray-700"
        headerEnd={<HeaderActionsEnd />}
      />
    </div>
  )
}

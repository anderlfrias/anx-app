import React from 'react'
import useDarkMode from 'utils/hooks/useDarkMode'
import { RiMoonClearLine, RiSunLine } from 'react-icons/ri'
import withHeaderItem from 'utils/hoc/withHeaderItem'
import classNames from 'classnames'

const CustomModeSwitcher = ({ className, ...rest }) => {

  const [isDark, setIsDark] = useDarkMode()

  const onSwitchChange = (dark) => {
    setIsDark(dark ? 'dark' : 'light')
  }

  return (
    <>
      {
        isDark ? (
          <div className={classNames('text-xl', className)} onClick={() => onSwitchChange(false)} {...rest}>
            <RiSunLine />
          </div>
        ) : (
          <div className={classNames('text-xl', className)} onClick={() => onSwitchChange(true)} {...rest}>
            <RiMoonClearLine />
          </div>
        )
      }
    </>
  )
}

export default withHeaderItem(CustomModeSwitcher)
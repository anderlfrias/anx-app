import React from 'react'
import openNotification from 'utils/openNotification'
import { HiOutlineDuplicate } from 'react-icons/hi'
import copy from 'utils/lib/copy'

// text : string to copy
// children : text to show
export default function TextToCopy({ text, children, className }) {

  const onCopy = () => {
    copy(text)
    openNotification('success', '', 'Texto copiado en el portapapeles')
  }

  return (
    <div className={className}>
      <span onClick={onCopy} className='flex items-center gap-1 hover:text-sky-800 dark:hover:text-sky-600 hover:underline cursor-pointer max-w-min' title='Copiar en el portapapeles'>
        {
          children && text ? (
            <>
              <HiOutlineDuplicate className='text-base' />
              {children || text}
            </>
          ) : null
        }
      </span>
    </div>
  )
}

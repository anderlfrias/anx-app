import React from 'react'
import copy from 'clipboard-copy'
import openNotification from 'utils/openNotification'
import { HiOutlineDuplicate } from 'react-icons/hi'

// text : string to copy
// children : text to show
export default function TextToCopy({ text, children, className }) {

  const onCopy = () => {
    copy(text)
    openNotification('success', '', 'Texto copiado en el portapapeles')
  }

  return (
    <div className={className}>
      <span onClick={onCopy} className='flex items-center gap-1 hover:text-indigo-600 hover:underline cursor-pointer' title='Copiar en el portapapeles'>
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

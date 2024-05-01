import { Tag } from 'components/ui'
import React from 'react'

export default function CustomizedTag({ text, color='slate' }) {

  return (
    <Tag className={`bg-${color}-100 text-${color}-600 dark:bg-${color}-500/20 dark:text-${color}-100 border-0 rounded`}>
      {text}
    </Tag>
  )
}

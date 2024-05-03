import { Tag, Tooltip } from 'components/ui'
import React from 'react'

export default function CustomizedTag({ text, description, color='slate' }) {

  if (description) {
    return (
      <Tooltip title={description}>
        <Tag className={`bg-${color}-100 text-${color}-600 dark:bg-${color}-600 dark:text-${color}-100 border-0 rounded text-sm`}>
          {text}
        </Tag>
      </Tooltip>
    )
  }
  return (
    <Tag className={`bg-${color}-100 text-${color}-600 dark:bg-${color}-600 dark:text-${color}-100 border-0 rounded text-sm`}>
      {text}
    </Tag>
  )
}

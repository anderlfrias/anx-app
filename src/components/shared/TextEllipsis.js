import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'components/ui'

const TextEllipsis = props => {

	const { text, maxTextCount } = props

	return (
		<>
			{(text && text.length) > maxTextCount ?
				<>
					{text.substring(0, (maxTextCount - 3))}
					<Tooltip title={text} placement='bottom'>
						<span>...</span>
					</Tooltip>
				</> :
				text
			}
		</>
	)
}

TextEllipsis.propTypes = {
	text: PropTypes.string,
}

TextEllipsis.defaultProps = {
	text: '',
	maxTextCount: 0
}

export default TextEllipsis
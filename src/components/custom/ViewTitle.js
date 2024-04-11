
import { HiOutlineChevronLeft } from 'react-icons/hi'
import { Link } from 'react-router-dom'

export default function ViewTitle (props) {
  const { title, backPath = -1, showBackPage = false } = props
  return (
    <div className='flex items-center'>
      {showBackPage && (
        <Link to={backPath}>
          <HiOutlineChevronLeft className='text-3xl font-bold text-gray-900 cursor-pointer' />
        </Link>
      )}
      <div>
        <h2>{title}</h2>
      </div>
    </div>
  )
}

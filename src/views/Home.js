import React from 'react'
// import { BiGitMerge } from 'react-icons/bi'
// import { FaUserShield, FaUsers, FaUsersCog, FaUsersSlash } from 'react-icons/fa'
// import { HiViewGridAdd } from 'react-icons/hi'
// import { Link } from 'react-router-dom'

// const Item = ({ children, className, path, color = 'sky', icon: Icon }) => {

// 	return (
// 		<Link to={path} className={
// 			`flex items-center justify-center p-4 h-32 rounded-2xl 
// 				bg-white transition-all hover:bg-${color}-700 hover:text-white
// 				border
// 				${className}`
// 			}
// 		>
// 			<div>
// 				<span className='flex justify-center'>
// 					<Icon className='text-5xl' />
// 				</span>
// 				<span className='font-bold'>
// 					{children}
// 				</span>
// 			</div>
// 		</Link>
// 	)
// }

const Home = () => {
	return (
		<div className='container mx-auto'>
			<span> Home </span>
			{/* <div className="grid sm:grid-cols-2 md:grid-cols-8 md:grid-rows-3 gap-6 text-2xl ">
				<Item path='/users' color='slate' className='md:col-span-2 md:row-span-2 md:h-full' icon={FaUsers}>
					Usuarios
				</Item>
				<Item path='/apps' className='md:col-span-4' icon={HiViewGridAdd}>
					Aplicaciones
				</Item>
				<Item path='roles' className='md:col-span-2 md:row-span-2 md:h-full' icon={FaUsersCog}>
					Roles
				</Item>
				<Item path='/restrictions' color='slate' className='md:col-span-4' icon={FaUsersSlash}>
					Restriciones
				</Item>
				<Item path='/users-access' className='md:col-span-4' icon={FaUserShield}>
					Accesos de usuario
				</Item>
				<Item path='/logs' color='slate' className='md:col-span-4' icon={BiGitMerge}>
					Bitácora 
				</Item>
			</div> */}
		</div>
	)
}

export default Home
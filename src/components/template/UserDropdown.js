import React, { useEffect } from 'react'
import { Avatar, Dropdown } from 'components/ui'
import withHeaderItem from 'utils/hoc/withHeaderItem'
import useAuth from 'utils/hooks/useAuth'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineUser, HiOutlineLogout } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { displayRole, getPrimaryRole } from 'utils/role'
import ChangePasswordSvg from 'assets/svg/ChangePasswordSvg'
import { FaUser } from 'react-icons/fa'
import { getToken } from 'services/ApiService'
import { apiGetRoleByNormalizedName } from 'services/RoleService'
import { setUser } from 'store/auth/userSlice'
import useURLSearchParams from 'utils/hooks/useURLSearchParams'
import { PREVIOUS_URL_KEY } from 'constants/app.constant'

const dropdownItemList = [
	{ label: 'Mi Perfil', path: '/profile', icon: <HiOutlineUser /> },
	{ label: 'Cambiar Contraseña', path: '/change-password', icon: <ChangePasswordSvg /> },
]

export const UserDropdown = ({ className }) => {

	// bind this 
	const userInfo = useSelector((state) => state.auth.user)
	const dispatch = useDispatch()
	const { signOut } = useAuth()
	const { fullPath } = useURLSearchParams()

	useEffect(() => {
		if (!userInfo.primaryRole) {
			if (getToken()) {
				async function fetchRole() {
					try {
						const resp = await apiGetRoleByNormalizedName(getPrimaryRole(userInfo.authority))

						if (resp.data) {
							dispatch(setUser({ ...userInfo, primaryRole: resp.data.name }))
						}
					} catch (error) {
						dispatch(setUser({ ...userInfo, primaryRole: displayRole(userInfo.authority) }))
					}
				}
				fetchRole()
			}

		}
	}, [userInfo, dispatch])

	const UserAvatar = (
		<div className={classNames(className, 'flex items-center gap-2')}>
			<Avatar size={32} shape="circle" icon={<FaUser />} />
			<div className="hidden md:block">
				<div className="text-xs capitalize">{userInfo.primaryRole || displayRole(userInfo.authority)}</div>
				<div className="font-bold">{userInfo.username}</div>
			</div>
		</div>
	)

	return (
		<div>
			<Dropdown menuStyle={{ minWidth: 240 }} renderTitle={UserAvatar} placement="bottom-end">
				<Dropdown.Item variant="header">
					<div className="py-2 px-3 flex items-center gap-2">
						<Avatar shape="circle" icon={<FaUser />} />
						<div>
							<div className="font-bold text-gray-900 dark:text-gray-100">{`${userInfo.name} ${userInfo.firstSurname} ${userInfo.secondSurname}`}</div>
							<div className="text-xs">{userInfo.email}</div>
						</div>
					</div>
				</Dropdown.Item>
				<Dropdown.Item variant="divider" />
				{dropdownItemList.map(item => (
					<Dropdown.Item eventKey={item.label} key={item.label} className="mb-1">
						<Link className="flex gap-2 items-center" to={`${item.path}?${PREVIOUS_URL_KEY}=${fullPath}`}>
							<span className="text-xl opacity-50">{item.icon}</span>
							<span>{item.label}</span>
						</Link>
					</Dropdown.Item>
				))}
				<Dropdown.Item variant="divider" />
				<Dropdown.Item onClick={signOut} eventKey="Sign Out" className="gap-2">
					<span className="text-xl opacity-50">
						<HiOutlineLogout />
					</span>
					<span>Cerrar Sesión</span>
				</Dropdown.Item>
			</Dropdown>
		</div>
	)
}

export default withHeaderItem(UserDropdown)

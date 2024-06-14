import {
	NAV_ITEM_TYPE_ITEM
} from 'constants/navigation.constant'
import { ADMIN, ROOT } from 'constants/roles.constant'

const navigationConfig = [
	{
		key: 'home',
		path: '/home',
		title: 'Home',
		translateKey: 'nav.home',
		icon: 'home',
		type: NAV_ITEM_TYPE_ITEM,
		authority: [],
		subMenu: []
	},
	{
		key: 'users',
		path: '/users',
		title: 'Usuarios',
		icon: 'users',
		type: NAV_ITEM_TYPE_ITEM,
		authority: [ADMIN, ROOT],
		subMenu: []
	},
	{
		key: 'apps',
		path: '/apps',
		title: 'Aplicaciones',
		icon: 'apps',
		type: NAV_ITEM_TYPE_ITEM,
		authority: [ADMIN, ROOT],
		subMenu: []
	},
	{
		key: 'roles',
		path: '/roles',
		title: 'Roles',
		icon: 'roles',
		type: NAV_ITEM_TYPE_ITEM,
		authority: [ADMIN, ROOT],
		subMenu: []
	},
	{
		key: 'restrictions',
		path: '/restrictions',
		title: 'Restricciones',
		icon: 'restrictions',
		type: NAV_ITEM_TYPE_ITEM,
		authority: [ADMIN, ROOT],
		subMenu: []
	},
	{
		key: 'access',
		path: '/users-access',
		title: 'Accesos de usuario',
		icon: 'access',
		type: NAV_ITEM_TYPE_ITEM,
		authority: [ADMIN, ROOT],
		subMenu: []
	},
	{
		key: 'log',
		path: '/logs',
		title: 'Historial de actividad',
		icon: 'log',
		type: NAV_ITEM_TYPE_ITEM,
		authority: [ROOT],
		subMenu: []
	}
	/** Example purpose only, please remove */
	// {
	// 	key: 'singleMenuItem',
	// 	path: '/single-menu-view',
	// 	title: 'Single menu item',
	// 	translateKey: 'nav.singleMenuItem',
	// 	icon: 'singleMenu',
	// 	type: NAV_ITEM_TYPE_ITEM,
	// 	authority: [],
	// 	subMenu: []
	// },
	// {
	// 	key: 'collapseMenu',
	// 	path: '',
	// 	title: 'Collapse Menu',
	// 	translateKey: 'nav.collapseMenu.collapseMenu',
	// 	icon: 'collapseMenu',
	// 	type: NAV_ITEM_TYPE_COLLAPSE,
	// 	authority: [],
	// 	subMenu: [
	// 		{
	// 			key: 'collapseMenu.item1',
	// 			path: '/collapse-menu-item-view-1',
	// 			title: 'Collapse menu item 1',
	// 			translateKey: 'nav.collapseMenu.item1',
	// 			icon: '',
	// 			type: NAV_ITEM_TYPE_ITEM,
	// 			authority: [],
	// 			subMenu: []
	// 		},
	// 		{
	// 			key: 'collapseMenu.item2',
	// 			path: '/collapse-menu-item-view-2',
	// 			title: 'Collapse menu item 2',
	// 			translateKey: 'nav.collapseMenu.item2',
	// 			icon: '',
	// 			type: NAV_ITEM_TYPE_ITEM,
	// 			authority: [],
	// 			subMenu: []
	// 		},
	// 	]
	// },
	// {
	// 	key: 'groupMenu',
	// 	path: '',
	// 	title: 'Group Menu',
	// 	translateKey: 'nav.groupMenu.groupMenu',
	// 	icon: '',
	// 	type: NAV_ITEM_TYPE_TITLE,
	// 	authority: [],
	// 	subMenu: [
	// 		{
	// 			key: 'groupMenu.single',
	// 			path: '/group-single-menu-item-view',
	// 			title: 'Group single menu item',
	// 			translateKey: 'nav.groupMenu.single',
	// 			icon: 'groupSingleMenu',
	// 			type: NAV_ITEM_TYPE_ITEM,
	// 			authority: [],
	// 			subMenu: []
	// 		},
	// 		{
	// 			key: 'groupMenu.collapse',
	// 			path: '',
	// 			title: 'Group collapse menu',
	// 			translateKey: 'nav.groupMenu.collapse.collapse',
	// 			icon: 'groupCollapseMenu',
	// 			type: NAV_ITEM_TYPE_COLLAPSE,
	// 			authority: [],
	// 			subMenu: [
	// 				{
	// 					key: 'groupMenu.collapse.item1',
	// 					path: '/group-collapse-menu-item-view-1',
	// 					title: 'Menu item 1',
	// 					translateKey: 'nav.groupMenu.collapse.item1',
	// 					icon: '',
	// 					type: NAV_ITEM_TYPE_ITEM,
	// 					authority: [],
	// 					subMenu: []
	// 				},
	// 				{
	// 					key: 'groupMenu.collapse.item2',
	// 					path: '/group-collapse-menu-item-view-2',
	// 					title: 'Menu item 2',
	// 					translateKey: 'nav.groupMenu.collapse.item2',
	// 					icon: '',
	// 					type: NAV_ITEM_TYPE_ITEM,
	// 					authority: [],
	// 					subMenu: []
	// 				},
	// 			]
	// 		}
	// 	]
	// }
]

export default navigationConfig
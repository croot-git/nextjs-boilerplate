import { useRouter } from 'next/router';
import Link from 'next/link';
import { Menu } from 'components/UI';
import { MENU_MAP } from 'app/menu';

const { SubMenu } = Menu;

interface IMenuItem {
	path: string;
	title: string;
	description: string;
	children?: IMenuItem[];
}
function SiderMenu() {
	const router = useRouter();
	const pathname = router.pathname;
	const getMenuKey = (path: string) => path.replace(/\//g, '-');
	const getSubMenuKey = (path: string) => `sub${getMenuKey(path)}`;
	const getMenuItem = ({ path, title }: IMenuItem) => {
		return (
			<Menu.Item key={getMenuKey(path)}>
				<Link href={path} title={title}>
					{title}
				</Link>
			</Menu.Item>
		);
	};
	const getSubMenuItem = ({ path, title, children }: IMenuItem) => {
		return (
			<SubMenu key={getSubMenuKey(path)} title={title}>
				{children.map((child) => getMenuItem(child))}
			</SubMenu>
		);
	};
	const currentMenu: IMenuItem = MENU_MAP.find((item) => pathname.startsWith(item.path));
	let openedKey: string = null;
	let selectedKey: string = null;
	if (currentMenu?.path) {
		if (currentMenu.children?.length > 0) {
			const currentSubMenu = currentMenu.children.find((item) => item.path === pathname);
			openedKey = getSubMenuKey(currentMenu.path);
			selectedKey = getMenuKey(currentSubMenu.path);
		} else {
			openedKey = getMenuKey(currentMenu.path);
			selectedKey = getMenuKey(currentMenu.path);
		}
	}

	return (
		<>
			{selectedKey && openedKey && (
				<Menu defaultSelectedKeys={[selectedKey]} defaultOpenKeys={[openedKey]} theme="dark" mode="inline">
					{MENU_MAP.map((item) => (item.children?.length > 0 ? getSubMenuItem(item) : getMenuItem(item)))}
				</Menu>
			)}
		</>
	);
}

export default SiderMenu;

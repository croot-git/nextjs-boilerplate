import { useState } from 'react';
import Link from 'next/link';
import { Button, Badge, Avatar, Dropdown, Menu } from 'components/UI';
import { LogoutOutlined } from '@ant-design/icons';

function HeaderUserInfo() {
	const [alarmCount] = useState(0);
	const menu = (
		<Menu>
			<Menu.Item key="1">
				<Link href="/auth/logout">
					<Button type="link" danger icon={<LogoutOutlined />}>
						Logout
					</Button>
				</Link>
			</Menu.Item>
		</Menu>
	);

	return (
		<>
			<Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
				<Badge count={alarmCount} showZero>
					<Avatar shape="square">USER</Avatar>
				</Badge>
			</Dropdown>
		</>
	);
}

export default HeaderUserInfo;

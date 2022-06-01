import { css } from '@emotion/react';
import Logo from 'components/HeaderLogo';
import SiderMenu from 'components/SiderMenu';
import HeaderUserInfo from 'components/HeaderUserInfo';
import { Layout, Select, Input } from 'components/UI';

const LayoutStyle = css`
	height: 100vh;
`;
const HeaderStyle = css`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
const ContentStyle = css`
	overflow-y: auto;
`;

function DefaultContainer({ children }) {
	return (
		<Layout css={LayoutStyle}>
			<Layout.Sider breakpoint="lg" collapsedWidth={0}>
				<Logo />
				<SiderMenu />
			</Layout.Sider>
			<Layout>
				<Layout.Header css={HeaderStyle}>
					<Input addonBefore={<Select placeholder="Type" defaultValue="barcode" options={[{ value: 'barcode' }, { value: 'deviceId' }]} />} style={{ width: 450 }} />
					<HeaderUserInfo />
				</Layout.Header>
				<Layout.Content css={ContentStyle}>{children}</Layout.Content>
			</Layout>
		</Layout>
	);
}

export default DefaultContainer;

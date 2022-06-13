import { css } from '@emotion/react';
import Logo from 'components/HeaderLogo';
import Header from 'components/Header';
import SiderMenu from 'components/SiderMenu';
import { Layout } from 'components/UI';

const LayoutStyle = css`
	height: 100vh;
`;
const ContentStyle = css`
	overflow-y: hidden;
`;

function DefaultContainer({ children }) {
	return (
		<Layout css={LayoutStyle} hasSider={true}>
			<Layout.Sider breakpoint="lg" collapsedWidth="0">
				<Logo />
				<SiderMenu />
			</Layout.Sider>
			<Layout>
				<Header />
				<Layout.Content css={ContentStyle}>{children}</Layout.Content>
			</Layout>
		</Layout>
	);
}

export default DefaultContainer;

import { css } from '@emotion/react';
import HeaderUserInfo from 'components/HeaderUserInfo';
import { Layout, Select, Input } from 'components/UI';

const HeaderStyle = css`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

function Header() {
	return (
		<Layout.Header css={HeaderStyle}>
			<span />
			<HeaderUserInfo />
		</Layout.Header>
	);
}

export default Header;

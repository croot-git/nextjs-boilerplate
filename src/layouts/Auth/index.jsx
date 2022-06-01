import { css } from '@emotion/react';

const AuthContainerStyle = css`
	display: flex;
	width: 100vw;
	height: 100vh;
	justify-content: center;
	align-items: center;
`;

const AuthCenterBoxStyle = css`
	width: 320px;
	min-height: 320px;
	padding: 36px;
	box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
`;

function AuthLayout({ children }) {
	return (
		<div css={AuthContainerStyle}>
			<section css={AuthCenterBoxStyle}>{children}</section>
		</div>
	);
}

export default AuthLayout;

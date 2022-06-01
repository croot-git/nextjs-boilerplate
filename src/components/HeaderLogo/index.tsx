import { css } from '@emotion/react';

const LogoStyle = css`
	height: 32px;
	margin: 16px;
	background: rgba(255, 255, 255, 0.2);
	text-align: center;
	color: #fff;
	line-height: 32px;

	span {
		background-image: linear-gradient(90deg, orange, yellow, lime, skyblue, white);
		-webkit-background-clip: text;
		color: transparent;
		font-weight: 200;
		letter-spacing: 1px;
	}
`;

function Logo() {
	return (
		<h1 css={LogoStyle}>
			<span>Mommybox Admin</span>
		</h1>
	);
}

export default Logo;

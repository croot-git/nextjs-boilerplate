import { css } from '@emotion/react';

const ErrorWrapperStyle = css`
	background: url('/images/big/bg.jpg') center/cover no-repeat;
`;

function ErrorContainer({ children }) {
	return <div css={ErrorWrapperStyle}>{children}</div>;
}

export default ErrorContainer;

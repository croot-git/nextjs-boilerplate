import { Spin } from 'components/UI';
import { LoadingOutlined } from '@ant-design/icons';

// export const Div_Container = styled.div`
// 	display: flex;
// 	width: 100vw;
// 	height: 100vh;
// 	justify-content: center;
// 	align-items: center;
// `;

function Loading() {
	return (
		<>
			<div>
				<Spin indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />} />
			</div>
		</>
	);
}

export default Loading;

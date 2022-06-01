import { useEffect, useState } from 'react';
import { Form, Input, Button, Modal, Typography } from 'components/UI';
import { CheckOutlined, LockOutlined } from '@ant-design/icons';

const NewPasswordPage = () => {
	const [pending, setPending] = useState(false);

	const handleFormSubmit = async ({ username, password, remember }) => {
		setPending(true);
		try {
		} catch ({ code, name, message, stack }) {
			console.log(stack);
			Modal.error({
				title: name,
				content: message
			});
		} finally {
			setPending(false);
		}
	};

	return (
		<>
			<Typography.Title level={3}>New Password</Typography.Title>
			<Form name="NewPassword" onFinish={handleFormSubmit}>
				<Form.Item name="password" rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}>
					<Input prefix={<LockOutlined />} type="password" placeholder="새 비밀번호" />
				</Form.Item>
				<Form.Item
					name="passwordRe"
					rules={[
						{ required: true, message: '비밀번호를 입력해주세요!' },
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('The two passwords that you entered do not match!'));
							}
						})
					]}
				>
					<Input prefix={<CheckOutlined />} type="password" placeholder="새 비밀번호 확인" />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" loading={pending}>
						로그인
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default NewPasswordPage;

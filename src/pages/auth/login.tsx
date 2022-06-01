import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Input, Button, Checkbox, Modal } from 'components/UI';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Layout from 'layouts/Auth';
import useAuth from 'hooks/authHooks';
import { RootState } from 'store';

interface ILoginForm {
	username: string;
	password: string;
	remember: boolean;
}

const LoginPage = () => {
	const auth = useAuth();
	const pending = useSelector((state: RootState) => state.auth.status === 'loading');
	const [username, setUsername] = useState('');
	const remember = useMemo(() => !!username, [username]);

	const handleRemember = (remember, username) => {
		if (remember) {
			localStorage.setItem('login.remember', username);
		} else {
			localStorage.removeItem('login.remember');
		}
	};

	const handleSignIn = async ({ username, password, remember }: ILoginForm) => {
		handleRemember(remember, username);
		auth.login({ username, password });
	};

	useEffect(() => {
		setUsername(localStorage.getItem('login.remember'));
	}, []);

	return (
		<>
			<Form name="LogIn" initialValues={{ username, remember }} onFinish={handleSignIn}>
				<Form.Item name="username" rules={[{ required: true, message: '아이디를 입력해주세요!' }]}>
					<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="아이디" />
				</Form.Item>
				<Form.Item name="password" rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}>
					<Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="비밀번호" />
				</Form.Item>
				<Form.Item name="remember" valuePropName="checked">
					<Checkbox>Remember me</Checkbox>
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
LoginPage.Layout = Layout;

export default LoginPage;

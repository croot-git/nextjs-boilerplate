import { useRouter } from 'next/router';
import { useEffect } from 'react';
function AuthPage() {
	const router = useRouter();

	useEffect(() => {
		router.replace('/auth/login');
	}, []);

	return <></>;
}

export default AuthPage;

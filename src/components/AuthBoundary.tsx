import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { check } from 'app/auth';
import useAuth from 'hooks/authHooks';
import { RootState } from 'store';

function AuthProvider({ children }) {
	const router = useRouter();
	const auth = useAuth();
	const status = useSelector((state: RootState) => state.auth.status);
	const authInfo = useSelector((state: RootState) => state.auth.data);
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const isLoginPage = () => router.pathname === '/auth/login';

	useEffect(() => {
		if (status === 'loading') {
			setIsChecked(true);
		}

		if (isChecked) {
			if (status === 'failed' && !isLoginPage()) {
				// const from = router.pathname;
				// router.push(`/auth/login?from=${from}`);
				router.push(`/auth/login`);
			} else if (status === 'idle' && isLoginPage()) {
				router.push(`/`);
			}
		}
	}, [status]);

	useEffect(() => {
		auth.check();
	}, [router.pathname]);

	return (isLoginPage() || (isChecked && status === 'idle')) && children;
}

export default AuthProvider;

require('../styles/globals.css');
require('../styles/antd.less');

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
//redux + saga
import withReduxSaga from 'next-redux-saga';
import StoreWrapper from 'app/store';
//CustomBoundary
import ErrorBoundary from 'components/ErrorBoundary';
import AuthBoundary from 'components/AuthBoundary';
//layout
import DefaultLayout from 'layouts/Default';
import AuthLayout from 'layouts/Auth';
//i18n
import InternaltionalProvider from 'contexts/internalization';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

function getLayout(pathname: string) {
	const authPathList = ['/auth/admin/create', '/auth/login', '/auth/newPassword', '/auth/forgotPassword'];
	if (authPathList.includes(pathname)) {
		return AuthLayout;
	}
	return DefaultLayout;
}

function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const Layout = getLayout(router.pathname);

	return (
		<InternaltionalProvider>
			<ErrorBoundary>
				<AuthBoundary>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</AuthBoundary>
			</ErrorBoundary>
		</InternaltionalProvider>
	);
}

export default StoreWrapper.withRedux(withReduxSaga(App));

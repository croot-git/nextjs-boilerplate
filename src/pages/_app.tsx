import '../styles/globals.css';
import 'antd/dist/antd.css';
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
import { IntlProvider } from 'react-intl';
import koLangPack from 'locales/ko-KR';
import enLangPack from 'locales/en-US';
import idLangPack from 'locales/id-ID';
//Amplify
import { Amplify } from 'aws-amplify';
Amplify.configure({
	aws_project_region: process.env.NEXT_PUBLIC_AWS_REGION,
	aws_appsync_graphqlEndpoint: process.env.NEXT_PUBLIC_AWS_APPSYNC_GRAPHQL_ENDPOINT,
	aws_appsync_region: process.env.NEXT_PUBLIC_AWS_APPSYNC_REGION,
	aws_appsync_authenticationType: process.env.NEXT_PUBLIC_AWS_APPSYNC_AUTHENTICATION_TYPE,
	aws_appsync_apiKey: process.env.NEXT_PUBLIC_AWS_APPSYNC_APIKEY,
	Auth: {
		mandatorySignIn: true,
		region: process.env.NEXT_PUBLIC_AWS_REGION,
		userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID,
		userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_APP_CLIENT_ID
	},
	Storage: {
		AWSS3: {
			bucket: process.env.NEXT_PUBLIC_AWS_S3_ULTRASOUND_BUCKET,
			region: process.env.NEXT_PUBLIC_AWS_REGION
		}
	}
});

function getLayout(pathname: string) {
	const authPathList = ['/auth/login', '/auth/newPassword', '/auth/forgotPassword'];
	if (authPathList.includes(pathname)) {
		return AuthLayout;
	}
	return DefaultLayout;
}

function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const Layout = getLayout(router.pathname);
	const locale = router.locale || 'ko-KR';
	const messages = { 'en-US': enLangPack, 'ko-KR': koLangPack, 'id-ID': idLangPack }[locale];

	return (
		<IntlProvider locale={locale} messages={messages} onError={() => null}>
			<ErrorBoundary>
				<AuthBoundary>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</AuthBoundary>
			</ErrorBoundary>
		</IntlProvider>
	);
}

export default StoreWrapper.withRedux(withReduxSaga(App));

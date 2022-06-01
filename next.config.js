module.exports = (phase, { defaultConfig }) => {
	/**
	 * @type {import('next').NextConfig}
	 */
	const nextConfig = {
		ssr: false,
		i18n: {
			locales: ['ko-KR', 'en-US', 'id-ID'],
			defaultLocale: 'ko-KR',
			localeDetection: true
		},
		env: {
			// CRA 환경 변수 -> nextjs 환경 변수 전환
			NEXT_PUBLIC_NODE_ENV: process.env.REACT_APP_NODE_ENV,
			NEXT_PUBLIC_AWS_REGION: process.env.REACT_APP_AWS_REGION,
			NEXT_PUBLIC_AWS_APPSYNC_GRAPHQL_ENDPOINT: process.env.REACT_APP_AWS_APPSYNC_GRAPHQL_ENDPOINT,
			NEXT_PUBLIC_AWS_APPSYNC_REGION: process.env.REACT_APP_AWS_APPSYNC_REGION,
			NEXT_PUBLIC_AWS_APPSYNC_AUTHENTICATION_TYPE: process.env.REACT_APP_AWS_APPSYNC_AUTHENTICATION_TYPE,
			NEXT_PUBLIC_AWS_APPSYNC_APIKEY: process.env.REACT_APP_AWS_APPSYNC_APIKEY,
			NEXT_PUBLIC_AWS_USER_POOL_ID: process.env.REACT_APP_AWS_USER_POOL_ID,
			NEXT_PUBLIC_AWS_APP_CLIENT_ID: process.env.REACT_APP_AWS_APP_CLIENT_ID,
			NEXT_PUBLIC_AWS_API_ENDPOINT: process.env.REACT_APP_AWS_API_ENDPOINT,
			NEXT_PUBLIC_AWS_API_KEY: process.env.REACT_APP_AWS_API_KEY
		}
	};
	return nextConfig;
};

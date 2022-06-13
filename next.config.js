/**
 * @type {import('next').NextConfig}
 */
 const withAntdLess = require('next-plugin-antd-less');

 module.exports = (phase, { defaultConfig }) => {
	 const nextConfig = {
		 ssr: false,
		 i18n: {
			 locales: ['ko-KR', 'en-US'],
			 defaultLocale: 'ko-KR',
			 localeDetection: true
		 },
		 env: {
			 // CRA 환경 변수 -> nextjs 환경 변수 전환
			 NEXT_PUBLIC_NODE_ENV: process.env.REACT_APP_NODE_ENV
		 }
	 };
 
	 return withAntdLess({
		 lessVarsFilePath: './src/styles/antd.less',
		 ...nextConfig,
		 webpack: (config) => config
	 });
 };
 
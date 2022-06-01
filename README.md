# 프로젝트 구축 히스토리

## next.js + typescript 설치

```bash
npx create-next-app@latest --ts
# or
yarn create next-app --typescript
```

```tsx
/* types/index.d.ts */

interface IState {
	status: 'idle' | 'loading' | 'failed';
	data: any;
	error: null;
	[x: string | number | symbol]: unknown;
}
```

## next-intl 설치

```bash
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { IntlProvider } from 'react-intl';
import koLangPack from 'locales/ko-KR';
import enLangPack from 'locales/en-US';
import idLangPack from 'locales/id-ID';

function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const locale = router.locale || 'ko-KR';
	const messages = { 'en-US': enLangPack, 'ko-KR': koLangPack, 'id-ID': idLangPack }[locale];

	return (
		<IntlProvider locale={locale} messages={messages} onError={() => null}>
			<Component {...pageProps} />
		</IntlProvider>
	);
}

export App;
```

```bash
yarn add react-intl
```

## styled-components 설치

```bash
yarn add styled-components
#for TS
yarn add @types/styled-components
```

### (optional) SSR babel 추가 설정

<aside>
💡 SSR 사용 시, CSR환경에서 생성한 class명과 SSR환경에서 생성한 class명이 일치하지 않아 에러가 발생함.
이를 해결하기 위해 추가적인 babel설정이 필요함.

</aside>

```bash
yarn add -D babel-plugin-styled-components
```

```json
/* Filename: .babelrc */
{
	"presets": ["next/babel"],
	"plugins": [
		[
			"styled-components",
			{
				"ssr": true,
				"displayName": true,
				"preprocess": false
			}
		]
	]
}
```

### (optional) global, reset 설정

```bash
yarn add styled-reset
```

```tsx
/* styles/global.ts */

import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
export const GlobalStyle = createGlobalStyle`
    ${reset}
    html {
        box-sizing: border-box;
        font-size: 62.5%;
        min-width: 320px;
    }
    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }
    * { font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif';}
    a { cursor: pointer; text-decoration: none; }
`;
```

```tsx
/* pages/_app.tsx */

import type { AppProps } from 'next/app';
import { GlobalStyle } from '../styles/global';

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<GlobalStyle />
			<Component {...pageProps} />
		</>
	);
}

export default App;
```

### (optional) 테마 설정

```tsx
/* styles/theme.ts */

import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
	breakPoint: '769px',

	colors: {
		black: '#1e1f1d',
		yellow: '#edb83c',
		orange: '#eb7952',
		gray: '#6e6e6e',
		gray_background: '#f5f5f5'
	}
};
```

```tsx
/* pages/_app.tsx */

import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { GlobalStyle } from '../styles/global';

function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default App;
```

## Emotion 설치

```bash
yarn add @emotion/react @emotion/styled
yarn add --dev @emotion/babel-plugin
yarn add --dev @emotion/babel-preset-css-prop
```

### (optional) CSS Props 설정

```json
{
	"compilerOptions": {
		//...
		"jsxImportSource": "@emotion/react"
	}
	//...
}
```

```json
{
	"presets": [
		[
			"next/babel",
			{
				"preset-react": {
					"runtime": "automatic",
					"importSource": "@emotion/react"
				}
			}
		]
	],
	"plugins": [["@emotion/babel-plugin"]]
}
```

### (optional) global, reset 설정

```bash
yarn add emotion-reset
```

```tsx
/* styles/global.ts */

import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/react';

render(
	<Global
		styles={css`
			${emotionReset}

			*, *::after, *::before {
				box-sizing: border-box;
				-moz-osx-font-smoothing: grayscale;
				-webkit-font-smoothing: antialiased;
				font-smoothing: antialiased;
			}
		`}
	/>
);
```

```tsx
/* pages/_app.tsx */

import type { AppProps } from 'next/app';
import { GlobalStyle } from '../styles/global';

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<GlobalStyle />
			<Component {...pageProps} />
		</>
	);
}

export default App;
```

### (optional) 테마 설정

공식문서: [https://emotion.sh/docs/theming](https://emotion.sh/docs/theming)

```tsx
/* styles/theme.ts */

import { Theme } from '@emotion/react';

export const theme: Theme = {
	colors: {
		black: '#1e1f1d',
		yellow: '#edb83c',
		orange: '#eb7952',
		gray: '#6e6e6e',
		gray_background: '#f5f5f5'
	}
};
```

```tsx
/* pages/_app.tsx */

import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../styles/theme';
import { GlobalStyle } from '../styles/global';

function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default App;
```

## ant design 설치

```bash
yarn add antd
```

```tsx
/* pages/_app.tsx */

import 'antd/dist/antd.css';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default App;
```

## redux + toolkit 설치

```bash
yarn add react-redux
#Optional
yarn add @reduxjs/toolkit
#for SSR
yarn add next-redux-wrapper
#for TS
yarn add --dev @types/react-redux
```

```tsx
/* app/store.ts */

import type { Store } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import RootReducer from 'store/modules';

// redux store 및 redux-saga 미들웨어 설정
const makeStore = () => {
	const isDev = process.env.NODE_ENV === 'development';
	const store = configureStore({
		reducer: RootReducer,
		devTools: isDev
	});

	return store;
};
const Wrapper = createWrapper(makeStore, {
	debug: process.env.NODE_ENV === 'development'
});

export default Wrapper;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = ReturnType<AppStore['dispatch']>;
```

```tsx
/* pages/_app.tsx */

import type { AppProps } from 'next/app';
import StoreWrapper from 'app/store';

function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default StoreWrapper.withRedux(App);
```

## redux-saga 설치

```bash
$ yarn add redux-saga
#for SSR
$ yarn add next-redux-saga
#for TS
$ yarn add --dev @types/next-redux-saga
```

```tsx
/* app/sagas.ts */

import { all, call, fork } from 'redux-saga/effects';
import { AuthSaga } from 'store/modules/auth/authSaga';

export default function* rootSaga() {
	yield all([fork(AuthSaga)]);
}
```

```tsx
/* app/store.ts */

import type { Store } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import RootReducer from 'store';
import createSagaMiddleware, { Task } from 'redux-saga';
import rootSaga from './sagas';

// Next Redux Toolkit Saga를 사용할때는
// confugureStore에서 강제로 sagaTask를 만들어주기 위함
interface SagaStore extends Store {
	sagaTask?: Task;
}

// redux store 및 redux-saga 미들웨어 설정
const makeStore = () => {
	const isDev = process.env.NODE_ENV === 'development';
	const sagaMiddleware = createSagaMiddleware();
	const store = configureStore({
		reducer: RootReducer,
		middleware: [sagaMiddleware],
		devTools: isDev
	});

	(store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
	return store;
};
const Wrapper = createWrapper(makeStore, {
	debug: process.env.NODE_ENV === 'development'
});

export default Wrapper;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = ReturnType<AppStore['dispatch']>;
```

```tsx
/* pages/_app.tsx */

import type { AppProps } from 'next/app';
import StoreWrapper from 'app/store';
import withReduxSaga from 'next-redux-saga';

function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default StoreWrapper.withRedux(withReduxSaga(App));
```

## Debugger

- 빈 .babelrc 파일이 존재 할 경우 아래와 같은 에러가 발생.
  ```bash
  error - ./node_modules/next/dist/client/dev/amp-dev.js
  SyntaxError: JSON5: invalid end of input at 1:1
  ```

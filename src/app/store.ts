import type { Store } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware, { Task } from 'redux-saga';
import RootReducer from 'store';
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

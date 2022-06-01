import { takeLatest, call, put } from 'redux-saga/effects';
import type { CognitoUser } from '@aws-amplify/auth';
import { Auth } from 'aws-amplify';
import { Login, LoginSuccess, LoginFailure, Check, CheckSuccess, CheckFailure, Logout, LogoutSuccess, LogoutFailure } from './authSlice';

// Fetch 정의.
export interface IFetchLoginPayload {
	username: string;
	password: string;
}
async function fetchLogin({ username, password }: IFetchLoginPayload) {
	return await Auth.signIn(username, password);
}

async function fetchCheck(bypassCache = true) {
	return await Auth.currentAuthenticatedUser({
		bypassCache
	});
}

async function fetchLogout() {
	return await Auth.signOut();
}

// Saga 정의.
interface ILoginSagaPayload {
	type: string;
	payload: IFetchLoginPayload;
}
const LoginSaga = function* ({ payload }: ILoginSagaPayload) {
	try {
		const result: CognitoUser = yield call(fetchLogin, payload);
		yield put({
			type: LoginSuccess,
			data: result
		});
	} catch (error) {
		yield put({
			type: LoginFailure,
			error
		});
	}
};

const CheckSaga = function* () {
	try {
		const result: CognitoUser = yield call(fetchCheck);
		yield put({
			type: CheckSuccess,
			data: result
		});
	} catch (error) {
		yield put({
			type: CheckFailure,
			error
		});
	}
};

const LogoutSaga = function* () {
	try {
		yield call(fetchLogout);
		yield put({
			type: LogoutSuccess,
			data: null
		});
	} catch (error) {
		yield put({
			type: LogoutFailure,
			error
		});
	}
};

export function* AuthSaga() {
	yield takeLatest(Login, LoginSaga);
	yield takeLatest(Check, CheckSaga);
	yield takeLatest(Logout, LogoutSaga);
}

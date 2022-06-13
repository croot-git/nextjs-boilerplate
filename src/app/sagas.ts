import { all, call, fork } from 'redux-saga/effects';
import { AuthSaga } from 'store/modules/auth/authSaga';

export default function* rootSaga() {
	yield all([fork(AuthSaga)]);
}

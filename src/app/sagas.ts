import { all, call, fork } from 'redux-saga/effects';
import { AuthSaga } from 'store/modules/auth/authSaga';
// import countrySaga from 'store/modules/country/countrySlice';
// import hospitalSaga from 'store/modules/hospital/hospitalSlice';

export default function* rootSaga() {
	yield all([fork(AuthSaga)]);
}

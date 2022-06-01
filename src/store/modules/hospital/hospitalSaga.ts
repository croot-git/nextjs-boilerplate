import { all, call, fork, delay, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { loadHospital, loadHospitalSuccess, loadHospitalFailure } from './hospitalSlice';
import { fetchHospital } from './hospitalAPI';

function* getHospitalList() {
	try {
		const { data } = yield call(fetchHospital);
		console.log(data);
		yield put({
			type: loadHospitalSuccess,
			data: data
		});
	} catch (error) {
		yield put({
			type: loadHospitalFailure,
			error
		});
	}
}

export default function* hospitalSaga() {
	yield takeLatest(loadHospital, getHospitalList);
}

import { all, call, fork, delay, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { loadCountry, loadCountrySuccess, loadCountryFailure } from './countrySlice';
import { fetchCountry } from './countryAPI';

function* getCountryList() {
	try {
		const { data } = yield call(fetchCountry);
		console.log(data);
		yield put({
			type: loadCountrySuccess,
			data: data
		});
	} catch (error) {
		yield put({
			type: loadCountryFailure,
			error
		});
	}
}

export default function* countrySaga() {
	yield takeLatest(loadCountry, getCountryList);
}

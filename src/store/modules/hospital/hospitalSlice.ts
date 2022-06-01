import { createSlice } from '@reduxjs/toolkit';
import { makeReducers } from 'libs/sagaUtils';

export interface IState {
	status: 'idle' | 'loading' | 'failed';
	data: any;
	error: null;
	[x: string | number | symbol]: unknown;
}
interface IInitialState extends IState {
	data: Hospital[];
}

const initialState: IInitialState = {
	status: 'idle',
	data: [],
	error: null
};

const loadHospitalReducers = makeReducers('loadHospital', {
	successCallback: (state: IInitialState, { data }) => {
		state.data = data;
	}
});

const hospitalSlice = createSlice({
	name: 'country',
	initialState,
	reducers: {
		...loadHospitalReducers
	}
});

// export const hospitalList = (state: AppState) => state.hospital.data;
// export const roomList =
// 	(state: AppState) =>
// 	(hospitalCode: string): Room[] =>
// 		state.hospital.data.find((item: Hospital) => item.hospitalCode === hospitalCode)?.rooms;

export const { loadHospital, loadHospitalSuccess, loadHospitalFailure } = hospitalSlice.actions;

export const hospitalReducer = hospitalSlice.reducer;

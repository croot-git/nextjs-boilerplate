import { createSlice } from '@reduxjs/toolkit';
import { makeReducers } from 'libs/sagaUtils';
import type { AppState } from 'app/store';
import type { ISagaState, Country } from '@types';

interface IState extends ISagaState {
	data: Country[];
	currentCountryCode: string;
}

const initialState: IState = {
	status: 'idle',
	data: [],
	error: null,
	currentCountryCode: 'kor'
};

const loadCountryReducers = makeReducers('loadCountry');
const addCountryReducers = makeReducers('addCountry');

const countrySlice = createSlice({
	name: 'country',
	initialState,
	reducers: {
		...loadCountryReducers,
		...addCountryReducers
		// removeCountry: (state, { payload }) => {},
		// removeCountrySuccess: (state, { payload }) => {},
		// removeCountryFailure: (state, action: PayloadAction<number, string, never, any>) => {},
		// updateCountry: (state, { payload }) => {},
		// updateCountrySuccess: (state, { payload }) => {},
		// updateCountryFailure: (state, action: PayloadAction<number, string, never, any>) => {},
		// // Area
		// addArea: (state, { payload }) => {},
		// addAreaSuccess: (state, { payload }) => {},
		// addAreaFailure: (state, action: PayloadAction<number, string, never, any>) => {},
		// removeArea: (state, { payload }) => {},
		// removeAreaSuccess: (state, { payload }) => {},
		// removeAreaFailure: (state, action: PayloadAction<number, string, never, any>) => {},
		// updateArea: (state, { payload }) => {},
		// updateAreaSuccess: (state, { payload }) => {},
		// updateAreaFailure: (state, action: PayloadAction<number, string, never, any>) => {}
	}
});

export const selectCountry =
	(countryCode: string) =>
	({ country }: AppState) =>
		country.data.find((item: Country) => item.countryCode === countryCode);

export const { loadCountry, loadCountrySuccess, loadCountryFailure, addCountry, addCountrySuccess, addCountryFailure } = countrySlice.actions;
export const countryReducer = countrySlice.reducer;

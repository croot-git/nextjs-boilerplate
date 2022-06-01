import { combineReducers } from '@reduxjs/toolkit';
import { AuthReducer } from './modules/auth/authSlice';
// import { CountryReducer } from './auth/countrySlice';
// import { HospitalReducer } from './auth/hospitalSlice';

// Store state 타입 참조를 위해 생성.
const rootReducer = combineReducers({
	auth: AuthReducer
	// country: CountryReducer,
	// hospital: HospitalReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

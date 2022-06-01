import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CognitoUser } from '@aws-amplify/auth';
import { IFetchLoginPayload } from './authSaga';

// State 확장 예시
interface InitState extends IState {
	data: CognitoUser | null;
}
// Store 생성.
const initialState: InitState = {
	status: 'idle',
	data: null,
	error: null
};

interface IAuthReducerPayload {
	type: string;
	payload: CognitoUser;
}
// Slice 정의.
const authSlice = createSlice({
	name: 'Auth',
	initialState,
	reducers: {
		Login: (state: InitState, { payload }: PayloadAction<IFetchLoginPayload>) => {
			state.status = 'loading';
		},
		LoginSuccess: (state: InitState, { payload }: IAuthReducerPayload) => {
			state.status = 'idle';
			state.data = payload;
		},
		LoginFailure: (state: InitState, payload) => {
			state.status = 'failed';
			console.log(payload);
		},
		Check: (state: InitState) => {
			state.status = 'loading';
		},
		CheckSuccess: (state: InitState, { payload }: IAuthReducerPayload) => {
			state.status = 'idle';
			state.data = payload;
		},
		CheckFailure: (state: InitState, payload) => {
			state.status = 'failed';
			console.log(payload);
		},
		Logout: (state: InitState) => {
			state.status = 'loading';
		},
		LogoutSuccess: (state: InitState) => {
			state.status = 'idle';
			state.data = null;
		},
		LogoutFailure: (state: InitState, payload) => {
			state.status = 'failed';
			console.log(payload);
		}
	}
});

// Action 선언.
export const {
	Login,
	LoginSuccess,
	LoginFailure,
	Check,
	CheckSuccess,
	CheckFailure,
	Logout,
	LogoutSuccess,
	LogoutFailure
	// ForgotPassword,
	// NewPassword
} = authSlice.actions;

export const AuthReducer = authSlice.reducer;

export default authSlice;

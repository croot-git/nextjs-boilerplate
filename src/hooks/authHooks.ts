import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from 'app/store';
import { Login, Check, Logout } from 'store/modules/auth/authSlice';
import { IFetchLoginPayload } from 'store/modules/auth/authSaga';
import { RootState } from 'store';

// 커스텀 훅
export default function useAuth() {
	const userInfo = useSelector((state: RootState) => state.auth.data);
	const dispatch = useDispatch();

	const check = useCallback(() => {
		dispatch(Check());
	}, []);

	const login = useCallback(({ username, password }: IFetchLoginPayload) => {
		dispatch(Login({ username, password }));
	}, []);

	const logout = useCallback(() => {
		dispatch(Logout());
	}, []);

	return { userInfo, login, check, logout };
}

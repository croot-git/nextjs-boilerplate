import type { CognitoUser } from '@aws-amplify/auth';
import { Auth, Cache } from 'aws-amplify';

export const login = async ({ username, password }) => {
	try {
		const result: CognitoUser = await Auth.signIn(username, password);
		Cache.setItem('UserInfo', result);
		return result;
	} catch (error) {
		Cache.setItem('UserInfo', null);
		throw error;
	}
};

export const check = async (bypassCache = true) => {
	try {
		const result: CognitoUser = await Auth.currentAuthenticatedUser({
			bypassCache
		});
		Cache.setItem('UserInfo', result);
		return result;
	} catch (error) {
		Cache.setItem('UserInfo', null);
		throw error;
	}
};

export const logout = async () => {
	return await Auth.signOut();
};

export const forgotPassword = async ({ username }) => {
	return await Auth.forgotPassword(username);
};

export const newPassword = async ({ username, code, password }) => {
	return await Auth.forgotPasswordSubmit(username, code, password);
};

export default {
	check,
	login,
	logout,
	forgotPassword,
	newPassword
};

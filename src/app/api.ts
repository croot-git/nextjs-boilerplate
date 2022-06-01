import { Amplify, Auth, API, graphqlOperation } from 'aws-amplify';

const RESTAPI_NAME = 'gateway';
Amplify.configure({
	API: {
		endpoints: [
			{
				name: RESTAPI_NAME,
				endpoint: process.env.REACT_APP_AWS_API_ENDPOINT,
				region: process.env.REACT_APP_AWS_APPSYNC_REGION,
				custom_header: async () => {
					return {
						Authorization: (await Auth.currentSession()).getAccessToken().getJwtToken()
					};
				}
			}
		]
	}
});

// Graphql 용 Client
export const GraphqlClient = async (operation: any, variables?: object) => {
	const header = {};
	const token = (await Auth.currentSession()).getAccessToken().getJwtToken();
	try {
		const result = await API.graphql(graphqlOperation(operation, variables, token), header);
		return result;
	} catch (result) {
		if (Array.isArray(result.errors)) {
			if (result.errors.some((i) => i.message === 'Request failed with status code 401')) {
			} else {
				throw result.errors;
			}
		} else {
			throw result;
		}
	}
};

type TMethod = typeof API.head;
async function restClientMiddleware(method: TMethod, path: string, body: Body, header: Headers) {
	try {
		const result = await method.call(API, RESTAPI_NAME, path, { body, header });
		return result;
	} catch (error) {
		console.log(error);
		if (error?.response?.data) {
			throw [error.response.data];
		} else {
			throw error;
		}
	}
}

// RESTful API 용 Client
export const RestClient = (function () {
	const header = {};
	return {
		get: (path: string, body?: Body, header?: Headers) => restClientMiddleware(API.get, path, body, header),
		post: (path: string, body?: Body, header?: Headers) => restClientMiddleware(API.post, path, body, header),
		put: (path: string, body?: Body, header?: Headers) => restClientMiddleware(API.put, path, body, header),
		patch: (path: string, body?: Body, header?: Headers) => restClientMiddleware(API.patch, path, body, header),
		del: (path: string, body?: Body, header?: Headers) => restClientMiddleware(API.del, path, body, header),
		head: (path: string, body?: Body, header?: Headers) => restClientMiddleware(API.head, path, body, header)
	};
})();

export default {
	Graphql: GraphqlClient,
	Rest: RestClient
};

/**
 * Error object protocol (초안)
 *
 * {
 * 	 data: any, // (Optional)
 * 	 errors: [  // (Required)
 *     {
 *       message: string, // (Required)
 *       ...
 *     }
 *   ]
 * }
 **/

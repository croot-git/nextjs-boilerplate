interface IState {
	status: 'idle' | 'loading' | 'failed';
	data: any;
	error: null;
	[x: string | number | symbol]: unknown;
}

interface NextPageWithLayout extends NextPage {
	Layout?: ReactNode;
}
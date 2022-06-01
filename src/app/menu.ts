export const MENU_MAP = [
	{
		path: '/member',
		title: '사용자 관리',
		description: '사용자 관리 페이지입니다.',
		children: [
			{
				path: '/member/list',
				title: '사용자 목록',
				description: '사용자 목록 페이지입니다.'
			}
		]
	},
	{
		path: '/country',
		title: '국가 관리',
		description: '국가 관리 페이지입니다.',
		children: [
			{
				path: '/country/list',
				title: '국가/지역 목록',
				description: '국가/지역 목록 페이지입니다.'
			}
		]
	},
	{
		path: '/hospital',
		title: '병원 관리',
		description: '병원 관리 페이지입니다.',
		children: [
			{
				path: '/hospital/list',
				title: '병원 목록',
				description: '병원 목록 페이지입니다.'
			}
		]
	},
	{
		path: '/mommybox',
		title: '마미박스 관리',
		description: '마미박스 관리 페이지입니다.',
		children: [
			{
				path: '/mommybox/monitoring',
				title: '마미박스 모니터링',
				description: '마미박스 모니터링 페이지입니다.'
			},
			{
				path: '/mommybox/list',
				title: '마미박스 목록',
				description: '마미박스 목록 페이지입니다.'
			},
			{
				path: '/mommybox/history',
				title: '마미박스 히스토리',
				description: '마미박스 히스토리 페이지입니다.'
			}
		]
	},
	{
		path: '/recording',
		title: '영상 관리',
		description: '영상 관리 페이지입니다.',
		children: [
			{
				path: '/recording/list',
				title: '영상 목록',
				description: '영상 목록 페이지입니다.'
			}
		]
	}
];

// TODO :: 냄새 남
export const getCurrentMenuData = (pathname) => {
	if (typeof pathname !== 'string') return [];

	const pathSnippets = pathname.split('/').filter((i) => i);
	const main = MENU_MAP.find((item) => item.path === `/${pathSnippets[0]}`) ?? null;
	const sub = main?.children ? main.children.find((item) => item.path === pathname) : null;

	return [main, sub];
};

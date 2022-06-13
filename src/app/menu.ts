export const MENU_MAP = [
	{
		path: '/',
		title: '메인페이지',
		description: '메인페이지입니다.'
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

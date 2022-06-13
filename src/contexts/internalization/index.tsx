import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import koLangPack from 'locales/ko-KR';
import enLangPack from 'locales/en-US';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import 'dayjs/locale/en';
import 'dayjs/locale/id';

function InternalizationContext({ children }) {
	const router = useRouter();
	const locale = router.locale || 'ko-KR';
	const shortLocale = () => {
		switch (locale.toLowerCase()) {
			case 'ko-kr':
				return 'ko';
			case 'en-US':
				return 'en';
			default:
				'ko';
		}
	};
	const messages = { 'en-US': enLangPack, 'ko-KR': koLangPack }[locale];
	dayjs.locale(shortLocale());

	return (
		<IntlProvider locale={locale} messages={messages} onError={() => null}>
			{children}
		</IntlProvider>
	);
}

export default InternalizationContext;

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


/**
 * @component
 * @description Скролл вверх при переходе на новую страницу
 */
export const ScrollToTop = () => {

	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
};

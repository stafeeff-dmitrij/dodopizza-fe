import { Outlet } from 'react-router-dom';

import { MainMenu, TopBar } from '../../components/menu';
import { Header } from '../../components/Header';


/**
 * @component
 * @description Обертка-шаблон для каталога товаров
 */
export function Layout() {

	return (
		<>
			<TopBar/>
			<Header hasSearch={true}/>
			<MainMenu/>
			<Outlet/>
		</>
	);
}
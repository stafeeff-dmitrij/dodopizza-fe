import { Outlet } from 'react-router-dom';

import { Header } from '../components/layout';
import { Menu, TopBar } from '../components/menu';


/**
 * @component
 * @description Обертка-шаблон для каталога товаров
 */
export function Catalog() {

	return (
		<>
			<TopBar/>
			<Header hasSearch={true}/>
			<Menu/>
			<Outlet/>
		</>
	);
}
import { Outlet } from 'react-router-dom';

import { MainMenu, TopBar } from '../../components/menu';
import { Header } from '../../components/Header';
import { ProductModal } from '../../features/product/components';


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
			<ProductModal/>
		</>
	);
}
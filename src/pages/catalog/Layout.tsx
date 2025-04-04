import { Outlet } from 'react-router-dom';

import { MainMenu, TopBar } from '../../components/menu';
import { Header } from '../../components/header';
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
			<MainMenu className='mb-3'/>
			<Outlet/>
			<ProductModal/>
		</>
	);
}
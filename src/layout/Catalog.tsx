import { Outlet } from 'react-router-dom';

import { Header } from '../components/layout';
import { TopBar } from '../components/menu';


/**
 * @component
 * @description Обертка-шаблон с header
 */
export function Catalog() {
	return (
		<div>
			<TopBar/>
			<Header hasSearch={true} />
			<Outlet/>
		</div>
	);
}
import { Outlet } from 'react-router-dom';

import { Header } from '../components/layout';
import { TopBar } from '../components/menu';


/**
 * @component
 * @description Обертка-шаблон с header
 */
export function Main() {
	return (
		<div className="px-5">
			<TopBar/>
			<Header hasSearch={true} hasCart={true} />
			<Outlet/>
		</div>
	);
}
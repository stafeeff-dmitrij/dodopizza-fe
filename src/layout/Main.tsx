import { Outlet } from 'react-router-dom';

import { Header, TopBar } from '../components/layout';


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
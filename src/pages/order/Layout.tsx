import { Outlet } from 'react-router-dom';

import { Container } from '../../components/layout';


/**
 * @component
 * @description Обертка-шаблон для заказов
 */
export function Layout() {
	return (
		<>
			<Container>
				<Outlet/>
			</Container>
		</>
	);
}
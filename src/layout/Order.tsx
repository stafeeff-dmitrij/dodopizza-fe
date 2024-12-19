import { Outlet } from 'react-router-dom';

import { Container } from '../components/layout';


/**
 * @component
 * @description Обертка-шаблон для заказов
 */
export function Order() {
	return (
		<div>
			<Container>
				<Outlet/>
			</Container>
		</div>
	);
}
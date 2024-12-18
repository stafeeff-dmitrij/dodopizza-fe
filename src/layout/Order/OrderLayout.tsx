import { Outlet } from 'react-router-dom';

import Container from '../../components/layout/Container/Container.tsx';


/**
 * @component
 * @description Обертка-шаблон для заказов
 */
export function OrderLayout() {
	return (
		<div className="wrapper">
			<Container>
				<Outlet/>
			</Container>
		</div>
	);
}
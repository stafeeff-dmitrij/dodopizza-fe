import { Outlet } from 'react-router-dom';

import Container from '../../components/layout/Container/Container.tsx';
import Header from '../../components/layout/Header/Header.tsx';

/**
 * @component
 * @description Обертка-шаблон с header
 */
export function MainLayout() {
	return (
		<div className="wrapper">
			<Container>
				<Header/>
				<Outlet/>
			</Container>
		</div>
	);
}
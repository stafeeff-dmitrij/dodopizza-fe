import { Container } from '../components/layout';
import { Title } from '../components/typography';


/**
 * @component
 * @description Главная страница с каталогом товаров
 */
export function Catalog() {
	return (
		<div>
			<Container className="py-10 px-5">
				<Title text="Главная страница" size="xl"/>
				<p>Здесь будет каталог товаров</p>
			</Container>
		</div>
	);
}

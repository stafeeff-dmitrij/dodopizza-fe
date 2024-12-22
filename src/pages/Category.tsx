import { useParams } from 'react-router-dom';

import { Title } from '../components/typography';
import { Container } from '../components/layout';


/**
 * @component
 * @description Страница конкретной категории с товарами
 */
export function Category() {

	const { id } = useParams();

	return (
		<div>
			<Container>
				<Title text={`Категория #${id}`} size="xl"/>
				<p>Здесь будут товары категории №{id}</p>
			</Container>
		</div>
	);
}

import { useParams } from 'react-router-dom';

import { Title } from '../../components/typography';
import { Container } from '../../components/layout';


/**
 * @component
 * @description Страница товара
 */
export function Product() {

	const { id } = useParams();

	return (
		<Container>
			<Title text={`Товар #${id}`} size="xl"/>
			<p>Здесь будет описание товара...</p>
		</Container>
	);
}

import { useParams } from 'react-router-dom';

import { Title } from '../../components/ui/Title/Title.tsx';


/**
 * @component
 * @description Страница товара
 */
export function ProductPage() {

	const { id } = useParams();

	return (
		<div>
			<Title text={`Товар #${id}`} size="xl"/>
			<p>Здесь будет описание товара...</p>
		</div>
	);
}

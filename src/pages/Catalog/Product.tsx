import { useParams } from 'react-router-dom';

import { Title } from '../../components/typography';
import { Container } from '../../components/layout';
import { useGetDetailProductQuery } from '../../redux/api/productApi.ts';


/**
 * @component
 * @description Страница товара
 */
export function Product() {

	const { id } = useParams();
	const { data, isLoading, isSuccess, isError } = useGetDetailProductQuery({ product_id: Number(id) });

	if (isLoading) {
		return <p>Загрузка...</p>;
	}

	if (isError) {
		return <p>Ошибка!</p>;
	}

	if (isSuccess) {
		return (
			<Container>
				<Title text={data.name} size="xl"/>
				<p>Здесь будет описание товара...</p>
			</Container>
		);
	}

}

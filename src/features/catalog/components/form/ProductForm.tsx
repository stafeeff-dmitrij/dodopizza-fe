import React from 'react';

import { useGetDetailProductQuery } from '../../../../redux/api/productApi.ts';
import { Title } from '../../../../components/typography';


interface Props {
	productId: number;
	closeModal?: () => void;
}

/**
 * @component
 * @description Форма выбора товара
 *
 * @prop {number} productId - id товара
 * @prop {function} closeModal - функция закрытия модального окна
 */
export const ProductForm: React.FC<Props> = ({ productId, closeModal }) => {

	const { data, isLoading, isSuccess, isError } = useGetDetailProductQuery({ product_id: productId });


	if (isLoading) {
		return <p>Загрузка...</p>;
	}

	if (isError) {
		return <p>Ошибка!</p>;
	}

	if (isSuccess) {
		return (
			<>
				<Title text={data.name} size="xl"/>
				<p>Здесь будет форма товара...</p>
			</>
		);
	}
};
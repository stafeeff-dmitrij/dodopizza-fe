import React, { useState } from 'react';

import { Title } from '../../../components/typography';
import { useGetFilterProductsQuery } from '../../../redux/api';
import { cn, getErrorToast } from '../../../lib';
import { ProductsList } from '../../catalog/components';
import { Product } from '../../../redux/api/productApi.ts';
import { getShuffleArray } from '../../catalog/utils';


interface Props {
	ignoreProductId?: number;
	categoryId: number;
	count: number;
	className?: string;
}

/**
 * @component
 * @description Блок с рекомендациями товаров
 *
 * @prop ignoreProductId - id товара для исключения из выборки
 * @prop categoryId - id категории товаров
 * @prop count - кол-во товаров для отображения
 */
export const RecommendationProducts: React.FC<Props> = ({
  ignoreProductId,
	categoryId,
	count,
	className,
}) => {

	const { data, isLoading, isSuccess, isError, error } = useGetFilterProductsQuery({ category_id: categoryId, page_size: count });

	const [products, setProducts] = useState<Product[]>([]);

	// случайное перемешивание товаров + убрать из перечня товаров товар с указанным id
	React.useEffect(() => {
		if (data?.results) {
			const randomProducts = getShuffleArray(data.results);

			if (ignoreProductId) {
				setProducts(randomProducts.filter(product => product.id !== ignoreProductId));
			} else {
				setProducts(randomProducts);
			}
		}
	}, [data?.results, ignoreProductId])

	if (isError) {
		getErrorToast('Произошла ошибка!');
		console.error(error);
	}

	// TODO Добавить лоадер
	if (isLoading) {
		return <p>Идет загрузка...</p>
	}

	if (isSuccess) {
		return (
			<div className={className}>
				<Title text='Рекомендации' size='lg' className='mb-6 text-[24px]' />
				<ProductsList
					products={products.slice(0, count)}
					className={cn('grid-flow-col gap-10 overflow-auto pb-6', products.length >= 4 && `grid-cols-${count}`)}
				/>
			</div>
		);
	}
}
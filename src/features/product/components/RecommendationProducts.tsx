import React, { useState } from 'react';

import { Title } from '../../../components/typography';
import { useGetFilterProductsQuery } from '../../../redux/api';
import { cn } from '../../../lib';
import { ProductsList } from '../../catalog/components';
import { Product } from '../../../redux/api/productApi.ts';
import { getShuffleArray } from '../../catalog/utils';
import { ProductListSkeleton } from '../../catalog/components/products';


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

	const { data, isLoading, isSuccess, isError } = useGetFilterProductsQuery({ category_id: String(categoryId), page_size: count });
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
		return null;
	}

	return (
		<div className={className}>
			<Title text='Рекомендации' size='lg' className='mb-6 text-[24px]' />
			{isLoading && <ProductListSkeleton count={4} className='gap-x-10 pb-6'/>}
			{isSuccess && <ProductsList
				products={products.slice(0, count)}
				className={cn('grid-flow-col gap-10 overflow-auto pb-6', products.length >= 4 && `grid-cols-${count}`)}
			/>}
		</div>
	);
}
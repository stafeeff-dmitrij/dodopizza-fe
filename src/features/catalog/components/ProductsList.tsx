import React from 'react';

import { cn } from '../../../lib';
import { Product } from '../../../redux/api/productApi.ts';
import { ProductCard } from './ProductCard.tsx';


interface Props {
	products: Product[];
	className?: string;
}

/**
 * @component
 * @description Блок с товарами
 */
export const ProductsList: React.FC<Props> = ({
	products,
	className,
}) => {
	return (
		<div className={cn('grid grid-cols-4 gap-x-8 gap-y-14', className)}>
			{products.map((product) => (
				<ProductCard
					key={product.id}
					id={product.id}
					name={product.name}
					description={product.description}
					image={product.image}
					price={300}
					count={product.count}
				/>
			))}
		</div>
	);
};
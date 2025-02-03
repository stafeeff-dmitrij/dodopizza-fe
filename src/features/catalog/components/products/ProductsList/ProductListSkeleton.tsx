import React from 'react';

import { cn } from '../../../../../lib';
import { ProductCardSkeleton } from '../ProductCard/ProductCardSkeleton.tsx';

interface Props {
	count: number;
	className?: string;
}

/**
 * @component
 * @description Лоадер для блока с товарами
 *
 * @prop count - кол-во отображаемых лоадеров для карточек
 */
export const ProductListSkeleton: React.FC<Props> = ({ count, className }) => {
	return (
		<div className={cn('grid grid-cols-4 gap-x-8 gap-y-14', className)}>
			{
				[...Array(count)].map((_, index) =>
					<ProductCardSkeleton key={index}/>
				)
			}
		</div>
	);
}

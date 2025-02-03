import React from 'react';

import { cn } from '../../../../../lib';
import { Skeleton } from '../../../../../components/ui';

interface Props {
	className?: string;
}

/**
 * @component
 * @description Лоадер для карточки товара
 */
export const ProductCardSkeleton: React.FC<Props> = ({ className }) => {
	return (
		<div
			className={cn('flex flex-col justify-between w-[233px] cursor-pointer', className)}
		>
			<div className="flex flex-col mb-3.5">
				<img
					className="w-[233px] h-[233px] self-center transition-transform duration-300 hover:translate-y-1"
					src='/images/icons/not-product.svg'
					alt='Изображение товара'
				/>
				<Skeleton className={'h-7 w-40 mb-3 mt-2'}/>
				{
					[...Array(5)].map((_, index) =>
						<Skeleton
							key={index}
							className={'h-3.5 w-full mb-1.5'}
						/>
					)
				}
			</div>
			<div className="flex justify-between items-center">
				<Skeleton className={'h-6 w-[59px]'}/>
				<Skeleton className={'h-10 w-[118px] rounded-3xl'}/>
			</div>
		</div>
	);
};
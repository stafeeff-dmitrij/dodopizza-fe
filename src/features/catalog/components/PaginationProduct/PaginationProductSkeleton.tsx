import React from 'react';

import { cn } from '../../../../lib';
import { Skeleton } from '../../../../components/ui';


interface Props {
	className?: string;
}

/**
 * @component
 * @description Лоадер для пагинации товаров
 */
export const PaginationProductSkeleton: React.FC<Props> = ({ className }) => {

	return (
		<div className={cn('mx-auto flex gap-2 w-full', className)}>
			<Skeleton className={'h-10 w-[136px] rounded-3xl'}/>
			{
				[...Array(3)].map((_, index) =>
					<Skeleton key={index} className={'h-10 aspect-square rounded-full'}/>
				)
			}
			<Skeleton className={'h-10 w-[136px] rounded-3xl'}/>
		</div>
	);
};

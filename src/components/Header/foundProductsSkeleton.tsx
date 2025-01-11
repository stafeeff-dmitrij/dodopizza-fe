import React from 'react';

import { cn } from '../../lib';
import { Skeleton } from '../ui';

interface Props {
	className?: string;
}

/**
 * @component
 * @description Лоадер для блока с найденными товарами
 */
export const FoundProductsSkeleton: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('flex flex-col', className)}>
			{
				[...Array(5)].map((_, index) =>
					<div
						className="flex items-center gap-3 w-full px-4 py-1.5"
						key={index}
					>
						<Skeleton className="w-10 aspect-square rounded-full"/>
						<Skeleton className="h-5 w-[70%] rounded-3xl"/>
						<Skeleton className="ml-auto h-5 w-14 rounded-3xl"/>
					</div>
				)
			}
		</div>
	);
};
import React from 'react';

import { cn } from '../../lib';
import { Skeleton } from '../ui';

interface Props {
	className?: string;
}

/**
 * @component
 * @description Лоадер для меню категорий
 */
export const MenuSkeleton: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('inline-flex gap-5 p-1', className)}>
			{
				[...Array(8)].map((_, index) =>
					<Skeleton
						key={index}
						className={'h-5 w-16'}
					/>)
			}
		</div>
	);
};
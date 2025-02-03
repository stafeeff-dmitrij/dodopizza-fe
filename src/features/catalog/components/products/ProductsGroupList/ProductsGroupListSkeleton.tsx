import React from 'react';

import { Skeleton } from '../../../../../components/ui';
import { ProductListSkeleton } from '../ProductsList/ProductListSkeleton.tsx';

interface Props {
	className?: string;
}

/**
 * @component
 * @description Лоадер для блока с товарами категории
 */
export const ProductsGroupListSkeleton: React.FC<Props> = ({ className }) => {
	return (
		<div className={className}>
			<div className='flex items-center justify-between h-[55px] mb-8 border-b border-slate-100'>
				<Skeleton className={'h-10 w-40 ml-4 rounded-3xl'}/>
				<Skeleton className={'h-8 w-36 mr-4 rounded-3xl'}/>
			</div>
			<ProductListSkeleton count={8}/>
		</div>
	);
};
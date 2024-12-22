import React from 'react';

import { Category } from '../../redux/api/categoryApi.ts';
import { cn } from '../../lib';
import { useSelector } from 'react-redux';
import { selectActiveId } from '../../redux/slices/crossCategorySlice.ts';


interface Props {
	categories: Category[];
	className?: string;
}

/**
 * @component
 * @description Блок с категориями товаров
 *
 * @prop {Category[]} categories - категории товаров
 */
export const Categories: React.FC<Props> = ({ categories, className }) => {

	const { activeId } = useSelector(selectActiveId);

	return (
		<div className={cn('inline-flex gap-5 p-1', className)}>
			{categories.map(({ id, name }) => (
				<a
					key={id}
					href={`/#${name}`}
					className={cn(
						'flex items-center gap-x-1.5 font-medium text-[13px] text-black hover:text-primary transition duration-300',
						activeId === id && 'text-primary',
					)}
				>
					{name}
				</a>
				)
			)}
		</div>
	)
		;
};
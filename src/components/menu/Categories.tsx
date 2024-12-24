import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { cn } from '../../lib';
import { Category } from '../../redux/api/categoryApi.ts';
import { selectActiveId } from '../../redux/slices/crossCategorySlice.ts';
import { LinkMenu } from '../shared';


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

	const { pathname } = useLocation();
	const { id } = useParams();
	const { activeId } = useSelector(selectActiveId);

	return (
		<div className={cn('inline-flex gap-5 p-1', className)}>
			{categories.map((category) => (
				pathname === '/'
					? <a
						key={category.id}
						href={`/#${category.name}`}
						className={cn(
							'flex items-center gap-x-1.5 font-medium text-[13px] text-black text-center hover:text-primary transition duration-300',
							activeId === category.id && 'text-primary',
						)}
					>
						{category.name}
					</a>
					: <LinkMenu
						key={category.id}
						link={`category/${category.id}`}
						name={category.name}
						className={cn(id && activeId === category.id && 'text-primary')}
					/>
			))}
		</div>
	);
};
import React from 'react';

import { CategoryProps } from '../../redux/api/categoryApi.ts';
import { cn } from '../../lib';
import { LinkMenu } from '../shared';


interface Props {
	categories: CategoryProps[];
	className?: string;
}

/**
 * @component
 * @description Блок с категориями товаров
 *
 * @prop {CategoryProps[]} categories - категории товаров
 */
export const Categories: React.FC<Props> = ({ categories, className }) => {
	return (
		<div className={cn('inline-flex gap-5 p-1', className)}>
			{categories.map(({ id, name }) => (
				<LinkMenu
					key={id}
					link={`category/${id}`}
					name={name}
				/>
			))}
		</div>
	);
};
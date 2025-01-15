import React from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui';
import { cn } from '../../../lib';


interface Props {
	className?: string;
}

/**
 * @component
 * @description Выбор сортировки товаров

 // * @prop totalPages - общее кол-во страниц
 // * @prop currentPage - текущая страница
 // * @prop setCurrentPage - смена текущей страницы
 */
export const SelectSort: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn("flex rounded-[8px] ", className)}>
			<Select>
				<SelectTrigger className='pl-5'>
					<SelectValue placeholder="Сортировка" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="popular">по популярности</SelectItem>
					<SelectItem value="price">по стоимости</SelectItem>
					<SelectItem value="name">по наименованию</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};
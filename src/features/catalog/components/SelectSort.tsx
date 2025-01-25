import React from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui';
import { cn } from '../../../lib';
import { sortType } from '../hooks/useFiltersParams.ts';


interface Props {
	value?: sortType;
	setValue: (value: sortType) => void;
	className?: string;
}

/**
 * @component
 * @description Выбор сортировки товаров

 * @prop value - значение сортировки
 * @prop setValue - сменить значение сортировки
 */
export const SelectSort: React.FC<Props> = ({ value, setValue, className }) => {
	return (
		<div className={cn("flex rounded-[8px] ", className)}>
			<Select onValueChange={setValue} value={value}>
				<SelectTrigger className='pl-5'>
					<SelectValue placeholder="Сортировка" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="popular" disabled={true}>по популярности</SelectItem>
					<SelectItem value="price">по стоимости</SelectItem>
					<SelectItem value="name">по наименованию</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};
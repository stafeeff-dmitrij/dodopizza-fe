import React from 'react';

import { FilterCheckbox, FilterCheckboxProps } from './FilterCheckbox.tsx';
import { Input, Skeleton } from '../../../../components/ui';
import { cn } from '../../../../lib';
import { X } from 'lucide-react';


type Item = FilterCheckboxProps;

interface Props {
	name?: string;
	title: string;
	items: Item[];
	defaultItems?: Item[];
	limit?: number;
	searchInputPlaceholder?: string;
	onClickCheckbox?: (id: string) => void;
	defaultValue?: string[];
	loading?: boolean;
	selectedValues: Set<string>;
	sizeVisible: boolean;
	className?: string;
}

/**
 * @component
 * @description Блок с группами чекбоксов
 *
 * @prop name - наименование чекбокса (для уникальности checkbox-а, чтобы не было совпадений с другими на странице)
 * @prop title - заголовок для группы чекбоксов
 * @prop items - все доступные чекбоксы (при раскрытом списке)
 * @prop defaultItems - чекбоксы по умолчанию (при нераскрытом списке)
 * @prop limit - кол-во чекбоксов выводимых по умолчанию
 * @prop searchInputPlaceholder - placeholder для инпута для поиска чекбокса по названию
 * @prop onClickCheckbox - выбрать чекбокс
 * @prop loading - статус загрузки
 * @prop selectedValues - набор (множество) отмеченных значений
 * @prop sizeVisible - видимость кол-ва отмеченных элементов
 */
export const CheckboxFiltersGroup: React.FC<Props> = ({
	name,
	title,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = 'Поиск...',
	onClickCheckbox,
	loading,
	selectedValues,
	sizeVisible = false,
	className,
}) => {

	const [showAll, setShowAll] = React.useState(false);
	const [searchValue, setSearchValue] = React.useState('');

	if (loading) {
		return (
			<div className={className}>
				<p className="font-bold mb-3">{title}</p>
				{...Array(limit)
					.fill(0)
					.map((_, index) => <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />)}
				<Skeleton className="w-28 h-5 mb-4 rounded-[8px]" />
			</div>
		);
	}

	const ingredients = showAll
		// все переданные и отфильтрованные по названию ингредиенты
		? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase()))
		// ингредиенты по умолчанию
		: (defaultItems || items).slice(0, limit);

	return (
		<div className={className}>
			<div className="flex gap-1">
				<p className="font-bold mb-3">{title}</p>
				{sizeVisible && selectedValues.size > 0 && <p>({selectedValues.size})</p>}
			</div>

			{/* инпут поиска ингредиентов по наименованию */}
			{showAll && (
				<div className="relative mb-5">
					<Input
						className="px-5 rounded-[12px] bg-gray-50 focus:border-primary"
						value={searchValue}
						placeholder={searchInputPlaceholder}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
					{searchValue &&
						<X
							className='absolute top-1/2 translate-y-[-50%] right-3 h-4 text-gray-400 cursor-pointer transition duration-300 hover:text-gray-500'
							onClick={() => setSearchValue('')}
						/>
					}
				</div>
			)}

			<div className="flex flex-col gap-4 max-h-96 mb-4 pr-2 overflow-auto scrollbar">
				{ingredients.map((item, index) => (
					<FilterCheckbox
						key={index}
						text={item.text}
						value={item.value}
						children={item.children}
						checked={selectedValues?.has(item.value)}  // вернет true, если value (id чекбокса) есть в selectedIds
						onCheckedChange={() => onClickCheckbox?.(item.value)}
						name={name}
					/>
				))}
			</div>

			{items.length > limit && (
				<div className={cn({['border-t border-t-neutral-100']: showAll})}>
					<button onClick={() => setShowAll(!showAll)} className="mt-3 text-[16px] text-primary hover:text-[#ED5D08]">
						{showAll ? 'Скрыть' : 'Показать все'}
					</button>
				</div>
			)}
		</div>
	);
};
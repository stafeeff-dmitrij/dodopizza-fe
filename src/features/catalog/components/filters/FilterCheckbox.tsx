import React from 'react';

import { Checkbox } from '../../../../components/ui/checkbox.tsx';


export interface FilterCheckboxProps {
	name?: string;
	text: string;
	value: string;
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	children?: React.ReactNode;
}

/**
 * @component
 * @description Чекбокс для фильтрации товаров
 *
 * @prop name - наименование чекбокса (для уникальности checkbox-а, чтобы не было совпадений с другими на странице)
 * @prop text - текст чекбокса
 * @prop value - значение
 * @prop checked - статус активности чекбокса
 * @prop onCheckedChange - смена активности чекбокса
 * @prop children - дочерний компонент (н-р, иконка)
 */
export const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
	name,
	text,
	value,
	checked,
	onCheckedChange,
	children,
}) => {
	return (
		<div className="flex items-center space-x-2">
			<Checkbox
				onCheckedChange={onCheckedChange}
				checked={checked}
				value={value}
				className="rounded-[8px] w-[22px] h-[22px]"
				id={`checkbox-${String(name)}-${String(value)}`}
			/>
			<label htmlFor={`checkbox-${String(name)}-${String(value)}`} className="leading-none cursor-pointer flex-1 text-[14px] transition-all duration-400 hover:font-medium">
				{text}
			</label>
			{children}
		</div>
	);
};
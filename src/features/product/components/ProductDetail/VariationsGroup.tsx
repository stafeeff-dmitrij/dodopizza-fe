import React from 'react';

import { cn } from '../../../../lib';
import { TPizzaSize, TPizzaType } from '../../../catalog/constants.ts';



export type Variant = {
	// id: number;
	name: string;
	value: string;
	// disabled?: boolean;
};

interface Props {
	variants: Variant[];
	value: TPizzaSize | TPizzaType;
	// onClick?: (value: Variant['value']) => void;  // функция для смены типа вариации (передаем value выбранной новой вариации)
	// value?: Variant['value'];
	className?: string;
}

/**
 * @component
 * @description Блок с селекторами выбора размера и типа пиццы
 *
 * @prop {Variant[]} variants - вариации товара
 * @prop {number | string} value - значение текущей выбранной вариации
 // * @prop {function} onClick - функция для смены типа вариации
 // * @prop {string} value - значение текущего выбранной вариации
 */
// export const VariationsGroup: React.FC<Props> = ({ variations, onClick, className, value }) => {
export const VariationsGroup: React.FC<Props> = ({ variants, value, className }) => {

	return (
		<div className={cn(className, 'flex justify-between bg-[#F3F3F7] rounded-3xl p-[2px] select-none')}>
			{variants.map((variant) => (
				<button
					key={variant.name}
					// onClick={() => onClick?.(variant.value)}
					className={cn(
						'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-xs hover:font-medium',
						{
							// для текущей активной вариации свои стили
							'bg-white shadow': variant.value == value,
							// для недоступной (деактивированной) вариации свои стили
							// 'text-gray-500 opacity-50 pointer-events-none': variant.disabled,
						},
					)}
				>
					{variant.name}
				</button>
			))}
		</div>
	);
};
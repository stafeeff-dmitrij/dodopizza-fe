import React from 'react';

import { cn } from '../../../../lib';
import { TPizzaSize, TPizzaType } from '../../constants.ts';


export type Variant = {
	name: string;
	value: string;
	disabled?: boolean;
};

interface Props {
	variants: Variant[];
	value: TPizzaSize | TPizzaType;
	onClick?: (value: Variant['value']) => void;  // смена типа вариации
	className?: string;
}

/**
 * @component
 * @description Блок с селекторами выбора размера и типа пиццы
 *
 * @prop {Variant[]} variants - вариации товара
 * @prop {number | string} value - значение текущей выбранной вариации
 * @prop {function} onClick - смена типа вариации
 */
export const VariationsGroup: React.FC<Props> = ({ variants, value, onClick, className }) => {

	return (
		<div className={cn('flex justify-between bg-[#F3F3F7] rounded-3xl p-[2px] select-none', className)}>
			{variants.map((variant) => (
				// внешний div для совмещения свойств cursor-not-allowed и pointer-events-none
				<div key={variant.name} className={cn('flex items-center justify-center flex-1', {'cursor-not-allowed': variant.disabled,})}>
					<button
						onClick={() => onClick?.(variant.value)}
						className={cn(
							'flex-1 h-[30px] px-5 rounded-3xl cursor-pointer transition-all duration-400 text-xs hover:font-medium',
							{
								'bg-white shadow': variant.value == value, // активная вариация
								'text-gray-500 opacity-50 pointer-events-none': variant.disabled,  // заблокированная кнопка
							},
						)}
					>
						{variant.name}
					</button>
				</div>
			))}
		</div>
	);
};
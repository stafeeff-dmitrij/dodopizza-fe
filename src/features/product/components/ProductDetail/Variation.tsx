import React from 'react';

import { cn } from '../../../../lib';
import { TProductValue } from '../../constants.ts';


export type Variant = {
	name: string;
	value: TProductValue;
};

interface Props {
	variant: Variant;
	className?: string;
}

/**
 * @component
 * @description Блок с вариацией товара
 *
 * @prop {Variant} variant - вариация товара
 */
export const Variation: React.FC<Props> = ({ variant, className }) => {
	return (
		<div className={cn('flex justify-between bg-[#F3F3F7] rounded-3xl p-[2px] select-none', className)}>
			<div className='flex items-center justify-center flex-1'>
				<button
					className={cn(
						'flex-1 h-[30px] px-5 rounded-3xl cursor-pointer transition-all duration-400 text-xs hover:font-medium',
					)}
				>
					{variant.name}
				</button>
			</div>
		</div>
	);
};
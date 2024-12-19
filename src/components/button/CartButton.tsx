import React from 'react';
import { ArrowRight, ShoppingCart } from 'lucide-react';

import { Button } from '../ui';
import { cn } from '../../lib';


interface Props {
	className?: string;
}

/**
 * @component
 * @description Кнопка корзины
 */
export const CartButton: React.FC<Props> = ({ className }) => {

	const loading = false;

	return (
		<Button
			loading={loading}
			className={cn('group relative rounded-full', { 'w-[105px]': loading }, className)}
		>
			<b>500 ₽</b>
			<span className="h-full w-[1px] bg-white/30 mx-3"/>
			<div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
				<ShoppingCart size={16} className="relative" strokeWidth={2}/>
				<b>5</b>
			</div>
			<ArrowRight
				size={20}
				className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
			/>
		</Button>
	);
};
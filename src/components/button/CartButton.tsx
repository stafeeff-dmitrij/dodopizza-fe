import React from 'react';
import { ArrowRight, ShoppingCart } from 'lucide-react';

import { Button } from '../ui';
import { cn } from '../../lib';
import { TextSnippet } from '../typography';


interface Props {
	className?: string;
}

/**
 * @component
 * @description Кнопка корзины
 */
export const CartButton: React.FC<Props> = ({ className }) => {

	const loading = false;
	const count = 2;

	return (
		<Button
			loading={loading}
			className={cn('group relative rounded-full', { 'w-[140px]': loading }, className)}
		>
			{count
				? <TextSnippet text='500 ₽'/>
				: <TextSnippet text='Корзина'/>
			}
			<span className="h-full w-[1px] bg-white/30 mx-1.5"/>
			<div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
				<ShoppingCart size={16} className="relative" strokeWidth={2}/>
				<TextSnippet text='5'/>
			</div>
			<ArrowRight
				size={20}
				className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
			/>
		</Button>
	);
};
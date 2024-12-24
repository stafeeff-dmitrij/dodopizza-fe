import React from 'react';

import { Title } from '../typography';
import { Button } from '../ui';
import { cn } from '../../lib';


interface Props {
	id: number;
	name: string;
	description: string;
	price: number;
	image: string;
	count: number;
	className?: string;
}

/**
 * @component
 * @description Карточка товара
 *
 * @prop {number} id - id товара
 * @prop {string} name - название товара
 * @prop {string} description - описание товара
 * @prop {string} image - URL изображения
 * @prop {number} count - кол-во товара
 * @prop {number} price - стоимость товара
 */
export const ProductCard: React.FC<Props> = ({ name, description, image, price, count, className }) => {
	return (
		<div className={cn('flex flex-col justify-between min-w-[233px]', className)}>
			<div>
				<img className="w-[233px] h-[233px] transition-transform duration-300 hover:translate-y-1" src={image} alt={name}/>
				<Title text={name} size="sm" className="mb-2 mt-2 font-normal"/>
				<p className="mb-4 text-sm font-normal text-[#73798C]">
					{description}
				</p>
			</div>
			<div className="flex justify-between items-center">
				<span className="text-[16px] font-semibold">
					от <b>{price} ₽</b>
				</span>
				{count > 0
					? <Button variant="secondary" className="px-7 py-2 text-[16px] font-normal">
						Выбрать
					</Button>
					: <Button variant="light" disabled={true} className="px-5 py-2 text-[16px] font-normal">
						Закончился
					</Button>
				}
			</div>
		</div>
	);
};
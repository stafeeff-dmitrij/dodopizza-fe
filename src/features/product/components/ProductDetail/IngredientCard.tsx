import React from 'react';
import { CircleCheck } from 'lucide-react';

import { cn } from '../../../../lib';

interface Props {
	id: number;
	name: string;
	image: string;
	price: number;
	active?: boolean;
	// onClick?: () => void;
	className?: string;
}

/**
 * @component
 * @description Карточка ингредиента
 *
 * @prop {number} id - id ингредиента
 * @prop {string} image - URL изображения ингредиента
 * @prop {string} name - наименование ингредиента
 * @prop {number} price - стоимость ингредиента
 * @prop {boolean} active - флаг активности (выбора) ингредиента
 // * @prop {function} onClick - функция для выбора доп. ингредиента
 */
export const IngredientCard: React.FC<Props> = ({
	id,
	name,
	image,
	price,
	active,
	// onClick,
	className,
}) => {
	return (
		<div
			className={cn(
				'flex flex-col items-center justify-between p-2 rounded-md w-[106px] text-center relative cursor-pointer shadow-[0px_4px_20px_rgba(6,5,50,0.12)] bg-white transition duration-200 hover:shadow-[0px_0px_8px_rgba(6,5,50,0.12)]',
				{ 'border border-primary': active },
				className,
			)}
			// onClick={onClick}
		>
			<div className="flex flex-col">
				{active && <CircleCheck className="absolute top-2 right-2 text-primary" />}
				<img className='mb-1' width={88} height={88} src={image} alt={name} />
				<span className="w-[95%] text-xs font-normal mb-1">{name}</span>
			</div>
			<span className="text-base font-normal">{price} ₽</span>
		</div>
	);
};
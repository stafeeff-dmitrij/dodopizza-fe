import React from 'react';

import { cn } from '../../lib';
import { Link } from 'react-router-dom';
import { Product } from '../../redux/api/productApi.ts';
import { FoundProductsSkeleton } from './foundProductsSkeleton.tsx';


interface Props {
	loading: boolean;
	focused: boolean;
	products: Product[];
	clearResult: () => void;
	className?: string;
}

/**
 * @component
 * @description Всплывающий блок с найденными товарами

 * @prop loading - статус загрузки
 * @prop focused - статус фокуса на инпуте
 * @prop products - найденные товары
 * @prop clearResult - очистка результатов поиска
 */
export const FoundProducts: React.FC<Props> = ({ loading, focused, products, clearResult, className }) => {
	return (
		<>
			<div
				className={cn(
					'absolute w-full bg-white rounded-xl py-2.5 top-14 overflow-hidden shadow-md transition-all duration-200 invisible opacity-0 z-30',
					focused && 'visible opacity-100 top-12',
					className,
				)}>

				{/* лоадер */}
				{loading && <FoundProductsSkeleton/>}

				{/* если нет товаров */}
				{!loading && !products.length &&
					<div className="flex items-center gap-3 w-full px-4">
						<span className='ml-2 text-[15px]'>Ничего не найдено ...</span>
					</div>
				}

				{/* товары */}
				{!loading && products && products.map(product => (
					<Link
						className="flex items-center gap-3 w-full px-4 py-1.5 hover:bg-secondary"
						key={product.id}
						to={`/product/${product.id}`}
						onClick={clearResult}
					>
						<img className="w-10 aspect-square rounded-sm" src={product.image} alt={product.name} />
						<span className='text-[15px]'>{product.name}</span>
						<span className="ml-auto text-[13px]">
								{product.variations_have && 'от '}
							<b className="text-[15px]">{product.min_price} ₽</b>
							</span>
					</Link>
				))}
			</div>
		</>
	);
};
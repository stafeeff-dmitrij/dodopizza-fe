import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useIntersection } from 'react-use';

import { AppDispatch } from '../../../redux/store.ts';
import { setActiveId } from '../../../redux/slices/categorySlice.ts';
import { Title } from '../../../components/typography';
import { ProductsList } from './ProductsList.tsx';
import { Product } from '../../../redux/api/productApi.ts';


interface Props {
	title: string;
	categoryId: number;
	products: Product[];
	className?: string;
}

/**
 * @component
 * @description Блок с товарами конкретной категории
 *
 * @prop {number} categoryId - id категории
 * @prop {string} title - наименование категории
 * @prop {Array} products - товары
 */
export const ProductsGroupList: React.FC<Props> = ({
	title,
	categoryId,
	products,
	className,
}) => {

	const dispatch = useDispatch<AppDispatch>()

	const crossRef = React.useRef<HTMLDivElement>(null);

	// @ts-ignore
	// пример из документации - https://streamich.github.io/react-use/?path=/story/sensors-useintersection--docs
	const cross = useIntersection(crossRef, {
		threshold: [0.3, 0.5],
	});

	// изменение активной категории при скролле
	React.useEffect(() => {
		// если intersection в зоне видимости экрана
		if (cross?.isIntersecting) {
			dispatch(setActiveId(categoryId));
		}
	}, [categoryId, cross?.isIntersecting, title]);

	return (
		// через ref навешивает на блок intersectionRef + задаем id блоку для автоматического скролла до нужного блока по id текущей активной категории
		<div className={className} id={title} ref={crossRef}>
			<Link to={`category/${categoryId}`}>
				<Title text={title} size="lg" className="font-medium mb-8 hover:text-primary transition duration-300"/>
			</Link>
			<ProductsList products={products} />
		</div>
	);
};
import React from 'react';

import { Product } from '../../redux/api/categoryApi.ts';
import { Title } from '../typography';
import { ProductCard } from '../card';


interface Props {
	title: string;
	categoryId: number;
	products: Product[];
	className?: string;
}

/**
 * @component
 * @description Блок с товарами одной категории
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

	// достаем и сохраняем из состояния функцию по изменению активной категории
	// const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

	// через useRef создаем объект для дальнейшего навешивания его на HTML-элемент для отслеживания и прокрутки к нему в зависимости от текущей категории
	// const intersectionRef = React.useRef(null);
	// как в документации https://streamich.github.io/react-use/?path=/story/sensors-useintersection--docs используем intersectionRef в хуке useIntersection
	// const intersection = useIntersection(intersectionRef, {
	// 	threshold: 0.4,
	// });

	// изменение активной категории при скролле
	// React.useEffect(() => {
	// 	// если intersection в зоне видимости экрана
	// 	if (intersection?.isIntersecting) {
	// 		// меняем активную категорию в состоянии Zustand
	// 		setActiveCategoryId(categoryId);
	// 	}
	// }, [categoryId, intersection?.isIntersecting, title]);

	return (
		// через ref навешивает на блок intersectionRef + задаем id блоку для автоматического скролла до нужного блока по id текущей активной категории
		// <div className={className} id={title} ref={intersectionRef}>
		<div className={className} id={title}>
			<Title text={title} size="lg" className="font-medium mb-8"/>
			<div className={'grid grid-cols-4 gap-x-8 gap-y-14'}>
				{products.map((product) => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						description={product.description}
						image={product.image}
						price={300}
					/>
				))}
			</div>
		</div>
	);
};
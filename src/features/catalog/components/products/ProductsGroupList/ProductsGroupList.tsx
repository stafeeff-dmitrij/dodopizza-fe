import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useIntersection } from 'react-use';

import { AppDispatch } from '../../../../../redux/store.ts';
import { setActiveCategoryId } from '../../../../../redux/slices/categorySlice.ts';
import { Title } from '../../../../../components/typography';
import { ProductsList } from '../ProductsList/ProductsList.tsx';
import { Product } from '../../../../../redux/api/productApi.ts';
import { cn } from '../../../../../lib';
import { Button } from '../../../../../components/ui';
import { ChevronRight } from 'lucide-react';


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
 * @prop title - наименование категории
 * @prop categoryId - id категории
 * @prop products - товары
 */
export const ProductsGroupList: React.FC<Props> = ({
	title,
	categoryId,
	products,
	className,
}) => {

	const dispatch = useDispatch<AppDispatch>();

	const crossRef = React.useRef<HTMLDivElement>(null);

	// @ts-ignore
	// пример из документации - https://streamich.github.io/react-use/?path=/story/sensors-useintersection--docs
	const cross = useIntersection(crossRef, {
		threshold: 0.4,
	});

	// изменение активной категории при скролле
	React.useEffect(() => {
		// если intersection в зоне видимости экрана
		if (cross?.isIntersecting) {
			dispatch(setActiveCategoryId(categoryId));
		}
	}, [categoryId, cross?.isIntersecting, title]);

	return (
		// через ref навешивает на блок intersectionRef + задаем id блоку для автоматического скролла до нужного блока по id текущей активной категории
		<div className={className} id={title} ref={crossRef}>
			<div className='flex items-center justify-between mb-8 border-b border-slate-100'>
				<Title text={title} size="lg" className={cn('pl-4 pb-1 font-medium')}/>
				<Link to={`category/${categoryId}`} className='mr-4'>
					<Button size='sm' variant='secondary' className='pl-4 pr-3 border-[1px] border-secondary-foreground'>
						<p>Выбрать {categoryId != 13 && title.toLowerCase()}</p>
						<ChevronRight className="h-4 w-4"/>
					</Button>
				</Link>
			</div>
			<ProductsList products={products}/>
		</div>
	);
};
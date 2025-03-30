import { useTitle } from 'react-use';

import { Container } from '../../components/layout';
import { CarouselMain, NotResults, ProductsGroupList } from '../../features/catalog/components';
import { useGetAllProductsQuery } from '../../redux/api';
import { ProductsGroupListSkeleton } from '../../features/catalog/components/products';
import { ErrorPage } from '../errors';


/**
 * @component
 * @description Главная страница со всеми товарами
 */
export function Main() {

	useTitle('ДОДО ПИЦЦА - самая вкусная пицца во вселенной!');

	const { data, isLoading, isSuccess, isError, error } = useGetAllProductsQuery();

	if (isError) {
		return <ErrorPage error={error}/>
	}

	return (
		<div>
			<CarouselMain className='mb-5'/>
			<Container className="flex gap-[80px] pb-14">
				<div className="flex flex-col flex-1 gap-10">
					{isLoading && [...Array(3)].map((_, index) =>
							<ProductsGroupListSkeleton key={index}/>
						)
					}
					{isSuccess && !data.length && <NotResults className='h-[300px]'/>}
					{isSuccess && data.map(category => (
						category.products.length > 0 && (
							<ProductsGroupList
								key={category.id}
								categoryId={category.id}
								title={category.name}
								products={category.products}
							/>
						)
					))}
				</div>
			</Container>
		</div>
	);
}

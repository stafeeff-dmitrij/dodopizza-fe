import React from 'react';

import { Container } from '../../components/layout';
import { getErrorDataToast } from '../../lib';
import { CarouselMain, ProductsGroupList } from '../../features/catalog/components';
import { useGetAllProductsQuery } from '../../redux/api';
import { useTitle } from 'react-use';


/**
 * @component
 * @description Главная страница со всеми товарами
 */
export function Main() {

	useTitle('ДОДО ПИЦЦА - самая вкусная пицца во вселенной!');

	const { data, isLoading, isSuccess, isError } = useGetAllProductsQuery();

	React.useEffect(() => {
		if (isError) {
			getErrorDataToast();
		}
	}, [isError]);

	return (
		<div>
			<CarouselMain/>
			<Container className="flex gap-[80px] mt-5 pb-14">
				<div className="flex-1">
					<div className="flex flex-col gap-16">
						{isLoading && <p>Идет загрузка</p> }
						{isSuccess && data.map(category => (
							category.products.length > 0 && (
								<ProductsGroupList
									key={category.id}
									title={category.name}
									categoryId={category.id}
									products={category.products}
								/>
							)
						))}
					</div>
				</div>
			</Container>
		</div>
	);
}

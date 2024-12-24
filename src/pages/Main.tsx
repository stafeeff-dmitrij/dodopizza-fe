import React from 'react';

import { Container, ProductsGroupList } from '../components/layout';
import { getErrorDataToast } from '../lib';
import { useGetAllProductsQuery } from '../redux/api';


/**
 * @component
 * @description Главная страница со всеми товарами
 */
export function Main() {

	const { data, isLoading, isSuccess, isError } = useGetAllProductsQuery();

	React.useEffect(() => {
		if (isError) {
			getErrorDataToast();
		}
	}, [isError]);

	return (
		<div>
			<Container className="flex gap-[80px] mt-5 pb-14">
				<div className="flex-1">
					<div className="flex flex-col gap-16">
						{/* TODO Добавить скелетон */}
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

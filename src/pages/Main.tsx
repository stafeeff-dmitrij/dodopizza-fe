import React from 'react';

import { Container, ProductsGroupList } from '../components/layout';
import { Menu } from '../components/menu';
import { useGetCategoriesQuery } from '../redux/api';
import { getErrorDataToast } from '../lib';


/**
 * @component
 * @description Главная страница со всеми товарами
 */
export function Main() {

	const { data, isLoading, isSuccess, isError } = useGetCategoriesQuery();

	React.useEffect(() => {
		if (isError) {
			getErrorDataToast();
		}
	}, [isError]);

	return (
		<div>
			{isSuccess && <Menu categories={data.filter(category => category.products.length > 0)} isLoading={isLoading} />}
			<Container className="flex gap-[80px] mt-5 pb-14">
				<div className="flex-1">
					<div className="flex flex-col gap-16">
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

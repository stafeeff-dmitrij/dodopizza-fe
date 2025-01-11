import React from 'react';
import { useParams } from 'react-router-dom';
import { useTitle } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';

import { Title } from '../../components/typography';
import { Container } from '../../components/layout';
import { ChooseProductModal, ProductsList } from '../../features/catalog/components';

import { AppDispatch } from '../../redux/store.ts';
import { selectCategory, setActiveId } from '../../redux/slices/categorySlice.ts';
import { useGetFilterProductsQuery } from '../../redux/api';
import { getErrorToast } from '../../lib';


/**
 * @component
 * @description Страница конкретной категории с товарами
 */
export function Category() {

	const { id } = useParams();
	const { data, isLoading, isSuccess, isError } = useGetFilterProductsQuery({ category_id: Number(id), page_size: 12 });

	const dispatch = useDispatch<AppDispatch>();

	const { categories } = useSelector(selectCategory);
	const foundCategory = categories.find(category => category.id === Number(id)) ?? { name: 'Товары' };

	useTitle(`ДОДО ПИЦЦА - выбор товаров среди "${foundCategory.name}"`);

	React.useEffect(() => {
		if (isError) {
			getErrorToast('Ошибка при получении данных');
		}
	}, [isError]);

	// установка активной категории
	React.useEffect(() => {
		id && dispatch(setActiveId(Number(id)));
	}, [id]);

	return (
		<div>
			<Container className="flex justify-between gap-x-7 pt-4">
				<div
					className="flex flex-col w-[280px] max-h-[550px] top-20 sticky rounded-[8px] shadow-[0px_6px_20px_rgba(6,5,50,0.1)] p-4"
				>
					Блок с фильтрами
				</div>
				<div>
					<div className="flex justify-between items-center gap-x-8 mb-10">
						{foundCategory && <Title text={foundCategory.name} size="lg" className="text-3xl"/>}
						<div className="flex px-6 py-2 rounded-[8px] shadow-[0px_6px_20px_rgba(6,5,50,0.1)]">Блок сортировки</div>
					</div>
					{isLoading && <p>Идет загрузка...</p>}
					{isSuccess && <ProductsList products={data.results} className="grid-cols-3 gap-x-6"/>}
				</div>
			</Container>
			<ChooseProductModal/>
		</div>
	);
}

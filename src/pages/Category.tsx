import React from 'react';
import { useParams } from 'react-router-dom';

import { Title } from '../components/typography';
import { Container, ProductsList } from '../components/layout';
import { getErrorDataToast } from '../lib';
import { setActiveId } from '../redux/slices/crossCategorySlice.ts';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store.ts';
import { useGetFilterProductsQuery } from '../redux/api';


/**
 * @component
 * @description Страница конкретной категории с товарами
 */
export function Category() {

	const { id } = useParams();
	const dispatch = useDispatch<AppDispatch>();

	const { data, isLoading, isSuccess, isError } = useGetFilterProductsQuery({ category_id: id });

	// установка активной категории
	React.useEffect(() => {
		{id && dispatch(setActiveId(Number(id)))}
	}, [id]);

	React.useEffect(() => {
		if (isError) {
			getErrorDataToast();
		}
		{
			id && dispatch(setActiveId(Number(id)));
		}
	}, [isError]);

	return (
		<div>
			<Container>
				<Title text={`Категория #${id}`} size="lg"/>
				{/* TODO Добавить скелетон */}
				{isLoading && <p>Идет загрузка...</p> }
				{isSuccess && <ProductsList products={data.results}/>}
			</Container>
		</div>
	);
}

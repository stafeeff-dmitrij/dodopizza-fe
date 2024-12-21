import React from 'react';
import toast from 'react-hot-toast';

import { Container } from '../components/layout';
import { Title } from '../components/typography';
import { Menu } from '../components/menu';
import { useGetCategoriesQuery } from '../redux/api';


/**
 * @component
 * @description Главная страница со всеми товарами
 */
export function Main() {

	const { data, isLoading, isSuccess, isError } = useGetCategoriesQuery();

	React.useEffect(() => {
		if (isError) {
			setTimeout(() => {
				toast.error('Ошибка при получении данных о товарах', {
					duration: 3000,
				});
			}, 500);
		}
	}, []);

	return (
		// TODO Временно для скролла
		<div className="h-[2000px]">
			{isSuccess && <Menu categories={data} isLoading={isLoading} />}
			<Container className="mt-5 pb-14">
				<Title text="Главная страница" size="xl"/>
				<Title text='Здесь будет каталог товаров' size='md' className="text-red-400" />
				<Title text='Здесь будет каталог товаров' size='md' className="text-red-400" />
				<Title text='Здесь будет каталог товаров' size='md'/>
				<Title text='Здесь будет каталог товаров' size='md'/>
			</Container>
		</div>
	);
}

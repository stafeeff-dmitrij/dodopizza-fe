import React from 'react';
import { useParams } from 'react-router-dom';
import { useTitle } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';

import { Title } from '../../components/typography';
import { Container } from '../../components/layout';
import { FiltersBlock, ProductsList, SelectSort } from '../../features/catalog/components';

import { AppDispatch } from '../../redux/store.ts';
import { selectCategory, setActiveCategoryId } from '../../redux/slices/categorySlice.ts';
import { useGetFilterProductsQuery } from '../../redux/api';
import { getErrorToast } from '../../lib';
import { PaginationProduct } from '../../features/catalog/components/PaginationProduct.tsx';
import { useFiltersParams, useQueryFilters } from '../../features/catalog/hooks';
import { getFilterParams } from '../../features/catalog/utils';


/**
 * @component
 * @description Страница конкретной категории с товарами
 */
export function Category() {

	const pageSize = 6;

	const { id } = useParams();  // id категории
	const { categories } = useSelector(selectCategory);

	const dispatch = useDispatch<AppDispatch>();

	const filters = useFiltersParams(id);
	const params = getFilterParams(filters, id, pageSize);
	const { data, isLoading, isSuccess, isError } = useGetFilterProductsQuery(params);
	const foundCategory = categories.find(category => category.id === Number(id)) ?? { name: 'Товары' };

	useQueryFilters(filters);  // запись параметров фильтрации в URL

	useTitle(`ДОДО ПИЦЦА - выбор товаров среди "${foundCategory.name}"`);

	React.useEffect(() => {
		if (isError) {
			filters.page > 1 ? filters.setPage(1) : getErrorToast('Ошибка при получении данных');
		}
	}, [isError]);

	// установка активной категории
	React.useEffect(() => {
		id && dispatch(setActiveCategoryId(Number(id)));
	}, [id]);

	return (
		<div>
			<Container className="flex justify-between gap-x-7 pt-6 pb-6">
				<FiltersBlock
					className="flex flex-col self-start gap-6 w-[280px] top-20 p-6 sticky rounded-[12px] shadow-[0px_6px_20px_rgba(6,5,50,0.1)]"
					filters={filters}
				/>
				<div>
					<div className="flex justify-between items-center gap-x-8 mb-12">
						<div className="flex items-center gap-1">
							{foundCategory && <Title text={foundCategory.name} size="lg" className="text-3xl"/>}
							{data?.results && <span className='text-[18px]'>({data.count})</span>}
						</div>
						<SelectSort
							value={filters.sortType}
							setValue={filters.setSortType}
						/>
					</div>
					{isLoading && <p>Идет загрузка...</p>}
					{isSuccess && <ProductsList products={data.results} className="grid-cols-3 gap-x-6 pb-8"/>}
					{isSuccess && data.total_pages !== 1 &&
						<PaginationProduct
							className='pt-6 pb-6 border-t border-slate-100'
							totalPages={data.total_pages || 1}
							currentPage={filters.page}
							setCurrentPage={filters.setPage}
						/>
					}
				</div>
			</Container>
		</div>
	);
}

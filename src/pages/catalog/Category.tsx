import React from 'react';
import { useParams } from 'react-router-dom';
import { useTitle } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';

import { Title } from '../../components/typography';
import { Container } from '../../components/layout';
import {
	FiltersBlock,
	NotResults,
	PaginationProductSkeleton,
	ProductsList,
	SelectSort
} from '../../features/catalog/components';

import { AppDispatch } from '../../redux/store.ts';
import { selectCategory, setActiveCategoryId } from '../../redux/slices/categorySlice.ts';
import { useGetFilterProductsQuery } from '../../redux/api';
import { PaginationProduct } from '../../features/catalog/components';
import { useFiltersParams, useQueryFilters } from '../../features/catalog/hooks';
import { getFilterParams } from '../../features/catalog/utils';
import { Skeleton } from '../../components/ui';
import { ProductListSkeleton } from '../../features/catalog/components/products';
import { ErrorPage } from '../errors';


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
	const { data, isLoading, isSuccess, isError, error } = useGetFilterProductsQuery(params);
	const foundCategory = categories.find(category => category.id === Number(id)) ?? { name: 'Товары' };

	useQueryFilters(filters);  // запись параметров фильтрации в URL

	useTitle(`ДОДО ПИЦЦА - выбор товаров среди "${foundCategory.name}"`);

	// установка активной категории
	React.useEffect(() => {
		id && dispatch(setActiveCategoryId(Number(id)));
	}, [id]);

	if (isError) {
		return <ErrorPage error={error}/>
	}

	return (
		<div>
			<Container className="flex justify-between gap-x-7 pt-6 pb-6">
				<FiltersBlock
					className="flex flex-col self-start gap-6 min-w-[280px] top-20 p-6 sticky rounded-[12px] shadow-[0px_6px_20px_rgba(6,5,50,0.1)]"
					filters={filters}
				/>
				<div className="flex flex-col justify-between w-full">
					<div className="flex justify-between items-center gap-x-8 mb-12">
						<div className="flex items-center gap-1">
							{isLoading && <Skeleton className={'h-9 w-36 rounded-3xl'}/>}
							{!isLoading && foundCategory && <Title text={foundCategory.name} size="lg" className="text-3xl"/>}
							{data?.results && data.results.length > 0 && <span className='text-[18px]'>({data.count})</span>}
						</div>
						<SelectSort
							value={filters.sortType}
							setValue={filters.setSortType}
							disabled={!isSuccess || data?.results.length === 0}
						/>
					</div>

					{/* результат с товарами */}
					{isLoading && <ProductListSkeleton className='grid-cols-3 gap-x-6 pb-8' count={6}/>}
					{isSuccess && data.results.length === 0 && <NotResults/>}
					{isSuccess && data.results.length > 0 && <ProductsList products={data.results} className="grid-cols-3 gap-x-6 pb-8"/>}

					{/* пагинация */}
					{isLoading && <PaginationProductSkeleton className='pt-6 pb-6 border-t border-slate-100'/>}
					{isSuccess && data.total_pages !== 1 && data.results.length > 0 &&
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

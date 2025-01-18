import React from 'react';

import { Input } from '../../../../components/ui';
import { RangeSlider } from '../RangeSlider.tsx';
import { CheckboxFiltersGroup } from './CheckboxFiltersGroup.tsx';
import { useParams } from 'react-router-dom';
import { useGetIngredientsQuery } from '../../../../redux/api/ingredientsApi.ts';
import { FilterParams } from '../../hooks/useFiltersParams.ts';


interface Props {
	filters: FilterParams;
	className?: string;
}

/**
 * @component
 * @description Блок фильтрации товаров
 *
 * @prop filters - параметры фильтрации
 */
export const FiltersBlock: React.FC<Props> = ({ filters, className }) => {

	const { id } = useParams();  // id категории
	const { data, isLoading } = useGetIngredientsQuery({ category_id: Number(id) });

	// преобразуем данные об ингредиентах в вид для передачи в чекбоксы: id подставляем в value, name в text
	const ingredients = data?.map(ingredient => ({ value: String(ingredient.id), text: ingredient.name })) || [];

	const updatePrices = (prices: number[]) => {
		filters.setPrices('priceFrom', prices[0]);
		filters.setPrices('priceTo', prices[1]);
	};

	return (
		<div className={className}>

			{/* Фильтр цен */}
			<div className=''>
				<p className="font-medium mb-4">Цена от и до:</p>
				<div className="flex gap-3 mb-5">

					{/* TODO настроить, чтобы запрос на бэк делался не при каждом изменении значении цены, а как в инпуте поиска товара */}
					<Input
						className='h-9 py-1 px-5 rounded-[12px] focus:border-primary'
						type="number"
						placeholder="0"
						min={0}
						max={2000}
						value={String(filters.prices.priceFrom)}
						onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
					/>

					{/* TODO настроить, чтобы запрос на бэк делался не при каждом изменении значении цены, а как в инпуте поиска товара */}
					<Input
						className='h-9 py-1 px-5 rounded-[12px] focus:border-primary'
						type="number"
						min={100}
						max={2000}
						placeholder="2000"
						value={String(filters.prices.priceTo)}
						onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
					/>
				</div>

				{/* TODO настроить, чтобы запрос на бэк делался не при каждом изменении значении цены, а как в инпуте поиска товара */}
				<RangeSlider
					min={0}
					max={2000}
					step={10}
					value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 2000]}
					onValueChange={updatePrices}
				/>
			</div>

			{/* ингредиенты */}
			{ingredients.length > 0 && <CheckboxFiltersGroup
				className="pt-5 border-t border-y-neutral-100"
				title="Ингредиенты"
				name="ingredients"
				limit={6}
				defaultItems={ingredients.slice(0, 6)}
				items={ingredients}
				loading={isLoading}
				onClickCheckbox={filters.setSelectedIngredients}
				selectedValues={filters.selectedIngredients}
				sizeVisible={true}
			/>}
		</div>
	);
};
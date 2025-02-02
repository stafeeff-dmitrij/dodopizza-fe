import React from 'react';

import { Input } from '../../../../components/ui';
import { RangeSlider } from '../RangeSlider.tsx';
import { CheckboxFiltersGroup } from './CheckboxFiltersGroup.tsx';
import { useParams, useSearchParams } from 'react-router-dom';
import { useGetIngredientsQuery } from '../../../../redux/api/ingredientsApi.ts';
import { FilterParams, PriceRangeProps } from '../../hooks/useFiltersParams.ts';
import { useDebounce } from '../../../../hooks';
import { MAX_PRICE, MIN_PRICE } from '../../constants.ts';
import { SwitchInHave } from './SwitchInHave.tsx';


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

	const [searchParams] = useSearchParams();

	const { id } = useParams();  // id категории
	const { data: ingredients, isLoading } = useGetIngredientsQuery({ category_id: Number(id) });

	const [prices, setPrices] = React.useState<PriceRangeProps>({
		priceFrom: Number(searchParams.get('min_price')) || MIN_PRICE,
		priceTo: Number(searchParams.get('max_price')) || MAX_PRICE,
	});

	// ограничиваем частоту запросов на бэк при изменении диапазона цен в 500 мс
	const debouncedPrices = useDebounce<PriceRangeProps>(prices, 500);

	// преобразуем данные об ингредиентах в вид для передачи в чекбоксы: id подставляем в value, name в text
	const ingredientItems = ingredients?.map(ingredient => ({ value: String(ingredient.id), text: ingredient.name })) || [];

	const updatePrices = (name: keyof PriceRangeProps, value: number) => {
		setPrices(prev => ({ ...prev, [name]: value }));
	};

	const updatePricesRange = (pricesRange: number[]) => {
		updatePrices('priceFrom', pricesRange[0]);
		updatePrices('priceTo', pricesRange[1]);
	};

	// обновление цен в основном состоянии фильтрации с задержкой в 500 с (меньше запросов к бэку)
	React.useEffect(() => {
		filters.setPrices('priceFrom', prices.priceFrom);
		filters.setPrices('priceTo', prices.priceTo);
	}, [debouncedPrices])

	// сброс значений в инпутах при переходе в другую категорию
	React.useEffect(() => {
		updatePrices('priceFrom',Number(searchParams.get('min_price')) || MIN_PRICE);
		updatePrices('priceTo', Number(searchParams.get('max_price')) || MAX_PRICE,);
	}, [id])

	return (
		<div className={className}>

			{/* Фильтр цен */}
			<div className=''>
				<p className="font-medium mb-4">Цена от и до:</p>
				<div className="flex gap-3 mb-5">
					<Input
						className='h-9 py-1 px-5 rounded-[12px] focus:border-primary'
						type="number"
						placeholder="0"
						min={0}
						max={2000}
						value={String(prices.priceFrom)}
						onChange={(e) => updatePrices('priceFrom', Number(e.target.value))}
					/>
					<Input
						className='h-9 py-1 px-5 rounded-[12px] focus:border-primary'
						type="number"
						placeholder="2000"
						min={100}
						max={2000}
						value={String(prices.priceTo)}
						onChange={(e) => updatePrices('priceTo', Number(e.target.value))}
					/>
				</div>
				<RangeSlider
					min={0}
					max={2000}
					step={10}
					value={[prices.priceFrom || 0, prices.priceTo || 2000]}
					onValueChange={updatePricesRange}
				/>
			</div>

			{/* ингредиенты */}
			{ingredientItems.length > 0 && <CheckboxFiltersGroup
				className="pt-5 border-t border-y-neutral-100"
				title="Ингредиенты"
				name="ingredients"
				limit={6}
				defaultItems={ingredientItems.slice(0, 6)}
				items={ingredientItems}
				loading={isLoading}
				onClickCheckbox={filters.setSelectedIngredients}
				selectedValues={filters.selectedIngredients}
				sizeVisible={true}
			/>}

			{/* Только активные товары */}
			<SwitchInHave
				isChecked={filters.onlyInHave}
				setChecked={filters.setOnlyInHave}
			/>

		</div>
	);
};
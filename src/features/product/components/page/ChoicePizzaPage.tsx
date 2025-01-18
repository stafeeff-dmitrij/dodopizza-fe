import React from 'react';

import { cn, formatPrice } from '../../../../lib';
import { Ingredient, Variation } from '../../../../redux/api/productApi.ts';
import { Title } from '../../../../components/typography';
import { IngredientCard, PizzaImage, VariationsGroup } from '../index.ts';
import { Button } from '../../../../components/ui';
import { pizzaSizes, TPizzaSize, TPizzaType } from '../../constants.ts';
import {
	calcTotalPizzaPrice,
	getAvailablePizzaTypes,
	getCurrentIngredients,
	getShortDescriptionPizza
} from '../../utils';
import { usePizzaOptions } from '../../hooks';
import { Variant } from '../ProductDetail/VariationsGroup.tsx';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store.ts';
import { setActiveCategoryId } from '../../../../redux/slices/categorySlice.ts';


export interface PizzaVariation extends Variation {
	pizza_size: TPizzaSize,
	pizza_type: TPizzaType,
	mass: number,
}

export interface Props {
	categoryId: number;
	name: string,
	description: string,
	count: number
	default_ingredients: Ingredient[],
	variations: PizzaVariation[],
	onSubmit: (variationId: number, ingredientsId: number[]) => void;
	loading: boolean;
	className?: string;
}

/**
 * @component
 * @description Страница выбора пиццы
 *
 * @prop categoryId - id категории товара
 * @prop name - наименование товара
 * @prop description - описание товара
 * @prop count - кол-во товара
 * @prop default_ingredients - ингредиенты по умолчанию, доступные для данного товара
 * @prop variations - вариации товара
 * @prop onSubmit - добавление товара в корзину
 * @prop loading - статус загрузки
 */
export const ChoicePizzaPage: React.FC<Props> = ({
	categoryId,
	name,
	description,
	count,
	variations,
  default_ingredients,
  onSubmit,
	loading,
	className
}) => {

	console.log('Кол-во ингредиентов: ', default_ingredients.length)

	const dispatch = useDispatch<AppDispatch>();

	const {
		size,
		type,
		activeVariation,
		selectedIngredientsId,
		setSize,
		setType,
		addIngredient,
	} = usePizzaOptions(variations);

	// доступные вариации пицц по типу теста
	const availableTypes = getAvailablePizzaTypes(variations, size);
	// описание товара в зависимости от выбранной вариации
	const shortDescription = getShortDescriptionPizza(activeVariation);
	// цена с учетом выбранной вариации и ингредиентов
	const totalPrice = calcTotalPizzaPrice(activeVariation, selectedIngredientsId);

	// добавление товара в корзину
	const handleClickAdd = () => {
		// выбранные ингредиенты текущей активной вариации
		const ingredientsId = getCurrentIngredients(activeVariation.ingredients, selectedIngredientsId);
		onSubmit(activeVariation.id, ingredientsId);
	};

	// смена активной категории (в меню)
	React.useEffect(() => {
		dispatch(setActiveCategoryId(categoryId));
	}, [categoryId])

	return (
		<div className={cn('flex flex-1 w-full h-[700px] gap-x-6', className)}>
			<PizzaImage className='w-[520px] bg-[#fffcf8] rounded-3xl' imageUrl={activeVariation.image} alt={name} size={activeVariation.pizza_size}/>
			<div className='flex flex-col justify-between pt-5 rounded-[20px]'>
				{/* scrollbar - свой кастомный скролл, описанный в globals.css */}
				<div className="w-[410px] px-[30px] overflow-auto">
					<Title text={name} size="xl" className="mb-1 text-[28px] leading-8 font-normal"/>
					<p className="mb-2 pt-[1px] text-[14px] font-light text-[#5c6370]">{shortDescription}</p>
					<p className="mb-5 text-[14px] leading-[18px] text-black text-justify">{description}</p>
					<div className="flex flex-col gap-[6px] pb-6">
						<VariationsGroup
							variants={pizzaSizes as Variant[]}
							value={size}
							onClick={value => setSize(Number(value) as TPizzaSize)}
						/>
						<VariationsGroup
							variants={availableTypes}
							value={type}
							onClick={(value) => setType(value as TPizzaType)}
						/>
					</div>
					<Title text="Добавить по вкусу" size="sm" className="mb-2.5"/>
					<div className="grid grid-cols-3 gap-3 pb-[30px]">
						{activeVariation.ingredients.map((ingredient) => (
							<IngredientCard
								key={ingredient.id}
								id={ingredient.id}
								name={ingredient.name}
								price={ingredient.price}
								image={ingredient.image}
								onClick={() => addIngredient(ingredient.id)}
								// проверка id текущего ингредиента в selectedIngredientsId
								active={selectedIngredientsId.has(ingredient.id)}
							/>
						))}
					</div>
				</div>
				<div className="px-[30px] pt-[24px] pb-[30px]">
					<Button
						variant={count === 0 ? 'block' : 'default'}
						disabled={count === 0}
						title={count === 0 ? 'Товар закончился' : ''}
						loading={loading}
						onClick={handleClickAdd}
						className="px-9 py-6 text-base font-light w-full"
					>
						В корзину за {formatPrice(totalPrice)} ₽
					</Button>
				</div>
			</div>
		</div>
	);
};
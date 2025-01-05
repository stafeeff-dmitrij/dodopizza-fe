import React from 'react';

import { cn, formatPrice, getErrorDataToast } from '../../../../lib';
import { IngredientProduct, Variation } from '../../../../redux/api/productApi.ts';
import { Title } from '../../../../components/typography';
import { IngredientCard, PizzaImage, VariationsGroup } from '../index.ts';
import { Button } from '../../../../components/ui';
import { pizzaSizes, TPizzaSize, TPizzaType } from '../../constants.ts';
import { calcTotalPizzaPrice, getAvailablePizzaTypes, getShortPizzaDescription } from '../../utils';
import { usePizzaOptions } from '../../hooks';


export interface PizzaVariation extends Variation {
	pizza_size: TPizzaSize,
	pizza_type: TPizzaType,
	mass: number,
}

export interface Props {
	name: string,
	description: string,
	default_ingredients: IngredientProduct[],
	variations: PizzaVariation[],
	loading: boolean;
	className?: string;
}

/**
 * @component
 * @description Форма выбора пиццы
 *
 * @prop {string} name - наименование товара
 * @prop {string} description - описание товара
 * @prop {IngredientProduct[]} default_ingredients - ингредиенты по умолчанию, доступные для данного товара
 * @prop {boolean} loading - статус загрузки
 */
export const ChoicePizzaForm: React.FC<Props> = ({
	name,
	description,
	variations,
  default_ingredients,
	loading,
	className
}) => {

	console.log('Ингредиентов по умолчанию: ', default_ingredients.length)

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

	const shortDescription = getShortPizzaDescription(activeVariation);
	const totalPrice = calcTotalPizzaPrice(activeVariation, selectedIngredientsId);

	// добавление товара в корзину
	const handleClickAdd = () => {
		getErrorDataToast('Функционал добавления товара в корзину еше не реализован!');
	};

	return (
		<div className={cn('flex flex-1 w-[920px] h-[610px]', className)}>
			<PizzaImage className='w-[520px]' imageUrl={activeVariation.image} size={activeVariation.pizza_size}/>
			<div className='flex flex-col pt-[30px] bg-[#fcfcfc]'>
				{/* scrollbar - свой кастомный скролл, описанный в globals.css */}
				<div className="w-[400px] h-[480px] px-[30px]  overflow-auto">
					<Title text={name} size="xl" className="font-normal text-[24px]"/>
					<p className="pt-[1px] pb-[5px] text-[14px] text-[#828282]">{shortDescription}</p>
					<p className="mb-3 text-[14px] leading-[18px] text-black">{description}</p>
					<div className="flex flex-col gap-[6px] pb-4">
						<VariationsGroup
							variants={pizzaSizes}
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
					<div className="grid grid-cols-3 gap-2 pb-[30px]">
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
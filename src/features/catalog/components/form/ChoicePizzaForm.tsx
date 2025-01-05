import React, { useState } from 'react';
import { useSet } from 'react-use';

import { cn, formatPrice, getErrorDataToast } from '../../../../lib';
import { IngredientProduct, Variation } from '../../../../redux/api/productApi.ts';
import { Title } from '../../../../components/typography';
import { IngredientCard, PizzaImage, VariationsGroup } from '../../../product/components';
import { Button } from '../../../../components/ui';
import {
	PizzaSize,
	pizzaSizes,
	PizzaType,
	TPizzaSize,
	TPizzaType
} from '../../constants.ts';
import {
	calcTotalPizzaPrice,
	getAvailablePizzaTypes,
	getShortPizzaDescription,
	getVariationPizza
} from '../../../product/utils';


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

	// у всех товаров есть, минимум, 1 вариация, у пицц всегда 5 вариаций
	const [activeVariation, setActiveVariation] = useState<PizzaVariation>(variations.length > 1 ? variations[1] : variations[0]);

	// размер и тип пиццы
	const [size, setSize] = useState<TPizzaSize>(activeVariation.pizza_size);
	const [type, setType] = useState<TPizzaType>(activeVariation.pizza_type);

	// цена с учетом выбранной вариации и ингредиентов
	const [totalPrice, setTotalPrice] = useState<number>(activeVariation.price);

	// выбранные (уникальные) ингредиенты
	const [selectedIngredientsId, {toggle: addIngredient}] = useSet(new Set<number>([]));

	console.log('Ингредиентов по умолчанию: ', default_ingredients.length)

	// установка активной вариации пиццы (по умолчанию 30 см, традиционная)
	React.useEffect(() => {
		const defaultVariation = getVariationPizza(variations, PizzaSize.average, PizzaType.traditional);
		if (defaultVariation) {
			setActiveVariation(defaultVariation);
		}
	}, [])

	// смена активной вариации в зависимости от выбранных размеров и типа теста
	React.useEffect(() => {
		const activeVariation = getVariationPizza(variations, size, type);
		if (activeVariation) {
			setActiveVariation(activeVariation);
		} else {
			setActiveVariation(variations[0]);
		}
	}, [size, type])

	// сброс выбранных размеров и типа теста, если при смене размера (вариации) нет допустимого типа теста
	React.useEffect(() => {
		setSize(activeVariation.pizza_size);
		setType(activeVariation.pizza_type);
	}, [activeVariation])

	// подсчет общей стоимости пиццы с учетом выбранной вариации и ингредиентов
	React.useEffect(() => {
		const price = calcTotalPizzaPrice(activeVariation, selectedIngredientsId);
		setTotalPrice(price);
	}, [activeVariation, selectedIngredientsId])

	const availableTypes = getAvailablePizzaTypes(variations, size);
	const shortDescription = getShortPizzaDescription(activeVariation);


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
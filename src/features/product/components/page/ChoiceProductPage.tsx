import React from 'react';

import { Variation as VariationProps } from '../../../../redux/api/productApi.ts';
import { cn, formatPrice } from '../../../../lib';
import { IngredientCard, ProductImage, Variation, VariationsGroup } from '../ProductDetail';
import { Title } from '../../../../components/typography';
import { Button } from '../../../../components/ui';
import {
	calcTotalPizzaPrice,
	getAvailableVariations, getCurrentIngredients,
	getShortDescriptionProduct
} from '../../utils';
import { useProductOptions } from '../../hooks';
import { TProductValue } from '../../constants.ts';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store.ts';
import { setActiveCategoryId } from '../../../../redux/slices/categorySlice.ts';


export interface Props {
	categoryId: number,
	name: string,
	description: string,
	count: number,
	variations: VariationProps[],
	onSubmit: (variationId: number, ingredientsId: number[]) => void;
	className?: string;
}

/**
 * @component
 * @description Форма выбора товара
 *
 * @prop categoryId - id категории товара
 * @prop name - наименование товара
 * @prop description - описание товара
 * @prop count - кол-во товара
 * @prop variations - вариации товара
 * @prop onSubmit - добавление товара в корзину
 */
export const ChoiceProductPage: React.FC<Props> = ({
	categoryId,
	name,
	description,
	count,
	variations,
	onSubmit,
	className
}) => {

	const dispatch = useDispatch<AppDispatch>();

	const {
		value,
		activeVariation,
		selectedIngredientsId,
		setValue,
		addIngredient,
	} = useProductOptions(categoryId, variations);

	// вариации товара
	const availableVariations = getAvailableVariations(categoryId, variations);

	const shortDescription = getShortDescriptionProduct(categoryId, activeVariation);
	const totalPrice = calcTotalPizzaPrice(activeVariation, selectedIngredientsId);

	// большое изображение, если 1 вариация, или, если вариаций 2, и активна вторая
	const bigImage = variations.length === 1 && activeVariation.id === variations[0].id || variations.length === 2 && activeVariation != variations[0]

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
		<div className={cn(
			'flex flex-1 w-full h-[420px] gap-x-6',
			{'h-[700px]': variations.some(variation => variation.ingredients.length > 0)},
			className
		)}>
			<ProductImage
				className='bg-[#fffcf8] rounded-3xl'
				imageClassName={bigImage ? 'w-[60%]' : 'w-[50%]'}
				imageUrl={activeVariation.image}
				bigImage={bigImage}
				alt={name}
			/>
			<div className='flex flex-col justify-between pt-[30px]'>
				<div className="w-[410px] px-[30px] overflow-auto">
					<Title text={name} size="xl" className="mb-1 text-[28px] leading-8 font-normal"/>
					<p className="mb-2 pt-[1px] text-[14px] font-light text-[#5c6370]">{shortDescription}</p>
					<p className="mb-5 text-[14px] leading-[18px] text-black text-justify">{description}</p>
					<div className="flex flex-col gap-[6px] pb-4">
						{variations.length > 1
							?
								<VariationsGroup
									variants={availableVariations}
									value={value}
									onClick={value => setValue(value as TProductValue)}
								/>
							: <Variation variant={availableVariations[0]}/>
						}
					</div>
					{activeVariation.ingredients.length > 0 &&
						<>
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
						</>
					}
				</div>
				<div className="px-[30px] pt-[24px] pb-[30px]">
					<Button
						variant={count === 0 ? 'block' : 'default'}
						disabled={count === 0}
						title={count === 0 ? 'Товар закончился' : ''}
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

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


export interface Props {
	size: 'small' | 'medium' | 'large';
	categoryId: number,
	name: string,
	description: string,
	count: number,
	variations: VariationProps[],
	loading: boolean;
	onSubmit: (variationId: number, ingredientsId: number[]) => void;
	className?: string;
}

/**
 * @component
 * @description Форма выбора товара
 *
 * @prop size - размер формы
 * @prop categoryId - id категории товара
 * @prop name - наименование товара
 * @prop description - описание товара
 * @prop count - кол-во товара
 * @prop variations - вариации товара
 * @prop loading - статус загрузки
 * @prop onSubmit - добавление товара в корзину
 */
export const ChoiceProductForm: React.FC<Props> = ({
	size = 'small',
	categoryId,
	name,
	description,
	count,
	variations,
	onSubmit,
	loading,
	className
}) => {

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

	// добавление товара в корзину
	const handleClickAdd = () => {
		// выбранные ингредиенты текущей активной вариации
		const ingredientsId = getCurrentIngredients(activeVariation.ingredients, selectedIngredientsId);
		onSubmit(activeVariation.id, ingredientsId);
	};

	return (
		<div className={cn(
			'flex flex-1',
			{'w-[740px] h-[420px]': size === 'small'},
			{'w-[920px] h-[610px]': size === 'medium'},
			className
		)}>
			<ProductImage
				className={cn(
					{'w-[52%]': size === 'small'},
					{'w-[57%]': size === 'medium'},
				)}
				imageUrl={activeVariation.image}
				bigImage={variations.length === 1 && activeVariation.id === variations[0].id || variations.length > 1 && activeVariation != variations[0]}
				alt={name}
			/>
			<div className={cn(
				'flex flex-col justify-between pt-[30px] bg-[#fcfcfc]',
				{'w-[48%]': size === 'small'},
				{'w-[43%]': size === 'medium'},
			)}>
				{/* scrollbar - свой кастомный скролл, описанный в globals.css */}
				<div className="w-full px-[30px] overflow-auto">
					<Title text={name} size="xl" className="mb-1 font-normal text-[24px]"/>
					<p className="mb-[5px] pt-[1px] text-[14px] font-light text-[#5c6370]">{shortDescription}</p>
					<p className="mb-3 text-[14px] leading-[18px] text-black text-justify">{description}</p>
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

import React, { useState } from 'react';

import { cn } from '../../../../lib';
import { Ingredient, ProductDetail } from '../../../../redux/api/productApi.ts';
import { Title } from '../../../../components/typography';
import { IngredientCard, PizzaImage, VariationsGroup } from '../../../product/components';
import { Button } from '../../../../components/ui';
import { mapPizzaType, PizzaSize, pizzaSizes, PizzaType, pizzaTypes, TPizzaSize, TPizzaType } from '../../constants.ts';

export interface PizzaVariation {
	id: number,
	price: number,
	image: string,
	pizza_size: TPizzaSize,
	pizza_type: TPizzaType,
	ingredients: Ingredient[],
}


interface Props extends ProductDetail {
	// imageUrl: string;
	// name: string;
	// ingredients: Ingredient[];
	// items: ProductItem[];
	// loading?: boolean;
	// onSubmit: (itemId: number, ingredients: number[]) => void;
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
 // * @prop {Ingredient[]} ingredients - ингредиенты, доступные для данного товара
 // * @prop {ProductItem[]} items - вариации, доступные для данного товара
 * @prop {boolean} loading - статус загрузки
 // * @prop {function} onSubmit - функция для добавления товара в корзину
 */
export const ChoicePizzaForm: React.FC<Props> = ({
	name,
	description,
	category_id,
	variations,
	loading,
	className
}) => {

	// у всех товаров есть минимум 1 вариация
	const [activeVariation, setActiveVariation] = useState<PizzaVariation>(variations[0]);

	// установка активной вариации товара
	React.useEffect(() => {
		const default_variation = variations.find(variation => {
			if (variation.pizza_size && variation.pizza_type && variation.pizza_size === PizzaSize.average && variation.pizza_type === PizzaType.traditional) {
				return variation;
			}
		});
		if (default_variation) {
			setActiveVariation(default_variation);
		}
	}, [variations])


	// TODO Сделать лоадеры для всех дочерних элементов
	return (
		// <div className={cn(className, 'flex flex-1 w-[920px] h-[610px]')}>
		// 	<PizzaImage className='w-[520px]' imageUrl={activeVariation.image}/>
		// 	<div className="w-[400px] bg-[#fcfcfc] p-[30px]">
		// 		<Title text={name} size="xl" className="font-normal text-[24px]"/>
		// 		<p className="pt-[1px] pb-[5px] text-[14px] text-[#828282]">30 см, традиционное тесто, 540 г</p>
		// 		<p className="mb-3 text-[14px] leading-[18px] text-black">{description}</p>
		// 		<div className="flex flex-col gap-[6px] pb-4">
		// 			<VariationsGroup
		// 				variants={pizzaSizes}
		// 				value={activeVariation.pizza_size}
		// 				// value={String(size)}
		// 				// onClick={value => setSize(Number(value) as PizzaSize)}
		// 			/>
		// 			<VariationsGroup
		// 				variants={pizzaTypes}
		// 				value={activeVariation.pizza_type}
		// 				// value={String(type)}
		// 				// onClick={(value) => setType(Number(value) as PizzaType)}
		// 			/>
		// 		</div>
		// 		<Title text="Добавить по вкусу" size="sm" className="mb-2.5"/>
		// 		{/* scrollbar - свой кастомный скролл, описанный в globals.css */}
		// 		<div className="mb-6 rounded-md h-[218px] overflow-auto scrollbar">
		// 			<div className="grid grid-cols-3 gap-2">
		// 				{activeVariation.ingredients.map((ingredient) => (
		// 					<IngredientCard
		// 						key={ingredient.id}
		// 						id={ingredient.id}
		// 						name={ingredient.name}
		// 						price={ingredient.price}
		// 						image={ingredient.image}
		// 						// onClick={() => addIngredient(ingredient.id)}  // добавление ингредиента
		// 						// проверка id текущего ингредиента в Set-е уже отмеченных selectedIngredientsId
		// 						// передаст true при совпадении, иначе false
		// 						// active={selectedIngredientsId.has(ingredient.id)}
		// 					/>
		// 				))}
		// 			</div>
		// 		</div>
		// 		<Button
		// 			// loading={loading}
		// 			// onClick={handleClickAdd}
		// 			className="px-9 py-6 text-base font-light w-full"
		// 		>
		// 			В корзину за 599 ₽
		// 		</Button>
		// 	</div>
		// </div>

	<div className={cn(className, 'flex flex-1 w-[920px] h-[610px]')}>
		<PizzaImage className='w-[520px]' imageUrl={activeVariation.image}/>

		<div className='flex flex-col pt-[30px] bg-[#fcfcfc]'>
			{/* scrollbar - свой кастомный скролл, описанный в globals.css */}
			<div className="w-[400px] h-[480px] px-[30px]  overflow-auto">
				<Title text={name} size="xl" className="font-normal text-[24px]"/>
				<p className="pt-[1px] pb-[5px] text-[14px] text-[#828282]">30 см, традиционное тесто, 540 г</p>
				<p className="mb-3 text-[14px] leading-[18px] text-black">{description}</p>
				<div className="flex flex-col gap-[6px] pb-4">
					<VariationsGroup
						variants={pizzaSizes}
						value={activeVariation.pizza_size}
						// value={String(size)}
						// onClick={value => setSize(Number(value) as PizzaSize)}
					/>
					<VariationsGroup
						variants={pizzaTypes}
						value={activeVariation.pizza_type}
						// value={String(type)}
						// onClick={(value) => setType(Number(value) as PizzaType)}
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
							// onClick={() => addIngredient(ingredient.id)}  // добавление ингредиента
							// проверка id текущего ингредиента в Set-е уже отмеченных selectedIngredientsId
							// передаст true при совпадении, иначе false
							// active={selectedIngredientsId.has(ingredient.id)}
						/>
					))}
				</div>
			</div>
			<div className="px-[30px] pt-[24px] pb-[30px]">
				<Button
					// loading={loading}
					// onClick={handleClickAdd}
					className="px-9 py-6 text-base font-light w-full"
				>
					В корзину за 899 ₽
				</Button>
			</div>
		</div>

	</div>
	)
		;
};
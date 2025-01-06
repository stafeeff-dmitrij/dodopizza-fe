export enum CategoriesId {
	pizzas = 2,  // пиццы
	combo = 3,  // комбо
	snacks = 4,  // закуски
	breakfasts = 5,  // завтрак
	cocktails = 6,  // коктейли
	coffee = 7,  // кофе
	drinks = 8,  // напитки
	desserts = 9,  // десерты
	sauces = 10,  // соусы
	other = 11,  // другие товары
}

export enum PizzaSize {
	small = 25,
	average = 30,
	big = 35,
}

export enum PizzaType {
	traditional = 'traditional',
	slim = 'slim',
}

// размеры пицц
export const mapPizzaSize = {
	25: '25 см',
	30: '30 см',
	35: '35 см',
} as const;

// типы теста пицц
export const mapPizzaType = {
	'traditional': 'Традиционное',
	'slim': 'Тонкое',
} as const;

// кол-во товара в вариации
export const mapProductCount = {
	1: '1 шт',
	2: '2 шт',
	3: '3 шт',
	4: '4 шт',
	5: '5 шт',
	8: '8 шт',
	10: '10 шт',
	16: '16 шт',
} as const;

// размер порции
export const mapPortionSize = {
	'small': 'Маленькая',
	'average': 'Средняя',
	'big': 'Большая',
} as const;

// объем товара в вариации
export const mapProductVolume = {
	0.3: '0.3 л',
	0.4: '0.4 л',
	0.45: '0.45 л',
	0.5: '0.5 л',
	1: '1 л',
} as const;

// вес рассыпного товара
export const mapWeightValue = {
	0.5: '0.5 л',
} as const;

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
	name,
	value,
}));

export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
	name,
	value,
}));

export const productCount = Object.entries(mapProductCount).map(([value, name]) => ({
	name,
	value,
}));

export type TPizzaSize = keyof typeof mapPizzaSize;
export type TPizzaType = keyof typeof mapPizzaType;
export type TProductCount = keyof typeof mapProductCount;
export type TProductVolume = keyof typeof mapProductVolume;
export type TPortionSize = keyof typeof mapPortionSize;
export type TWeightValue = keyof typeof mapWeightValue;
export type TProductValue = TPizzaSize | TPizzaType | TProductCount | TProductVolume | TPortionSize | TWeightValue;
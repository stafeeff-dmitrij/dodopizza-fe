export enum CategoriesId {
	pizzas = 2,  // пиццы
	combo = 3,  // комбо
	snacks = 4,  // закуски
	breakfasts = 5,  // завтрак
	coffee = 6,  // кофе
	drinks = 7,  // напитки
	desserts = 8,  // десерты
	sauces = 9,  // соусы
	other = 10,  // другие товары
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

export const mapPizzaSize = {
	25: '25 см',
	30: '30 см',
	35: '35 см',
} as const;

export const mapPizzaType = {
	'traditional': 'Традиционное',
	'slim': 'Тонкое',
} as const;

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
	name,
	value,
}));

export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
	name,
	value,
}));

export type TPizzaSize = keyof typeof mapPizzaSize;
export type TPizzaType = keyof typeof mapPizzaType;
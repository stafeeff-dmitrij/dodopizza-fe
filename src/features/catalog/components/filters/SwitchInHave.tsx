import React from 'react';

import { Switch } from '../../../../components/ui';

import { cn } from '../../../../lib';


interface Props {
	isChecked: boolean;
	setChecked: (value: boolean) => void;
	className?: string;
}

/**
 * @component
 * @description Переключатель для выбора товаров только в наличии
 *
 * @prop isChecked - флаг активности переключателя
 * @prop setChecked - функция для установки противоположного значения
 */
export const SwitchInHave: React.FC<Props> = ({ isChecked, setChecked, className }) => {

	return (
		<div className={cn('flex items-center space-x-2', className)}>
			<Switch
				id="in-have"
				checked={isChecked}
				onCheckedChange={() => setChecked(!isChecked)}
			/>
			<label
				className='text-[14px]'
				htmlFor="in-have"
			>
				Только товары в наличии
			</label>
		</div>
)}
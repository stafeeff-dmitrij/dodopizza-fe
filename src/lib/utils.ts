import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Cookies from 'js-cookie';


interface EnvVariables {
  BASE_URL: string;
}

/**
 * @function
 * @description Чтение и возврат переменных окружения из .env
 */
export const getEnvVariables = (): EnvVariables => {
  return {
    BASE_URL: import.meta.env.VITE_BASE_URL,
  };
};

/**
 * @function
 * @description Склеивание стилей
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * @function
 * @description Добавление пробела между разрядами стоимости
 * @param {number} price - стоимость товара
 *
 * @return {string} отформатированная стоимость товара
 */
export const formatPrice = (price: number): string => {
  return price.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

/**
 * @function
 * @description Возврат значения csrf-токена из кук
 */
export function getCsrfToken() {
  return Cookies.get('XSRF-TOKEN');
}

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


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

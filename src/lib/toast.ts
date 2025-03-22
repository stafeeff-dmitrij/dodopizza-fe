import toast from 'react-hot-toast';


const DURATION = 3000;

/**
 * @function
 * @description Вывод уведомления, что страница еще не готова
 */
export function getNotReadyToast() {
	setTimeout(() => {
		toast.error('Страница пока не реализована...', {
			duration: 3000,
		});
	}, 200);
}

/**
 * @function
 * @description Вывод уведомления об ошибке
 */
export function getErrorToast(message: string, duration: number = DURATION) {
	setTimeout(() => {
		toast.error(message, {duration});
	}, 200);
}

/**
 * @function
 * @description Вывод успешного уведомления
 */
export function getSuccessToast(message: string, duration: number = DURATION) {
	setTimeout(() => {
		toast.success(message, {duration});
	}, 200);
}
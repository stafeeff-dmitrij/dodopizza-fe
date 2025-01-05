import toast from 'react-hot-toast';

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
export function getErrorDataToast(message: string) {
	setTimeout(() => {
		toast.error(message, {
			duration: 3000,
		});
	}, 200);
}

/**
 * @function
 * @description Вывод успешного уведомления
 */
export function getSuccessToast(message: string) {
	setTimeout(() => {
		toast.success(message, {
			duration: 3000,
		});
	}, 200);
}
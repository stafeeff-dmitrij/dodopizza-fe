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
 * @description Вывод уведомления об ошибке получения данных с бэка
 */
export function getErrorDataToast() {
	setTimeout(() => {
		toast.error('Ошибка при получении данных', {
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
/**
 * Перемешивание элементов массива алгоритмом Фишера-Йетса и возврат нового массива с элементами
 *
 * @param array - массив элементов
 */
export const getShuffleArray = (array: Array<any>): Array<any> => {

	let shuffleArray: Array<any> = array.slice();

	for (let i = shuffleArray.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));  // Случайный индекс от 0 до i
		[shuffleArray[i], shuffleArray[j]] = [shuffleArray[j], shuffleArray[i]];  // Поменять элементы местами
	}

	return shuffleArray;
}
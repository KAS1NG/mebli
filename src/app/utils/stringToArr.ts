export function stringToArray(str: string) {
    // Видаляємо квадратні дужки та зайві пробіли
    const cleanStr = str.replace(/[\[\]]/g, '').trim();
    // Розділяємо рядок за комами та пробілами
    const arr = cleanStr.split(',').map(item => item.trim());
    return arr;
}
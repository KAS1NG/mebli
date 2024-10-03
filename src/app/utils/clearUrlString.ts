export function transliterateAndClear(str: string) {

    const map: Record<string, string> = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g', 'д': 'd', 'е': 'e', 'є': 'ie',
        'ж': 'zh', 'з': 'z', 'и': 'y', 'й': 'i', 'і': 'i', 'к': 'k', 'л': 'l', 'м': 'm',
        'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '',
        'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
    };

    // Приводимо рядок до нижнього регістру
    str = str.toLowerCase();

    // Замінюємо всі пробіли на дефіси
    str = str.replace(/\s+/g, '-');

    // Видаляємо всі символи, які не є літерами (латиниця, кирилиця, включаючи 'і', 'ї', 'є', 'ґ'), цифрами, або дефісами
    str = str.replace(/[^a-zA-Zа-яА-Яіїєґ0-9-]+/g, '');

    // Видаляємо зайві дефіси на початку і в кінці рядка
    str = str.replace(/^-+|-+$/g, '');

    const updateStr = str.split('').map(char => {
        return map.hasOwnProperty(char) ? map[char] : char;
    }).join('');

    return updateStr
}
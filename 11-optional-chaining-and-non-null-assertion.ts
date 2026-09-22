export {};

interface Person {
    name: string;
    address?: { street: string };
    getAge?: () => number;
    array?: string[];
}

// ? в объявлении свойства означает, что свойства может не быть.
// ?. в выражении останавливает цепочку при null/undefined и возвращает undefined.
// Это реальное поведение JavaScript, а не только подсказка компилятору.
function prepareUser(user: Person) {
    const street = user.address?.street; // string | undefined.
    const age = user.getAge?.(); // number | undefined; вызов необязательной функции.
    const firstItem = user.array?.[0]; // string | undefined; доступ к элементу.
    return { street, age, firstItem };
}
const summary = prepareUser({ name: 'Vasya' });
// Все три поля результата — undefined. Ошибки обращения к отсутствующему address нет.
// user здесь обязателен. user.address?.street не защищает от отсутствия самого user.
// Пустой массив тоже даст undefined при чтении нулевого элемента.

// ?? задаёт запасное значение только для null/undefined.
function getStreet(user: Person): string {
    return user.address?.street ?? 'Адрес не указан';
}
const zero = 0;
const withNullish = zero ?? 18; // 0: существующее значение сохраняется.
const withOr = zero || 18; // 18: || заменяет также 0, '', false.
// Если пустая строка тоже должна считаться отсутствием, проверь её отдельно.

// ! после выражения — non-null assertion: «считай, что null/undefined здесь нет».
// Он убирает их из типа, но НЕ добавляет проверку при выполнении.
function getStreetUnchecked(user: Person): string {
    return user.address!.street;
}
// getStreetUnchecked({ name: 'Vasya' }); // Упадёт при выполнении.
// Это демонстрация риска; вызов специально закомментирован.

// Если адрес обязателен для операции, проверка с ошибкой лучше маскировки:
function getRequiredStreet(user: Person): string {
    if (user.address === undefined) {
        throw new Error('Для этой операции нужен адрес');
    }
    return user.address.street; // После проверки ! уже не нужен.
}
// ! иногда используют при внешней гарантии, которую TS не видит.
// Но ?. и ! не взаимозаменяемы: первое обрабатывает отсутствие, второе его отрицает.
// Не путай user.address! с !user.address: второе — логическое отрицание.

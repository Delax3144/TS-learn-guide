export {};

// Перегрузки функций (overloads) описывают несколько разрешённых способов вызова.
// Сверху — сигнатуры без тела, снизу — одна общая реализация.
// В JavaScript останется одна функция; отдельные реализации не создаются.

// 1. Пример makeDate со скриншота: один аргумент ИЛИ три аргумента.
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
    if (d !== undefined && y !== undefined) {
        return new Date(y, mOrTimestamp, d);
    }
    return new Date(mOrTimestamp);
}
const d1 = makeDate(12345678); // Timestamp в миллисекундах с 1970-01-01T00:00:00Z.
const d2 = makeDate(5, 5, 2026); // 5 июня 2026 в локальном часовом поясе.
// const d3 = makeDate(1, 3); // Ошибка: перегрузки с двумя аргументами нет.
// Реализация содержит d? и y?, но её сигнатура не доступна вызывающему TS-коду.
// Внешние вызовы проверяются только по двум объявлениям выше.
// У new Date(y, m, d) месяцы 0–11. Июнь — 5, январь — 0.
// На скриншоте makeDate(5, 5, 5): год 5 даёт 1905 из-за правил Date для годов 0–99.
// Перегрузки проверяют типы/число аргументов, а не корректность календарной даты.

// 2. Пример parseInput со скриншота: результат зависит от типа аргумента.
function parseInput(input: string): string[];
function parseInput(input: number): number;
function parseInput(input: string | number): string[] | number {
    if (typeof input === 'string') {
        return input.split(' ');
    }
    return input * 2;
}
const words = parseInput('TypeScript это удобно'); // string[].
const doubled = parseInput(10); // number, значение 20.
const joined = words.join(', '); // Не требуется проверять, массив ли это.
const fixed = doubled.toFixed(2); // Не требуется проверять, число ли это.
// split(' ') разделяет по одному пробелу; несколько пробелов дадут пустые элементы.

// Важное ограничение: аргумент string | number не подходит ни одной
// отдельной перегрузке. Общая сигнатура реализации не разрешает такой вызов.
function parseUnknownVariant(value: string | number): string[] | number {
    // return parseInput(value); // Ошибка выбора перегрузки.
    if (typeof value === 'string') return parseInput(value);
    return parseInput(value);
}

// Когда результат одинаков для всех вариантов, обычный union часто проще:
function getLength(value: string | string[]): number {
    return value.length;
}
const textLength = getLength('hello'); // 5.
const arrayLength = getLength(['a', 'b']); // 2.

// Тело функции тоже нужно проверять: перегрузки не доказывают, что каждой
// ветке реализации соответствует обещанный результат. Держи проверки явными.
// Запомнить: несколько сигнатур, одна реализация, корректные примеры вызовов.

export {};

// Условный тип: T extends U ? Yes : No.
// Компилятор проверяет совместимость типов и выбирает тип результата.
// Это не if в JavaScript: данные не проверяются и не преобразуются.
type IsString<T> = T extends string ? true : false;
const stringCheck: IsString<string> = true;
const numberCheck: IsString<number> = false;

// infer объявляет переменную типа внутри шаблона после extends.
// «Если T подходит под эту структуру, извлеки её часть и назови U».
// Это работает в условных типах, а не в обычных выражениях JavaScript.

// Пример со скриншота. Там была ошибка: функция обещала number, но возвращала ''.
function fn(arg1: string, arg2: number): number {
    return arg1.length + arg2;
}

type MyParameters<T> = T extends (...args: infer U) => any ? U : never;
type MyReturnType<T> = T extends (...args: any[]) => infer U ? U : never;
// Здесь any используется только в шаблоне типа функции: нас не интересует
// результат для MyParameters и параметры для MyReturnType. Это не any для данных.
// Не заменяй механически any[] на unknown[]: совместимость параметров изменится.

// MyParameters: T — функция? Тогда U — кортеж её параметров; иначе never.
// MyReturnType: T — функция? Тогда U — её возвращаемый тип; иначе never.
type FnArgs = MyParameters<typeof fn>; // [arg1: string, arg2: number].
type FnReturnType = MyReturnType<typeof fn>; // number.
const args: FnArgs = ['hello', 2];
const result: FnReturnType = fn(...args); // 7.
// const badArgs: FnArgs = [2, 'hello']; // Ошибка порядка и типов аргументов.
type NotAFunction = MyReturnType<string>; // never.

// В прикладном коде используй готовые утилиты:
type StandardArgs = Parameters<typeof fn>;
type StandardResult = ReturnType<typeof fn>;
// Наши версии нужны для понимания infer, это не полная копия встроенных:
// например, ReturnType<string> — ошибка ограничения, а MyReturnType<string> — never.

// Извлечение типа элемента массива — пример со второго скриншота.
type GetArrayItem<T extends unknown[]> = T extends (infer ItemType)[] ? ItemType : never;
const array: number[] = [];
type ArrayItem = GetArrayItem<typeof array>; // number.
const item: ArrayItem = 42;
// Массив пустой, но его тип уже number[]. infer изучает ТИП, а не содержимое!
// Здесь вместо any[] достаточно unknown[]: это ограничение массива, не параметров функции.
// GetArrayItem<string> использовать нельзя: string не удовлетворяет ограничению массива.

const users = [{ id: '1', name: 'Vasya' }];
type UserItem = GetArrayItem<typeof users>; // { id: string; name: string }.
const anotherUser: UserItem = { id: '2', name: 'Anna' };
// Для простого извлечения элемента есть короткий эквивалент без infer:
type SameArrayItem = (typeof array)[number]; // number.

// Дополнительная особенность: условие с отдельным T слева от extends
// применяется к каждому члену union отдельно (distributive conditional type).
type OnlyStrings<T> = T extends string ? T : never;
type TextOnly = OnlyStrings<string | number>; // string | never -> string.
// На этой идее работают Exclude/Extract. Пока достаточно понимать этот пример.

// Для перегруженных функций Parameters/ReturnType используют последнюю
// сигнатуру перегрузки, а не выбирают тип по воображаемому вызову.
// Не нужно применять infer к каждой функции: он нужен при создании своих утилит типов.
// Закрепи: что сопоставляется с шаблоном, какую часть извлекает infer и что будет иначе.

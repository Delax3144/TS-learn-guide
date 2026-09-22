export {};

// Утверждение типа (type assertion) и преобразование значения — разные вещи.
// as меняет представление компилятора о типе, но не само значение в JavaScript.
// Используй только когда знаешь факт, который компилятор не может доказать.
interface Person {
    age: number;
    username: string;
    password: string;
}

const incompletePerson = { age: 25, username: 'Vasya' } as Person;
// TS считает password строкой, но свойства нет: при чтении получится undefined.
// incompletePerson.password.toUpperCase(); // Упадёт при выполнении.
// Это пример опасного утверждения, а не способ создать полноценный Person.

// Альтернативный синтаксис: <Person>{ ... }. Смысл тот же, но в .tsx
// он недоступен из-за конфликта с JSX. Для чтения примеров достаточно знать as.

const fakeNumber = '123' as unknown as number;
// Двойное утверждение обходит проверку совместимости. Значение осталось строкой!
const actualType = typeof fakeNumber; // 'string' во время выполнения.
const realNumber = Number('123'); // 123 — настоящее преобразование значения.
// Number('hello') даст NaN: преобразование тоже требует осмысленной проверки.

// satisfies проверяет соответствие типу, не заменяя тип выражения целиком
// указанным типом. Это полезно для локальных объектов и конфигураций.
const person = {
    age: 25,
    username: 'Vasya',
    password: 'example-only',
} satisfies Person;
// Убери password — компилятор заметит ошибку.
// Не ставь перед satisfies «as Person»: так ты заранее заставишь TS поверить типу.

type ColorSettings = { color: 'red' | 'green' };
const settings = { color: 'green' } satisfies ColorSettings;
// settings.color имеет тип 'green'. satisfies не делает свойства readonly.
// Проверка существует только при компиляции: внешние данные она не валидирует.

// as const сохраняет литералы и делает свойства объектного литерала readonly.
// Это отдельный полезный приём, его не нужно путать с «as произвольный тип».
const PersonKeys = {
    age: 'age',
    username: 'username',
    password: 'password',
} as const;

// Generic не проверяет JSON. Такая функция только обещает вызывающему коду T.
// Сохраняем пример как предупреждение; для внешних данных его недостаточно.
function parseJsonUnchecked<T>(text: string): T {
    return JSON.parse(text) as T;
}
// Корректный JSON требует двойных кавычек у имён свойств.
// JSON.parse('{age:25}') бросит SyntaxError до любых проверок TypeScript.
const claimedPerson = parseJsonUnchecked<Person>('{"age":25}');
// claimedPerson по типу Person, но в действительности username и password нет.

// Для неизвестных данных сначала unknown, затем реальные проверки.
function parseJson(text: string): unknown {
    return JSON.parse(text);
}
const parsed: unknown = parseJson('{"age":25}');
if (typeof parsed === 'object' && parsed !== null && 'age' in parsed) {
    if (typeof parsed.age === 'number') {
        const nextAge = parsed.age + 1;
        // Проверен только age. Полный Person этим ещё не подтверждён.
    }
}
// Неверный синтаксис JSON всё ещё может бросить исключение.

// Аналогично у fetch: ответ сервера не становится проверенным из-за аннотации.
async function loadUnknownJson(url: string): Promise<unknown> {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data: unknown = await response.json();
    return data; // Поля нужно проверять отдельно. Здесь запрос не запускается.
}

// Пример из видео: удобная, но НЕ универсально безопасная обёртка.
function keysUnchecked<T extends object>(data: T): Array<keyof T> {
    return Object.keys(data) as Array<keyof T>;
}
// Реальный объект может иметь больше полей, чем известно его типу:
const full = { username: 'Vasya', age: 25 };
const named: { username: string } = full;
const claimedKeys = keysUnchecked(named); // По типу: 'username'[].
const actualKeys = Object.keys(named); // При выполнении: ['username', 'age'].
// Object.keys возвращает собственные перечисляемые строковые ключи;
// keyof — ключи типа, включая в общем случае number/symbol. Это разные вещи.
// Не оборачивай Object.keys в as автоматически ради устранения ошибки.

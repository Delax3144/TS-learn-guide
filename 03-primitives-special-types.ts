export {};

// Примитивы: string, number, bigint, boolean, undefined, null, symbol.
// Пиши bigint, а не bigInt. Используй string/number, а не String/Number.
const name: string = 'Vasya';
const age: number = 25;
const largeNumber: bigint = 10n;
const active: boolean = true;
const missing: undefined = undefined;
const empty: null = null;
const key: symbol = Symbol('key');

// any отключает проверку операций со значением. Иногда нужен при миграции,
// но легко скрывает ошибки. Для неизвестных данных предпочитай unknown.
function unsafeLength(value: any) {
    return value.length; // Компилятор разрешает; с null будет ошибка выполнения.
}

// unknown принимает любое значение, но использовать его можно после проверки.
function describe(value: unknown): string {
    if (typeof value === 'string') return value.toUpperCase();
    return 'Не строка';
}

// never — значений нет. Подходит для функции, которая не завершается нормально.
// Это подтип всех типов. any имеет особые правила и не присваивается never.
function fail(message: string): never {
    throw new Error(message);
}

// void — вызывающий код не должен использовать результат функции.
function logMessage(message: string): void {
    console.log(message);
}
// Функция без return в JavaScript возвращает undefined; void не равен never.
// У callback с типом () => void фактический результат может быть, но игнорируется.
const notify: () => void = () => 123;
// При strictNullChecks null и undefined не подходят обычному string или number.

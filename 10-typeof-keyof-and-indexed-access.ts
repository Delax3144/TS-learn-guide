export {};

// typeof в JavaScript возвращает строку во время выполнения.
// typeof в описании типа TypeScript получает тип уже существующего значения.
const person = { age: 25, username: 'Vasya' };
const runtimeType = typeof person; // Значение 'object'.
type Person = typeof person; // Тип { age: number; username: string }.
// Полезно, когда объект уже есть и не хочется вручную повторять его структуру.

let color = 'red';
type ColorText = typeof color; // string, а не литерал 'red': let можно менять.
const green: ColorText = 'green';
const fixedColor = 'red';
type RedColor = typeof fixedColor; // 'red'.

function getAge(user: Person): number {
    return user.age;
}
type GetAgeFn = typeof getAge; // (user: Person) => number.
type GetAgeResult = ReturnType<typeof getAge>; // number.
type GetAgeArguments = Parameters<typeof getAge>; // [user: Person].
// ReturnType берёт тип результата, Parameters — кортеж типов аргументов.
// typeof getAge здесь не вызывает функцию и не получает её результат.

// keyof получает union ключей ТИПА, а не массив строк при выполнении.
type PersonKey = keyof Person; // 'age' | 'username'.
type SameKeys = keyof typeof person; // Сначала тип объекта, затем ключи типа.
const selectedKey: PersonKey = 'username';
// const wrongKey: PersonKey = 'email'; // Ошибка: такого ключа нет.

// T[K] — тип значения свойства K в типе T (indexed access).
type PersonAge = Person['age']; // number.
type PersonValues = Person[keyof Person]; // number | string.

function getByKey<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}
// T — тип объекта; K — выбранный ключ; extends keyof T запрещает чужие ключи.
// Возвращаемый T[K] сохраняет связь между ключом и типом результата.
const age = getByKey(person, 'age'); // number, значение 25.
const username = getByKey(person, 'username'); // string, значение 'Vasya'.
// getByKey(person, 'email'); // Ошибка ещё до запуска.
// Применение: чтение свойств в общих функциях для таблиц и форм.
// Для одного известного объекта person.age обычно проще, чем отдельная утилита.

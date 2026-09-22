export {};

// Продолжение 04-interface-type.ts: сравнение на примерах из видео.
// Для обычных объектов подходят и interface, и type.
interface Base {
    username: string;
    age: number;
}
interface User extends Base {
    password: string;
}
type UserAlias = Base & { password: string };

// При расширении interface конфликт типов свойства выявляется в объявлении.
// При intersection несовместимые требования могут дать свойству тип never.
// interface BadUser extends Base { age: string } // Ошибка расширения.
type ImpossibleAge = Base & { age: string }; // age: number & string -> never.
// & — совместные требования, а не замена типа уже существующего свойства.

// Повторные объявления interface объединяются в одной области видимости.
interface MergedUser {
    username: string;
    age: number;
}
interface MergedUser {
    password: string;
}
const mergedUser: MergedUser = {
    username: 'Vasya',
    age: 25,
    password: 'example-only',
};
// Нужны все три свойства. Повторный type с тем же именем будет ошибкой.
// Объединение бывает нужно при расширении библиотечных объявлений;
// в обычном коде удобнее держать форму одного объекта в одном месте.

// type также задаёт имя union, массиву, кортежу и другим типам.
type Color = 'red' | 'green';
type Ids = number[];

// Кортеж (tuple) фиксирует типы по позициям и число элементов при проверке TS.
type Tuple = [number, string, 5];
const tuple: Tuple = [10, 'hello', 5];
// Третий элемент — именно литерал 5, а не любое число.
// const wrong: Tuple = [10, 'hello', 6]; // Ошибка.
// У обычного (number | string)[] нет такой связи типа с позицией.
// Но обычный кортеж остаётся изменяемым массивом: например, tuple.push(5) разрешён.
// Это не защита длины во время выполнения. Для запрета таких операций через тип
// используй readonly [number, string, 5]; readonly не вызывает Object.freeze.

type StatePair<T> = [T, (newValue: T) => void];
// Похожая форма встречается у useState в React, но это упрощённая модель:
// настоящий setter React также принимает функцию обновления.
// Здесь описаны текущее значение T и функция, принимающая новое T.
// Название StatePair точнее исходного SetState: тип описывает всю пару.
// Само объявление типа не создаёт состояние и не обновляет интерфейс.

// Функцию можно описать и через type, и через call signature в interface.
type Formatter = (arg: number) => string;
interface FormatterInterface {
    (arg: number): string;
}
const formatNumber: Formatter = (arg) => arg.toFixed(2);
const formatId: FormatterInterface = (arg) => `ID: ${arg}`;
// В обоих случаях аргумент — number, результат — string.
// Простые функции обычно короче описывать через type.
// Неверное правило: «interface не умеет описывать функции» — умеет, как выше.

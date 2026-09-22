export {};

// Union (|) — значение подходит хотя бы под один из типов.
// Используй для вариантов входных данных. Это не строгое «либо одно, либо другое».
type MainInfo = { firstname: string; lastname: string };
type AdditionalInfo = { age: number };
type Info = MainInfo | AdditionalInfo;

const nameOnly: Info = { firstname: 'Vasya', lastname: 'Ivanov' };
const ageOnly: Info = { age: 25 };
const both: Info = { firstname: 'Vasya', lastname: 'Ivanov', age: 25 };

// Intersection (&) — значение должно соответствовать обоим типам.
// Используй для объединения требований к объекту.
type FullInfo = MainInfo & AdditionalInfo;
const fullInfo: FullInfo = { firstname: 'Vasya', lastname: 'Ivanov', age: 25 };

// Ошибка: у Info нельзя читать firstname без проверки — возможен только age.
// Ошибка: & не выбирает один тип. string & number даёт never:
// значение не может одновременно быть строкой и числом.

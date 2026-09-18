// Union и Intersection
type MainInfo = {
    firstname: string;
    lastname: string;
}

type AdditionalInfo = {
    age: number;
}

type FullInfo = AdditionalInfo | MainInfo; // Union - типо Или
type FullInfo1 = AdditionalInfo & MainInfo; // Intersection - типо И

const info0: FullInfo = { firstname: '123', lastname: '123', age: 123 }
const info1: FullInfo = { firstname: '123', lastname: '123' }
const info2: FullInfo = { age: 123 } 


// Надтип(super type) и Подтип(subtype)

// Подтип включает все свойства и/или методы надтипа, плюс может добавлять свои.
// Надтип может содерждать меньше свойств и/или методов, чем подтип.
// Обьект подтипа может быть присвоен переменной надтипа. Обратное не всегда возможно без приведения типов.


// Примитивы

// string, number, bigInt, boolean, undefined, null, symbol.


// Специальные типы

// any - отключает любую проверку типов и убивает всю эффективность TS. В продакшн не использовать!!! Является и супертипом и подтипом.
// unknown - безопасный способ, когда мы не знаем какой тип ожидается на вход, сделать его неизвестным и засчет проверок безопасно его обработвать. Является супертипом всех других типов.
// never - пустое множество. Является подтипом всех других типов.
// void - типо который означает что функция ничего не возвращает.
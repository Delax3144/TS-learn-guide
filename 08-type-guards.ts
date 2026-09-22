export {};

// Type guard — проверка, которая помогает сузить тип.
// Именованная функция с предикатом value is Type удобна для повторного использования.
interface Car { maxSpeed: number; width: number }
interface Person { age: number; name: string }
interface Audi extends Car { type: 'audi' }
interface Bmw extends Car { type: 'bmw' }

function isBmw(value: Audi | Bmw): value is Bmw {
    return value.type === 'bmw';
}
function isCar(value: Car | Person): value is Car {
    return 'maxSpeed' in value && 'width' in value;
}
function isPerson(value: Car | Person): value is Person {
    return 'age' in value && 'name' in value;
}
// Исправление: isPerson обещает Person, а не Car.
function describe(value: Car | Person): string {
    if (isPerson(value)) return `${value.name}, ${value.age}`;
    return `Скорость: ${value.maxSpeed}`;
}

// Эти проверки рассчитаны на уже типизированные варианты union.
// Для внешнего unknown нужны дополнительные проверки объекта и типов полей.
// TS доверяет явно написанному предикату: неверная проверка может обмануть
// компилятор. Предикат должен соответствовать тому, что проверяется в теле.

export {};

// Narrowing — сужение типа после проверки. Нужно, чтобы безопасно
// использовать конкретный вариант union без any и приведений через as.
function format(value: number | string | null): string {
    if (typeof value === 'number') return value.toFixed(2);
    if (typeof value === 'string') return value.toUpperCase();
    return 'Нет значения'; // Здесь остался null.
}
// typeof null === 'object': для null нужна отдельная проверка.

function compare(value: number | string | null, other: number): string {
    if (value === null) return 'null';
    if (value === '123') return value; // Здесь литерал '123'.
    if (value === other) return value.toFixed(0); // Здесь number.
    return String(value);
}

interface User { username: string; age: number }
interface Person { firstname: string; lastname: string; age: number }
function getName(value: User | Person): string {
    if ('username' in value) return value.username;
    return `${value.firstname} ${value.lastname}`;
}
// in проверяет наличие свойства. Необязательное общее свойство не всегда
// позволяет однозначно отличить варианты.

class Bmw {
    bmwDrive(): string { return 'Едет BMW'; }
}
class Audi {
    audiDrive(): string { return 'Едет Audi'; }
}
function drive(car: Bmw | Audi): string {
    if (car instanceof Bmw) return car.bmwDrive();
    return car.audiDrive();
}
// instanceof работает с конструкторами классов. Интерфейсов в JavaScript нет.

interface BaseCar { maxSpeed: number; weight: number }
interface BmwCar extends BaseCar { type: 'bmw'; bmwField: string }
interface AudiCar extends BaseCar { type: 'audi'; audiField: string }
interface ToyotaCar extends BaseCar { type: 'toyota'; toyotaField: string }
type Car = BmwCar | AudiCar | ToyotaCar;

// Discriminated union: общее поле type содержит разные литералы.
function getCarDetail(car: Car): string {
    switch (car.type) {
        case 'bmw': return car.bmwField;
        case 'audi': return car.audiField;
        case 'toyota': return car.toyotaField;
    }
}
// Проверка if (value) отсеивает также 0 и ''. Пустой массив [] — truthy.

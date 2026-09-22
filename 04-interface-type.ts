export {};

// interface описывает форму объекта. type задаёт псевдоним любого типа,
// включая union, литералы и функции. Для обычных объектов подходят оба.
interface Address {
    city?: string;
    street?: string;
    coords: number[];
}

type User = {
    firstname: string;
    age?: number;
    address: Address;
};

const user: User = {
    firstname: 'Vasya',
    address: { coords: [52.23, 21.01] },
};
// ? означает, что свойства может не быть. При чтении учитывай undefined.
// number[] не гарантирует ровно две координаты — здесь оставлен обычный массив.

interface Named { name: string }
interface Employee extends Named { company: string }
type OnClick = () => void;
type ComponentProps = { className: string; color: 'red' | 'green' };

// Интерфейсы с одинаковым именем объединяются; псевдонимы type — нет.
// Не давай независимым классам и интерфейсам одинаковые имена:
// они могут случайно объединить объявления и запутать проверку типов.
// Ни interface, ни type не проверяют данные во время выполнения.

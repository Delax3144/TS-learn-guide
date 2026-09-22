export {};

// Надтип — более широкий набор допустимых значений, подтип — более узкий.
// Подтип можно использовать там, где ожидается надтип.
type Person = { name: string };
type Employee = Person & { company: string };

const employee: Employee = { name: 'Vasya', company: 'Example' };
const person: Person = employee;
// Поле company осталось в объекте, но через person доступно только name.
// const anotherEmployee: Employee = person; // Ошибка: company не гарантировано.

// TS сравнивает структуру объектов, а не названия типов.
// Дополнительные обязательные поля сужают множество подходящих объектов.
// У свежего объектного литерала есть отдельная проверка лишних полей:
// const direct: Person = { name: 'Vasya', company: 'Example' }; // Ошибка.

// Подтип — не только объект с дополнительными полями:
const specific: 'green' = 'green';
const general: string = specific; // Литерал 'green' — подтип string.
// Приведение через as не добавляет недостающие поля и не проверяет данные.

export {};

// Литеральный тип — конкретное значение. Union литералов ограничивает выбор.
// Применяй для цветов, размеров, статусов и других известных вариантов.
type Color = 'red' | 'green' | 'blue';
type Size = 4 | 8 | 16;
type Bool = false | true; // То же множество значений, что boolean.

function paint(color: Color): string {
    return `Цвет: ${color}`;
}

// const запрещает заменить переменную, но не изменить её объект.
// Без as const свойство color здесь обычно имеет широкий тип string.
const values = { color: 'green' } as const;
paint(values.color);
// as const сохраняет литералы и делает свойства литерала readonly в типах.
// Это не Object.freeze: защита действует при проверке TypeScript.

interface User { readonly id: string }
const user: User = { id: '1' };
// user.id = '2'; // Ошибка: readonly запрещает присваивание через этот тип.

type EventName = 'click' | 'change';
type EventHandler = `on${EventName}`; // 'onclick' | 'onchange', без заглавной C.
type UserId = `user_id_${string}`;
const userId: UserId = 'user_id_123';
// Объектный литерал — запись объекта, а не отдельный примитивный тип.

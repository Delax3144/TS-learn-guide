export {};

// enum — именованный набор значений. Обычный enum создаёт объект в JavaScript,
// поэтому его члены можно использовать при выполнении, в отличие от type/interface.
enum Color {
    Red = 'red',
    Green = 'green',
    Blue = 'blue',
}
function setColor(color: Color): string {
    return `Цвет: ${color}`;
}
const selectedColor = setColor(Color.Blue); // 'Цвет: blue'.
// setColor('blue'); // Для этого enum передавай Color.Blue, а не сырую строку.
// enum сам не валидирует строку, пришедшую от сервера.

// У числового enum значения без явной инициализации увеличиваются на 1.
enum NumericColor {
    Red, // 0.
    Green, // 1.
    Blue = 5,
    Yellow, // 6.
}
// Числовые enum поддерживают обратное отображение: значение -> имя.
const colorName = NumericColor[5]; // 'Blue'.
// У строкового Color такого обратного отображения нет.
// Внешние коды лучше задавать явно: перестановка членов меняет авто-нумерацию.

// Альтернатива: обычный объект JavaScript + as const и тип его значений.
const COLORS = {
    RED: 'red',
    GREEN: 'green',
    BLUE: 'blue',
} as const;

type ValueOf<T> = T[keyof T];
type ColorValue = ValueOf<typeof COLORS>; // 'red' | 'green' | 'blue'.
// typeof COLORS -> тип объекта; keyof -> 'RED' | 'GREEN' | 'BLUE';
// T[keyof T] -> union типов ЗНАЧЕНИЙ, а не названий ключей.
function setColorValue(color: ColorValue): string {
    return `Цвет: ${color}`;
}
const fromObject = setColorValue(COLORS.BLUE);
const fromLiteral = setColorValue('blue'); // Здесь строковый литерал разрешён.
// Если нужны только допустимые строки, достаточно type Color = 'red' | 'green'.

// const enum: при обычной компиляции tsc значения подставляются в места использования,
// а сам объект удаляется (без preserveConstEnums). Поведение зависит от сборки.
const enum InternalColor {
    Red = 'red',
    Green = 'green',
    Blue = 'blue',
}
const internalColor = InternalColor.Blue;
// Не выбирай const enum только ради «оптимизации»: у него есть ограничения
// совместимости с инструментами и при публикации библиотек. Сейчас достаточно
// узнавать синтаксис; детали можно изучить, когда они понадобятся в проекте.

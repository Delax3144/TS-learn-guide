export {};

// Mapped type строит новый тип, перебирая ключи другого типа.
// Это «перебор» при проверке типов: объектов и циклов в JavaScript не появляется.
// Полезен, когда нужно изменить правила для всех полей и не дублировать их вручную.
interface User {
    name: string;
    age: number;
    friends: string[];
}

type OptionalNullableReadonly<T> = {
    readonly [K in keyof T]?: T[K] | null;
};
// keyof T — ключи; K — очередной ключ; T[K] — исходный тип его значения.
// readonly запрещает присвоить полю новое значение, ? разрешает отсутствие,
// | null дополнительно разрешает явно записать null. Это три разных изменения.
type UserDraft = OptionalNullableReadonly<User>;
const draft: UserDraft = { name: 'Vasya', age: null };
// draft.name = 'Anna'; // Ошибка: поле readonly.
// При чтении draft.age возможны number, null и undefined.

type EditableOptional<T> = {
    -readonly [K in keyof T]?: T[K];
};
const editableDraft: EditableOptional<UserDraft> = { name: 'Vasya' };
editableDraft.name = 'Anna'; // -readonly разрешил присваивание.
editableDraft.age = null; // null не исчез: мы не исключали его из типа значения.

type RequiredFields<T> = {
    [K in keyof T]-?: T[K];
};
// -? убирает необязательность. Готовый аналог — Required<T> (следующий файл).
type CompleteUserDraft = RequiredFields<EditableOptional<UserDraft>>;
const completeDraft: CompleteUserDraft = { name: 'Vasya', age: 25, friends: [] };
// Типы не заполняют поля сами: объект нужно создать с нужными значениями.

// Модификаторы здесь поверхностные. readonly friends не запрещает friends.push().
const withFriends: UserDraft = { friends: ['Anna'] };
withFriends.friends?.push('Max'); // Массив внутри по-прежнему изменяемый.
// Для запрета изменения самого массива нужен readonly string[] или ReadonlyArray<string>.

// Пример из видео назывался ArrayAnalog, но это только числовые ключи,
// а не полноценный массив: length, map и push этот тип не обещает.
type NumberIndexed<T> = {
    [K in number]: T;
};
const labels: NumberIndexed<string> = { 0: 'Первый', 1: 'Второй' };
const firstLabel = labels[0]; // string | undefined при noUncheckedIndexedAccess.
// Для обычного массива используй string[]; не заменяй его таким типом.

// as внутри mapped type изменяет/фильтрует КЛЮЧИ. Это не утверждение value as Type.
type WithoutType<T> = {
    [K in keyof T as Exclude<K, 'type'>]: T[K];
};
type TypedUser = User & { type: 'user' };
type UserWithoutTag = WithoutType<TypedUser>;
const userWithoutTag: UserWithoutTag = { name: 'Vasya', age: 25, friends: [] };
// Для ключа 'type' Exclude даёт never, поэтому этот ключ не попадает в новый тип.
// Простой готовый аналог — Omit<TypedUser, 'type'>.
// Исключение ключа из ТИПА не удаляет свойство из существующего объекта.

// Запомнить: [K in keyof T], T[K], readonly/-readonly, ?/-?.
// Писать свой mapped type стоит для преобразования, которого нет среди готовых utility types.

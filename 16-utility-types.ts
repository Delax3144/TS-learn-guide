export {};

// Utility types — готовые преобразования типов. Их не нужно импортировать.
// Они помогают описывать формы, обновления, словари и результаты функций.
// Они не изменяют объекты и строки во время выполнения.
interface User {
    name: string;
    age: number;
    type: 'user';
    friends: string[];
}
const user: User = { name: 'Vasya', age: 25, type: 'user', friends: ['Anna'] };

// Partial<T> делает все свойства необязательными — удобно для частичного обновления.
type UserPatch = Partial<User>;
const patch: UserPatch = { age: 26 };
function updateUser(current: User, changes: UserPatch): User {
    const updated = { ...current, ...changes };
    // При текущем tsconfig Partial разрешает явно передать undefined.
    // Защищаем итоговый объект, а не считаем Partial проверкой внешних данных.
    if (updated.name === undefined || updated.age === undefined ||
        updated.type === undefined || updated.friends === undefined) {
        throw new Error('Поля пользователя не должны быть undefined');
    }
    return updated;
}
const updatedUser = updateUser(user, patch); // age: 26, остальные поля сохранены.

// Required<T> делает свойства обязательными; не подставляет значения автоматически.
type Preferences = { theme?: string; notifications?: boolean };
const preferences: Required<Preferences> = { theme: 'dark', notifications: false };

// Readonly<T> запрещает присваивание свойствам, но не замораживает объект в JS.
const readonlyUser: Readonly<User> = user;
// readonlyUser.age = 26; // Ошибка компиляции.
// readonlyUser.friends.push('Max') всё ещё допустим: Readonly поверхностный.

// Record<Keys, Value> — объект, где каждый ключ Keys имеет значение типа Value.
type Color = 'red' | 'green' | 'blue' | 'yellow';
const colorsArray: Record<Color, string[]> = {
    red: ['Ошибка'],
    green: ['Готово'],
    blue: ['Информация'],
    yellow: ['Предупреждение'],
};
// В этом Record обязательны все четыре известных ключа.
const someColors: Partial<Record<Color, string[]>> = { blue: ['Подсказка'] };
// Partial поверх Record делает каждый из этих ключей необязательным.

// Pick<T, Keys> оставляет указанные свойства, Omit<T, Keys> исключает их из типа.
type UserCard = Pick<User, 'name' | 'friends'>;
type UserDetails = Omit<User, 'name' | 'friends'>; // { age: number; type: 'user' }.
const card: UserCard = { name: user.name, friends: user.friends };
const details: UserDetails = { age: user.age, type: user.type };
// Если просто написать const card: UserCard = user, лишние поля останутся в объекте.
// Чтобы реально выбрать поля, нужно создать новый объект, как выше.

// Exclude и Extract работают с ВАРИАНТАМИ UNION, а не с полями объекта.
type WarmColor = Exclude<Color, 'blue' | 'green'>; // 'red' | 'yellow'.
type CoolColor = Extract<Color, 'blue' | 'green'>; // 'blue' | 'green'.
const warmColor: WarmColor = 'red';
const coolColor: CoolColor = 'blue';
// Omit<User, 'age'> убирает поле; Exclude<Color, 'blue'> убирает вариант union.

// ReturnType берёт тип результата функции; Parameters — кортеж типов параметров.
function formatScore(score: number, label: string): string {
    return `${label}: ${score}`;
}
type ScoreResult = ReturnType<typeof formatScore>; // string.
type ScoreArguments = Parameters<typeof formatScore>; // [score: number, label: string].
const args: ScoreArguments = [10, 'Баллы'];
const scoreText: ScoreResult = formatScore(...args);

// Awaited<T> извлекает тип результата ожидания Promise, включая вложенные Promise.
async function loadUser(): Promise<User> {
    return user; // Учебный пример без сетевого запроса.
}
type LoadedUser = Awaited<ReturnType<typeof loadUser>>; // User.
const loadedUser: LoadedUser = user;
// Awaited только вычисляет тип; для получения значения используется await в JS.

// Строковые утилиты преобразуют строковые ТИПЫ, но не значения переменных.
type UpperStatus = Uppercase<'success'>; // 'SUCCESS'.
type LowerStatus = Lowercase<'ERROR'>; // 'error'.
type CapitalizedStatus = Capitalize<'warning'>; // 'Warning'.
type UncapitalizedStatus = Uncapitalize<'Warning'>; // 'warning'.
const upperStatus: UpperStatus = 'SUCCESS';
// const wrong: UpperStatus = 'success'; // Ошибка, автопреобразования нет.
const runtimeUpper = 'success'.toUpperCase(); // Реальное преобразование в JS.

// Сначала закрепи Partial, Pick, Omit, Record и Readonly.
// Остальные достаточно узнавать и находить в документации, когда понадобятся.

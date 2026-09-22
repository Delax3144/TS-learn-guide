export {};

// Assertion function проверяет условие/значение и бросает ошибку при нарушении.
// Если функция завершилась нормально, TypeScript считает утверждение истинным.
// Это удобно, когда дальше код имеет смысл только при выполненном условии.
// asserts — часть типа результата, а не значение, которое нужно вернуть.

// 1. asserts condition — после вызова переданное условие считается истинным.
function assert(condition: unknown, message: string): asserts condition {
    if (!condition) {
        throw new Error(message);
    }
}

interface Product {
    id: string;
    name: string;
    price: number;
}
const products: Product[] = [{ id: 'book', name: 'Книга', price: 20 }];

function getProductName(id: string): string {
    const product = products.find((item) => item.id === id);
    // Сейчас product: Product | undefined.
    assert(product !== undefined, `Товар ${id} не найден`);
    // Теперь product: Product. Значит, asserts condition ТОЖЕ сужает тип!
    return product.name;
}
const productName = getProductName('book'); // 'Книга'.
// getProductName('missing'); // Бросит понятную ошибку вместо чтения поля undefined.

// Эта же форма работает с условием typeof:
function uppercaseInput(value: unknown): string {
    assert(typeof value === 'string', 'Ожидалась строка');
    return value.toUpperCase(); // value сузился до string.
}
const uppercaseName = uppercaseInput('Vasya'); // 'VASYA'.

// 2. asserts value is Type — после успешной проверки аргумент имеет указанный тип.
function assertString(value: unknown): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('Ожидалась строка');
    }
}
function normalizeName(value: unknown): string {
    assertString(value);
    return value.trim(); // Не нужны as string или дополнительный if.
}
const normalizedName = normalizeName('  Vasya  '); // 'Vasya'.

// 3. Практический пример: проверить все обязательные поля внешнего объекта.
interface User {
    id: string;
    name: string;
    age: number;
}
function assertUser(value: unknown): asserts value is User {
    if (typeof value !== 'object' || value === null) {
        throw new Error('Пользователь должен быть объектом');
    }
    if (!('id' in value) || typeof value.id !== 'string') {
        throw new Error('У пользователя должен быть строковый id');
    }
    if (!('name' in value) || typeof value.name !== 'string') {
        throw new Error('У пользователя должно быть строковое имя');
    }
    if (!('age' in value) || typeof value.age !== 'number') {
        throw new Error('Возраст должен быть числом');
    }
    // Проверена форма User. Бизнес-правила (например, возраст >= 0)
    // при необходимости проверяются дополнительно.
}

function parseUser(json: string): User {
    const data: unknown = JSON.parse(json);
    assertUser(data);
    return data; // User получен после проверки, а не через JSON.parse(...) as User.
}
const user = parseUser('{"id":"1","name":"Vasya","age":25}');
const greeting = `Привет, ${user.name}`;

// Пример отказа тоже можно запустить: ошибка обработана и не прерывает весь файл.
function readUserMessage(json: string): string {
    try {
        const parsedUser = parseUser(json);
        return `Привет, ${parsedUser.name}`;
    } catch (error) {
        // Ошибки бывают и от JSON.parse, и от нашей проверки полей.
        return error instanceof Error ? error.message : 'Не удалось прочитать пользователя';
    }
}
const invalidUserMessage = readUserMessage('{"id":"1","name":"Vasya"}');
// 'Возраст должен быть числом'. Проверка действительно выполнилась в JavaScript.

// Отличие от type guard: isUser возвращает boolean для выбора ветки,
// assertUser либо завершится нормально, либо бросит ошибку и прервёт обычный путь.
// Когда отсутствие ожидаемо (например, поиск без результатов), часто лучше
// вернуть undefined и обработать его через if, а не бросать исключение.
// TypeScript доверяет сигнатуре asserts. Пустая функция с таким обещанием
// может обмануть компилятор — проверка в теле обязательна для корректности.

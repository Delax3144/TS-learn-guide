// 1) Создай type ID, который может быть string или number. Напиши функцию printId(id: ID), которая для строки возвращает её в uppercase, а для числа — строку вида "ID: 123". Здесь ты закрепишь union + narrowing.

type ID = string | number;

function printId(id: ID): string {
    if (typeof id === 'string') {
        return id.toUpperCase();
    }
    
    return `ID: ${id}`;
}

// 2) Создай User с id, name, email и Admin с id, name, permissions: string[]. Сделай type Account = User | Admin и функцию, которая определяет тип через in. Не добавляй поле type — здесь хочу именно in.

interface User {
    id: string;
    name: string;
    email: string;
}

interface Admin {
    id: string;
    name: string;
    permissions: string[];
}

type Account = User | Admin

function typeOfAccount(arg: Account): string {
    if ('email' in arg) {
        return `User: ${arg.email}`;
    }

    return `Admin: ${arg.permissions.join(', ')}`;
}

// 3) Создай generic-функцию getFirst<T>(), принимающую массив чего угодно и возвращающую первый элемент или undefined. Проверь её на number[], string[] и массиве объектов пользователей.

function getFirst<T>(arr: T[]): T | undefined {
    if (arr.length === 0) {
        return undefined;
    }

    return arr[0];
}

const numberResult = getFirst([1, 2, 3]);

const stringResult = getFirst(['a', 'b', 'c']);

const users: User[] = [
    {
        id: '1',
        name: 'Vasya',
        email: 'test@test.com'
    }
];

const userResult = getFirst(users)

// 4) Создай generic ApiResponse<T> через discriminated union: success обязан иметь data, error обязан иметь message. Затем напиши handleResponse<T>() без as и без any.

type ApiResponse<T> =
    | {
        status: 'success';
        data: T;
    }
    | {
        status: 'error';
        message: string;
    };

type User1 = {
    id: string;
    name: string;
};

const successResponse: ApiResponse<User1> = {
    status: 'success',
    data: {
        id: '1',
        name: 'Vasya'
    }
};

const errorResponse: ApiResponse<User1> = {
    status: 'error',
    message: 'User not found'
};

function handleResponse<T>(response: ApiResponse<T>) {
    if (response.status === 'success') {
        response.data
    } else {
        response.message
    }
}

// 5) Создай тип LoadingState из трёх состояний: loading, success и error. Для success должны быть данные пользователя, для error — сообщение. Напиши renderState(), используя switch. Это закрепит literal types + discriminated union + narrowing.

type LoadingState = 
    | {
        status: 'loading'
    }
    | {
        status: 'success',
        data: {
            name: string,
            age: number
        }
    }
    | {
        status: 'error',
        message: string
    }

function renderState(arg: LoadingState) {
    switch (arg.status) {
        case 'loading':
            return 
        case 'success':
            return arg.data.name
        case 'error':
            return arg.message
    }
}

// 6) Самое интересное: функция принимает unknown. Она должна вернуть строку, если получила строку; превратить число в строку, если получила число; для всего остального вернуть "Unknown value". any запрещён.

function stringifyValue(value: unknown) {
    if (typeof value === 'string') {
        return value;
    } else if (typeof value === 'number') {
        return value.toString();
    } else return 'Unknown value';
}

// Изолируем учебные имена от других файлов.
export {};

// 7) union и narrowing. Напиши функцию formatValue, которая принимает string | number | null и всегда возвращает строку:
// - Для строки — убирает пробелы по краям и переводит её в верхний регистр.
// - Для числа — возвращает строку с двумя знаками после точки.
// - Для null — возвращает 'Нет значения'.
// Условия: без any и as. Обрати внимание, чтобы число 0 обрабатывалось правильно.

function formatValue(value: string | number | null) {
    if (typeof value === 'string') return value.trim().toUpperCase();
    else if (typeof value === 'number') return value.toFixed(2);
    else return 'Нет значения';
}

// 8) Напиши функцию getLast<T>, которая принимает массив элементов типа T и возвращает последний элемент либо undefined, если массив пустой.
// Условия: без any и as, исходный массив менять нельзя.
// После решения объясни своими словами: зачем здесь нужен T и почему в возвращаемом типе должен быть undefined?

function getLast<T>(arr: T[]): T | undefined {
    if (arr.length === 0) {
        return undefined;
    }

    return arr[arr.length - 1];
}

// 9)

type UserProfile = {
    id: string;
    name: string;
    email: string;
};

type ProfileState = 
    | { 
        status: 'loading';
    }
    | {
        status: 'success';
        data: UserProfile;
    }
    | {
        status: 'error';
        message: string;
    }

function getProfileText(state: ProfileState): string {
    switch (state.status) {
        case 'loading':
            return 'Загрузка профиля...'
        case 'success':
            return `${state.data.name} - ${state.data.email}`
        case 'error':
            return `Ошибка: ${state.message}`
    }
}
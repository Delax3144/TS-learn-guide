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



// 5) Создай тип LoadingState из трёх состояний: loading, success и error. Для success должны быть данные пользователя, для error — сообщение. Напиши renderState(), используя switch. Это закрепит literal types + discriminated union + narrowing.



// 6) Самое интересное: функция принимает unknown. Она должна вернуть строку, если получила строку; превратить число в строку, если получила число; для всего остального вернуть "Unknown value". any запрещён.
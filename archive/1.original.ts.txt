// Union и Intersection
type MainInfo = {
    firstname: string;
    lastname: string;
}

type AdditionalInfo = {
    age: number;
}

type FullInfo = AdditionalInfo | MainInfo; // Union - типо Или
type FullInfo1 = AdditionalInfo & MainInfo; // Intersection - типо И

const info0: FullInfo = { firstname: '123', lastname: '123', age: 123 }
const info1: FullInfo = { firstname: '123', lastname: '123' }
const info2: FullInfo = { age: 123 } 


// Надтип(super type) и Подтип(subtype)

// Подтип включает все свойства и/или методы надтипа, плюс может добавлять свои.
// Надтип может содерждать меньше свойств и/или методов, чем подтип.
// Обьект подтипа может быть присвоен переменной надтипа. Обратное не всегда возможно без приведения типов.


// Примитивы

// string, number, bigInt, boolean, undefined, null, symbol.


// Специальные типы

// any - отключает любую проверку типов и убивает всю эффективность TS. В продакшн не использовать!!! Является и супертипом и подтипом.
// unknown - безопасный способ, когда мы не знаем какой тип ожидается на вход, сделать его неизвестным и засчет проверок безопасно его обработвать. Является супертипом всех других типов.
// never - пустое множество. Является подтипом всех других типов.
// void - типо который означает что функция ничего не возвращает.


// Составные типы

// interface, type

interface Address {
    city?: string;
    street?: string;
    coords: number[]
}

type Userr = {
    firstname: string;
    age?: number;
    address: Address;
}

type ComponentProps = {
    className: string;
    color: 'red' | 'green'
}

type ApiResponse<T> = {
    status: 'success' | 'error';
    data?: T;
}

type onClick = () => void;


// Литералы

// Строковые литералы (string)
// Числовые литералы (number)
// Булевы литералы (boolean)
// Шаблонные строковые литералы
// Составные литералы

type Color = 'red' | 'green' | 'blue';
type Size = 4 | 8 | 16;
type Bool = false | true;

// const values: Color = 'green';
const values = {
    color: 'green'
} as const;

function paint(color: Color) {

}

paint(values.color);

interface User1 {
    readonly id: string;
}

type EventName = 'click' | 'change';

type EventHandler = `on${EventName}`

type Userid = `user_id_${string}`


// Generics (обобщение)

interface User2 {
    username: string,
}

interface Article {
    title: string
}

interface ApiResponse1<T> {
    status?: 'error' | 'success';
    meta?: MediaMetadata;
    requestId?: string;
    data: T;
}

const responseFromUserApi: ApiResponse1<User2> = {
    data: {
        username: 'Vasya'
    }
}

const responseFromArticleApi: ApiResponse1<Article> = {
    data: {
        title: '123'
    }
}

// засчет Дженериков мы делаем типы динамическими, добавляем некоторые изменяемые типы внутрь

interface Tree<T> {
    id: string;
    value: T;
    children: Tree<T>[] | null;
}

const treeNode: Tree<User2> = {
    id: '10',
    value: {
        username: '123'
    },
    children: [
        {
            id: '11',
            value: {
                username: '123'
            },
            children: null,
        }
    ]
}

function genericFn<T>(arg: T) {

}

// const arrowGeneric = <T, V>(arg: T): V => {
//     return arg;
// }

// const data = arrowGeneric<User2, Article>({username: '123'})

interface User3 {
    username: string,
    id: string,
    createdAt: Date
}

// function createEntity<T extends {id: string, createdAt: Date}>(arg: T) {
//     arg.
// }

// createEntity<User3>({})

class Order<T> {
    private data: T;

    constructor(arg: T) {
        this.data = arg;
    }
}

type isArray<T> = T extends any[] ? true : false;

const first:isArray<string> = false;
const second:isArray<string[]> = true;

type User4 = {
    username: string;
}

type RandomName<T> = T extends Userr ? { value: number } : { value: string }

const third:RandomName<{username: string, age: number}> = {value: '123'};


// Narrowing (Сужение типов)

// 1 способ через typeof

function fn(arg: number | string | null) {
    if (typeof arg === 'number') {
        return
    } else if (typeof arg === 'string') {
        return
    }

    return arg;
}

// 2 способ через сравнение

function fn2(arg: number | string | null, arg2: number) {
    if (arg === null) {
        arg
    }

    if (arg === '123') {
        arg
    }

    if (arg === arg2) {
        arg
    }

    return arg;
}

// 3 способ с интерфейсами

interface User5 {
    username: string;
    age: number;
}

interface Person {
    lastname: string;
    firstname: string;
    age: number;
}

function fn3(arg: User5 | Person) {
    if ('username' in arg) {
        arg
    }

    if ('firstname' in arg) {
        arg
    }

    arg
}

// 4 способ с классами

class Bmw {
    bmwDrive() {

    }
}

class Audi {
    audiDrive() {

    }
}

const bmw = new Bmw();
const audi = new Audi();

function fn4(arg: Bmw | Audi) {
    if (arg instanceof Bmw) {
        arg.bmwDrive()
    } else {
        arg.audiDrive()
    }
}

// 5 способ Discriminated unions

interface BaseCar {
    maxSpeed: number;
    weight: number;
}

interface Bmw extends BaseCar {
    type: 'bmw';
    bmwField: string;
}

interface Audi extends BaseCar {
    type: 'audi';
    audiField: string;
}

interface Toyota extends BaseCar {
    type: 'toyota';
    toyotaField: string;
}

type Car = Toyota | Audi | Bmw;

function fn5(arg: Car) {
    switch(arg.type) {
        case 'audi':
            arg.audiField
            break;
        case 'bmw':
            arg.bmwField
            break;
        default:
            arg.toyotaField
    }
}


// Type Guards

interface Car1 {
    maxSpeed: number;
    width: number;
}

interface Person1 {
    age: number;
    name: string;
}

interface Audi1 extends Car1 {
    type: 'audi';
}

interface Bmw1 extends Car1 {
    type: 'bmw';
}

function isBmw(value: Audi1 | Bmw1) : value is Bmw1 {
    return value.type === 'bmw';
}

function isCar(value: Car1 | Person1) : value is Car1 {
    return 'maxSpeed' in value && 'width' in value;
}

function isPerson(value: Car1 | Person1) : value is Car1 {
    return 'age' in value && 'name' in value;
}
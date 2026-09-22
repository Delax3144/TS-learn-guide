# Шпаргалка TypeScript

## Как читать функцию

```ts
function getLast<T>(items: T[]): T | undefined {
    return items[items.length - 1];
}
```

`<T>` — параметр типа; `items: T[]` — вход; `: T | undefined` после скобок — результат.
Generic сохраняет связь типов. Аннотация результата проверяет return, не преобразует
значение. TypeScript часто выводит результат сам, явный тип фиксирует намерение.

## Что выбрать

| Задача | Конструкция | Пример в конспекте |
|---|---|---|
| Разрешить несколько вариантов | `A \| B` | [Union](01-union-intersection.ts) |
| Требовать свойства обоих типов | `A & B` | [Intersection](01-union-intersection.ts) |
| Описать объект | `interface` или `type` | [Объекты](04-interface-type.ts) |
| Ограничить строку вариантами | `'loading' \| 'success'` | [Литералы](05-literals.ts) |
| Сохранить тип входа в результате | `<T>` | [Generics](06-generics.ts) |
| Отличить варианты | `typeof`, `in`, `switch` | [Narrowing](07-narrowing.ts) |
| Переиспользовать проверку для ветвления | `value is User` | [Guards](08-type-guards.ts) |
| Проверить и остановиться при ошибке | `asserts value is User` | [Asserts](17-assertion-functions.ts) |
| Получить тип существующего значения | `typeof obj` в позиции типа | [Операторы типов](10-typeof-keyof-and-indexed-access.ts) |
| Получить ключи типа / тип поля | `keyof T` / `T[K]` | [Операторы типов](10-typeof-keyof-and-indexed-access.ts) |
| Допустить отсутствие объекта | `?.` | [Необязательные значения](11-optional-chaining-and-non-null-assertion.ts) |
| Подставить значение вместо null/undefined | `??` | [Необязательные значения](11-optional-chaining-and-non-null-assertion.ts) |
| Проверить локальную конфигурацию | `satisfies` | [Утверждения и проверки](09-type-assertions-and-satisfies.ts) |
| Сохранить конкретные литералы | `as const` | [Литералы](05-literals.ts) |
| Задать именованные константы | объект `as const` или `enum` | [Перечисления](12-enums-and-const-objects.ts) |
| Описать типы элементов по позициям | кортеж `[string, number]` | [Кортежи](13-interface-vs-type-and-tuples.ts) |
| Изменить правила для всех полей | `[K in keyof T]` | [Mapped types](15-mapped-types.ts) |
| Описать зависимость вызова и результата | перегрузки | [Overloads](18-function-overloads.ts) |
| Вычислить тип по условию / извлечь часть | `extends ? :` / `infer` | [Conditional types](19-conditional-types-and-infer.ts) |

## Готовые утилиты

| Тип | Значение |
|---|---|
| `Partial<User>` | Все свойства необязательные |
| `Required<User>` | Все свойства обязательные |
| `Readonly<User>` | Запрещено присваивание свойствам через этот тип |
| `Pick<User, 'name'>` | Оставить выбранные поля в типе |
| `Omit<User, 'id'>` | Исключить выбранные поля из типа |
| `Record<'red' \| 'blue', string>` | Обязательный строковый результат для каждого ключа |
| `Exclude<A, B>` | Убрать из union A варианты, совместимые с B |
| `Extract<A, B>` | Оставить из union A варианты, совместимые с B |
| `ReturnType<typeof fn>` | Тип результата функции |
| `Parameters<typeof fn>` | Кортеж типов параметров |
| `Awaited<T>` | Тип результата ожидания Promise |
| `Uppercase` / `Lowercase` | Регистр строкового типа |
| `Capitalize` / `Uncapitalize` | Регистр первого символа строкового типа |

Примеры — в [16-utility-types.ts](16-utility-types.ts). Pick/Omit не удаляют реальные
поля, Readonly не замораживает объект, Partial не делает вложенные поля необязательными.

## Похожие записи с разным смыслом

| Запись | Что происходит |
|---|---|
| `age?: number` | Свойство может отсутствовать |
| `user?.age` | При null/undefined вместо доступа получим undefined |
| `user!.age` | Проверки нет; компилятору обещано наличие user |
| `!user` | Логическое отрицание в JavaScript |
| `value as number` | Меняется взгляд компилятора, не значение |
| `Number(value)` | Реальное преобразование; результат может быть NaN |
| `typeof value` в выражении | Строка, например `'number'` |
| `type T = typeof value` | Тип существующего значения |
| `K in keyof T` | Построение типа по ключам |
| `'name' in value` | Реальная проверка наличия свойства |

`unknown` требует проверки, `any` отключает проверки операций, `never` не имеет
значений, `void` означает, что полезный результат функции не предполагается.

## Частые ловушки

- `if (value)` исключает также 0, false и ''. Для отсутствия проверяй null/undefined.
- Пустой массив truthy. Последний индекс — `length - 1`; пустой массив даёт undefined.
- `typeof null` возвращает `'object'`: перед чтением полей исключи null.
- `const` не запрещает менять свойства объекта. `readonly` обычно поверхностный.
- Кортеж без readonly допускает некоторые изменения массива, включая push.
- `JSON.parse(...) as User` не проверяет User. Generic над JSON тоже не проверяет.
- Сигнатура `: string` не вызывает String(...), а `Uppercase<T>` — toUpperCase().
- Обычный объект может иметь больше полей, чем описано в его типе.
- `Object.keys` возвращает строковые ключи реального объекта; это не то же самое, что keyof.
- Предикаты is/asserts должны быть честными: компилятор доверяет их сигнатуре.

## Что делать с сообщением об ошибке

| Сообщение | Что проверить |
|---|---|
| `Type ... is not assignable to ...` | Какой тип нужен и какое поле/вариант отличается |
| `Object is possibly undefined` | Допустимо ли отсутствие; нужен if, ?. или запасное значение |
| `Property ... does not exist` | Правильное ли имя; сужен ли union до нужного варианта |
| `No overload matches this call` | Число и типы аргументов по доступным перегрузкам |
| `Function lacks ending return statement` | Все ли ветки возвращают обещанное значение |
| `Cannot redeclare block-scoped variable` | Есть ли `export {}` для изоляции учебного файла |

Не начинай исправление с as. Сначала объясни, какая гарантия отсутствует.

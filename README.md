# TypeScript: личный конспект

**Начни здесь:** [шпаргалка](21-quick-reference.md) ·
[советы после курса](20-learning-advice.md) · [практика и запуск](22-practice-guide.md).

Для повторения выбирай нужную тему по списку; проходить всё заново не обязательно.

## Результат проверки — 22 сентября 2026

Проверены 20 файлов TypeScript: 18 тематических, оглавление и практика.
Строгая компиляция TypeScript 7.0.2 прошла; все файлы выполняются без необработанных
ошибок в своих верхнеуровневых примерах. Отдельно проверены крайние случаи практики,
проверки asserts и перегрузки. Локальные ссылки в Markdown проверены.
Это не доказательство корректности любого будущего вызова: опасные примеры
специально подписаны, а задачи 4 и 5 ещё нужно завершить — см. руководство по практике.

## Темы

Читай файлы по порядку от `01` до `19`. В тематических `.ts` есть объяснения и примеры.
`14-checkpoint.md` — промежуточная самопроверка; файлы `15`–`19` — конец видео.

1. [01-union-intersection.ts](01-union-intersection.ts) — union и intersection.
2. [02-supertype-subtype.ts](02-supertype-subtype.ts) — надтип, подтип и совместимость.
3. [03-primitives-special-types.ts](03-primitives-special-types.ts) — примитивы и специальные типы.
4. [04-interface-type.ts](04-interface-type.ts) — interface и type.
5. [05-literals.ts](05-literals.ts) — литералы, readonly и as const.
6. [06-generics.ts](06-generics.ts) — функции, контейнеры, ограничения параметров типа.
7. [07-narrowing.ts](07-narrowing.ts) — typeof, сравнения, in, instanceof и discriminated unions.
8. [08-type-guards.ts](08-type-guards.ts) — функции с предикатом типа.
9. [09-type-assertions-and-satisfies.ts](09-type-assertions-and-satisfies.ts) — утверждения типов, satisfies и преобразования.
10. [10-typeof-keyof-and-indexed-access.ts](10-typeof-keyof-and-indexed-access.ts) — typeof, keyof, T[K], ReturnType и Parameters.
11. [11-optional-chaining-and-non-null-assertion.ts](11-optional-chaining-and-non-null-assertion.ts) — ?., ?? и !.
12. [12-enums-and-const-objects.ts](12-enums-and-const-objects.ts) — enum и альтернатива с объектом as const.
13. [13-interface-vs-type-and-tuples.ts](13-interface-vs-type-and-tuples.ts) — различия interface/type, кортежи и типы функций.
14. [14-checkpoint.md](14-checkpoint.md) — промежуточные итоги и упражнение.
15. [15-mapped-types.ts](15-mapped-types.ts) — перебор ключей, модификаторы и фильтрация полей.
16. [16-utility-types.ts](16-utility-types.ts) — примеры всех утилит, отмеченных в твоём конспекте.
17. [17-assertion-functions.ts](17-assertion-functions.ts) — проверки товара, строки и пользователя из JSON.
18. [18-function-overloads.ts](18-function-overloads.ts) — makeDate и parseInput со скриншота.
19. [19-conditional-types-and-infer.ts](19-conditional-types-and-infer.ts) — MyParameters, MyReturnType и GetArrayItem.
20. [20-learning-advice.md](20-learning-advice.md) — советы со слайда и как учиться дальше.
21. [21-quick-reference.md](21-quick-reference.md) — синтаксис, выбор утилит и частые ошибки.
22. [22-practice-guide.md](22-practice-guide.md) — команды проверки, запуск и план пет-проекта.

`Задачи.ts` — отдельная практика с твоими решениями 1–9. При обновлении конспекта
они не изменялись. Заметки по задачам 4 и 5 и новое упражнение — в `14-checkpoint.md`.
`1.ts` — оглавление. Исходный файл сохранён в `archive/1.original.ts.txt`:
это историческая копия с прежними ошибками, а не материал для заучивания.
Оригиналы новых тем и обновляемых заметок лежат в `archive/checkpoint-2026-09-22/`
с окончанием `.txt`, чтобы не участвовать в проверке учебного кода.
Оригиналы тем `15`–`19` перед последним оформлением сохранены в
`archive/final-topics-2026-09-22/`, также с окончанием `.txt`.

`export {}` делает каждый файл отдельным модулем: одинаковые учебные имена
не конфликтуют между файлами. Импортировать все примеры в оглавление не нужно.

Проверка при установленном TypeScript: `tsc -p tsconfig.json`.
Конфигурация включает строгую проверку, учитывает возможный undefined при
обращении к элементу массива и не создаёт JavaScript-файлы.

Для самопроверки объясни пример своими словами: какие значения допускает тип,
что гарантирует проверка и что случится при выполнении JavaScript.
Типы сами по себе не проверяют ответы сервера и не меняют значения.
В новых темах опасные конструкции явно отмечены как примеры риска;
вызовы, которые привели бы к ошибке выполнения, закомментированы.

## После окончания видео

Сначала научись применять Partial, Pick, Omit, Record и Readonly на обычных объектах.
Затем объясни различие is / asserts / as: выбор ветки, проверка с исключением,
утверждение компилятору без проверки значения. В `17` есть готовые примеры.
В `18` важно понимать доступные вызовы и тип результата. В `19` достаточно
прочитать шаблон infer и назвать извлекаемый тип; писать свои утилиты вместо
готовых Parameters и ReturnType каждый раз не требуется.

Официальные пояснения для сверки:

- [Mapped types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [Utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [Assertion functions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions)
- [Перегрузки](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads)
- [Условные типы и infer](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)

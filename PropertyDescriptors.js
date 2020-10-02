//https://learn.javascript.ru/property-descriptors
//Помимо значения value, свойства объекта имеют три специальных атрибута (так называемые «флаги»).
//
// writable – если true, свойство можно изменить, иначе оно только для чтения.
// enumerable – если true, свойство перечисляется в циклах, в противном случае циклы его игнорируют.
// configurable – если true, свойство можно удалить, а эти атрибуты можно изменять, иначе этого делать нельзя.
// обычно они скрыты. Когда мы создаём свойство «обычным способом», все они имеют значение true. Но мы можем изменить их в любое время.
//
// Метод Object.getOwnPropertyDescriptor позволяет получить полную информацию о свойстве.

let user = {
    name: "John"
};

//Чтобы изменить флаги, мы можем использовать метод Object.defineProperty.
//Если свойство существует, defineProperty обновит его флаги. В противном случае метод создаёт новое свойство с указанным значением и флагами; если какой-либо флаг не указан явно, ему присваивается значение false.
Object.defineProperty(user, "name2", {
    value: "John 2"
});

let descriptor = Object.getOwnPropertyDescriptor(user, 'name2');

console.log( JSON.stringify(descriptor, null, 2 ) );
/* дескриптор свойства:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/

//--------------------------------------------------------------------------------------------
//Существует метод Object.defineProperties(obj, descriptors), который позволяет определять множество свойств сразу.
let user2 = {}
//let user2 = {name: "John", surname: "Smith"}
Object.defineProperties(user2, {
  name: { value: "John", writable: false, enumerable: true, configurable: false },
  surname: { value: "Smith", writable: false, enumerable: true, configurable: false },
  // ...
});

let descr = Object.getOwnPropertyDescriptor(user2, "surname")
//console.log(descr);
//console.log(user2.name, user2.surname);
console.log(user2);
// Таким образом, мы можем определить множество свойств одной операцией.

//Чтобы получить все дескрипторы свойств сразу, можно воспользоваться методом Object.getOwnPropertyDescriptors(obj).
// Вместе с Object.defineProperties этот метод можно использовать для клонирования объекта вместе с его флагами:

let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(user2));
console.log(clone);
let descrs = Object.getOwnPropertyDescriptors(clone)
console.log(descrs);

//--------------------------------------------------------------------------------------------
//Дескрипторы свойств работают на уровне конкретных свойств.
//
// Но ещё есть методы, которые ограничивают доступ ко всему объекту:
//
// Object.preventExtensions(obj)
// Запрещает добавлять новые свойства в объект.
// Object.seal(obj)
// Запрещает добавлять/удалять свойства. Устанавливает configurable: false для всех существующих свойств.
// Object.freeze(obj)
// Запрещает добавлять/удалять/изменять свойства. Устанавливает configurable: false, writable: false для всех существующих свойств.
// А также есть методы для их проверки:
//
// Object.isExtensible(obj)
// Возвращает false, если добавление свойств запрещено, иначе true.
// Object.isSealed(obj)
// Возвращает true, если добавление/удаление свойств запрещено и для всех существующих свойств установлено configurable: false.
// Object.isFrozen(obj)
// Возвращает true, если добавление/удаление/изменение свойств запрещено, и для всех текущих свойств установлено configurable: false, writable: false.
// На практике эти методы используются редко.
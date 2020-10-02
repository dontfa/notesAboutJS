//Упрощение синтаксиса включения переменных.
// до ES2015
const something = 'y'
const x = {
    [something]: something
}
console.log("x['something']: " + x['something']);//if something: something
console.log("x.something: " + x.something);////if something: something
console.log("x['y']: " + x['y']);
console.log("x.y: " + x.y);



// ES2015
const something2 = 'y2'
const x2 = {
    something2
}
console.log("x2['something2']: " + x2['something2']);
console.log("x2.something2: " + x2.something2);
console.log("x2['y2']: " + x2['y2']);
console.log("x2.y2: " + x2.y2);


//Прототипы и ключевое слово super.
const anObject = { y: 'y', test: () => 'zoo' }
const x3 = {
    __proto__: anObject,
    test() {
        return super.test() + 'x'
    }
}
console.log(x3.test()); //zoox

//Динамические имена свойств.
const x4 = {
    ['a' + '_' + 'b']: 'z'
}
console.log(x4.a_b); //z

//Получение ключей и значений объекта
// массив значений собственных свойств объекта
const person = { name: 'Fred', age: 87 }
console.log(Object.values(person)); // ['Fred', 87]

const people = ['Fred', 'Tony']
console.log(Object.values(people)); // ['Fred', 'Tony']

// массив собственных свойств объекта в виде пар [ключ, значение]
const person2 = { name: 'Fred', age: 87 }
console.log(Object.entries(person2)); // [['name', 'Fred'], ['age', 87]]

const people2 = ['Fred', 'Tony']
console.log(Object.entries(people2)); // [['0', 'Fred'], ['1', 'Tony']]

// набор дескрипторов всех собственных свойств объекта
//Object.getOwnPropertyDescriptors(object)
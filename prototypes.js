//Каждый объект имеет свойство prototype, в котором хранится ссылка на его прототип – своего рода хранилище методов и свойств.
// У прототипа в свою очередь есть свой прототип, к которому объект также имеет доступ "по цепочке".

// создание массива
const list = []

// его прототипом является прототип объекта Array
Array.isPrototypeOf(list) //true
list.__proto__ == Array.prototype // true

//**********************************************************************************************************************
//https://habr.com/ru/post/518360/
//У всех прототипов имеются два общих свойства, constructor и __proto__. Свойство constructor указывает на функцию-конструктор, с помощью которой создавался объект, а свойство __proto__ указывает на следующий прототип в цепочке (либо null, если это последний прототип).
//constructor – это ссылка на функцию, с помощью которой был создан объект:
//const a = {};
//a.constructor === Object // true

//На самом деле, объекты представляют собой не только поля, доступные для JS кода. Интерпретатор также сохраняет некоторые приватные данные объекта для работы с ним, для этого в стандарте определено понятие внутренних слотов, которые обозначены как имя в квадратных скобках [[SlotName]]. Для прототипов отведен приватный слот [[Prototype]] содержащий ссылку на объект-прототип (либо null, если прототипа нет).
// Из-за того, что [[Prototype]] предназначался исключительно для самого JS движка, получить доступ к прототипу объекта было невозможно. Для случаев когда это было нужно, ввели нестандартное свойство __proto__, которое поддержали многие браузеры и которое по итогу попало в сам стандарт, но как опциональное и стандартизированное только для обратной совместимости с существующим JS кодом.
//Свойство __proto__ является геттером и сеттером для внутреннего слота [[Prototype]] и находится в Object.prototype:

//Изменения прототипа у существующего объекта есть всего два метода:
// использование сеттера __proto__ и метод Object.setPrototypeOf.
var myProto = { name: "Jake" };
var foo = {};
Object.setPrototypeOf(foo, myProto);
foo.__proto__ = myProto;

//есть один нюанс с внутренним слотом [[Extensible]] который указывает на то, возможно ли добавлять к нему новые поля и менять его прототип. Есть несколько функций, которые выставляют этот флаг в false и предотвращают смену прототипа: Object.freeze, Object.seal, Object.preventExtensions. Пример:
const obj = {};
Object.preventExtensions(obj);
//Object.setPrototypeOf(obj, Function.prototype); // TypeError: #<Object> is not extensible


//Создание нового объекта с прототипом.
// Для этого есть следующие способы.
// Стандартный способ:
const myPrototype = {}
const foo2 = Object.create(myPrototype);

// Если нет поддержки Object.create, но есть __proto__:

const foo3 = { __proto__: myPrototype };

// И в случае если отсутствует поддержка всего вышеперечисленного:

const f = function () {}
f.prototype = myPrototype;
const foo4 = new f();
// Способ основан на логике работы оператора new. Оператор new берет свойство prototype функции и использует его в качестве прототипа, т.е. устанавливает объект в [[Prototype]], что нам и нужно.

//**********************************************************************************************************************

//Функции и конструкторы

function Person(firstName, lastName) {
     this.firstName = firstName;
     this.lastName = lastName;
}

const user = new Person('John', 'Doe');

// Функция Person тут является конструктором и создает два поля в новом объекте, а цепочка прототипов выглядит так:
// user
// firstName
// lastName
// [[Prototype]] --> Person.prototype
//                   constructor: Person
//                   [[Prototype]] --------> Object.prototype
//                                           toString()
//                                           hasOwnProperty()


// Откуда взялся Person.prototype? При объявлении функции, у нее автоматически создается свойство prototype для того чтобы ее можно было использовать как конструктор (note 3), таким образом свойство prototype функции не имеет отношения к прототипу самой функции, а задает прототипы для дочерних объектов. Это позволит реализовывать наследование и добавлять новые методы, например так:
//
Person.prototype.fullName = function () {
     return this.firstName + ' ' + this.lastName;
}
//
// user
// firstName
// lastName
// [[Prototype]] --> Person.prototype
//                   constructor: Person
//                   fullName: function
//                   [[Prototype]] --------> Object.prototype
//                                           toString()
//                                           hasOwnProperty()
//
// И теперь вызов user.fullName() вернет строку "John Doe".
//*********************************************************************************************************************
//Что такое new
// На самом деле оператор new не таит в себе никакой магии. При вызове new выполняет несколько действий:
//
// 1. Создает новый объект self
// 2. Записывает свойство prototype функции конструктора в прототип объекта self
// 3. Вызывает функцию конструктор с объектом self в качестве аргумента this
// 4. Возвращает self если конструктор вернул примитивное значение, иначе возвращает значение из конструктора
//
// Все эти действия можно сделать силами самого языка, поэтому можно написать свой собственный оператор new в виде функции:
//
function custom_new(constructor, args) {
    // https://stackoverflow.com/questions/31538010/test-if-a-variable-is-a-primitive-rather-than-an-object
    function isPrimitive(val) {
        return val !== Object(val);
    }
    const self = Object.create({});
    const constructorValue = constructor.apply(self, args) || self;
    return isPrimitive(constructorValue) ? self : constructorValue;
}
custom_new(Person, ['John', 'Doe'])

// Но начиная с ES6 волшебство пришло и к new в виде свойства new.target, которое позволяет определить, была ли вызвана функция как конструктор с new, или как обычная функция:
//
function Foo() {
    //console.log(new.target === Foo);
}
Foo(); // false
new Foo(); // true
// new.target будет undefined для обычного вызова функции, и ссылкой на саму функцию в случае вызова через new;
//*********************************************************************************************************************

//Наследование

// Зная все вышеперечисленное, можно сделать классическое наследование дочернего класса Student от класса Person. Для этого нужно
//
// Создать конструктор Student с вызовом логики конструктора Person
// Задать объекту `Student.prototype` прототип от `Person`
// Добавить новые методы к `Student.prototype`
//
function Student(firstName, lastName, grade) {
    Person.call(this, firstName, lastName);
    this.grade = grade;
}

// // вариант 1
Student.prototype = Object.create(Person.prototype, {
    constructor: {
        value:Student,
        enumerable: false,
        writable: true
    }
});
// // вариант 2
Object.setPrototypeOf(Student.prototype, Person.prototype);

Student.prototype.isGraduated = function() {
    return this.grade === 0;
}

const student = new Student('Judy', 'Doe', 7);


// Вариант 1 предпочтительнее, т.к. Object.setPrototypeOf может привести к проблемам с производительностью.

// Сколько вам сахара к классу
// Для того чтобы облегчить классическую схему наследование и предоставить более привычный синтаксис, были представлены классы, просто сравним код с примерами Person и Student:

class Person2 {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    fullName() {
        return this.firstName + ' ' + this.lastName;
    }
}

class Student2 extends Person2 {
    constructor(firstName, lastName, grade) {
        super(firstName, lastName);
        this.grade = grade;
    }

    isGraduated() {
        return this.grade === 0;
    }
}

// Уменьшился не только бойлерплейт, но и поддерживаемость:
// В отличие от функции конструктора, при вызове конструктора без new выпадет ошибка
// Родительский класс указывается ровно один раз при объявлении
//
// При этом цепочка прототипов получается идентичной примеру с явным указанием prototype у функций конструкторов.
//*********************************************************************************************************************
//Резюме
//
//1. В JavaScript объекты имеют специальное скрытое свойство [[Prototype]] (внутрений слот) (так оно названо в спецификации), которое либо равно null, либо ссылается на другой объект. Этот объект называется «прототип».
//2. Свойство [[Prototype]] ссылается на родительский объект родителя, либо null (у Object).
//   __proto__ — не то же самое, что [[Prototype]]. Это геттер/сеттер для него. Он существует по историческим причинам, в современном языке его заменяют функции Object.getPrototypeOf/Object.setPrototypeOf, которые также получают/устанавливают прототип.
//3. Уставновить/изменить свойство [[Prototype]] можно через геттер/сеттер __proto__ или метод Object.setPrototypeOf()
//   Object.setPrototypeOf(foo, myProto);
//   foo.__proto__ = myProto;
//   __proto__ является геттером и сеттером для внутреннего слота [[Prototype]] и находится в Object.prototype
//   надо запомнить что Object - это функция !!!!!!!!!!!
//   console.log(Object);// [Function: Object]
//4. Для создания нового объекта с нужным прототипом есть три метода
//   const foo2 = Object.create(myPrototype);
//   const foo3 = { __proto__: myPrototype };
//   const f = function () {};  f.prototype = myPrototype;  const foo4 = new f();
//5. У каждого объекта типа Function есть дополнительное свойство "prototype" !!!!!!!!!!!!!!
//   это свойство не имеет отношения к [[Prototype]] и __proto__
//   оно содержит тот прототип что будет записан в прототип нового объекта при использовании данной функции с оператором new
//   свойство prototype функции не имеет отношения к прототипу самой функции, а задает прототипы для дочерних объектов
//6. У всех прототипов имеются два общих свойства, constructor и __proto__. Свойство constructor указывает на функцию-конструктор, с помощью
//   которой создавался объект, а свойство __proto__ указывает на следующий прототип в цепочке (либо null, если это последний прототип).
//   constructor – это ссылка на функцию, с помощью которой был создан объект
//7. Прототип это всегда объект (typeof = "object").
//8. Значение __proto__ может быть объектом или null. Другие типы игнорируются.
//https://learn.javascript.ru/prototype
//9. У каждой функции по умолчанию уже есть свойство "prototype". (https://learn.javascript.ru/function-prototype)
// По умолчанию "prototype" – объект с единственным свойством constructor, которое ссылается на функцию-конструктор.
// Вот такой:
// function Rabbit() {}
// /* прототип по умолчанию
// Rabbit.prototype = { constructor: Rabbit };
// */

function Func1(){
    this.a = 1
    this.b = 2
    this.c = 3
}

const newObj = new Func1()
//console.log(Func1);
//console.log(newObj);
//typeof Func1: "function"
//typeof newObj: "object"
//
//Func1
//prototype: Object{constructor:Function}
//__proto__: function(){[native code]}
//__proto__.__proto__: Object
//
//newObj
//__proto__: Object - т.к Func1.prototype = Object и при создании через new в newObj.__proto__ скопировался Func1.prototype

const objTest = new Object()
objTest.a = 1
objTest.b = 2
objTest.c = 3
//console.log(objTest);

objTest.__proto__ = null

const objTest2 = {
    d: 4, e: 5, f: 6, __proto__: objTest
}
//console.log(objTest2);
//--------------------------------------------------------------------------------------------------------
let animal = {
    eats: true,
    walk() {
        console.log("Animal walk");
    },
    scream() {
        console.log('screaming...')
    }
};

let rabbit = {
    jumps: true,
    __proto__: animal
};

let longEar = {
    earLength: 10,
    __proto__: rabbit
};

// walk взят из цепочки прототипов
//longEar.walk(); // Animal walk
//longEar.scream();
//console.log(longEar.jumps); // true (из rabbit)
//console.dir(longEar)
//--------------------------------------------------------------------------------------------------------------
function Rabbit() {}
Rabbit.prototype = {
    eats: true
};
let rabbit2 = new Rabbit();

//Rabbit.prototype = {};
//Rabbit.prototype.eats = false;
//delete rabbit2.eats;
//delete Rabbit.prototype.eats;

//console.log(rabbit2.eats); // true
//console.dir(rabbit2);
//---------------------------------------------------------------------------------------------------------------
let arr1 = []
//arr1.myMethod()

Array.prototype.myMethod = ()=>console.log('123456')
//arr1.myMethod()
let arr2 = []
//arr2.myMethod()
//----------------------------------------------------------------------------------------------------------------
function User(name) {
    this.name = name;
}
User.prototype = {}; // (*)

let user1 = new User('John');
let user2 = new user1.constructor('Pete');
//console.log( user1.name );//John,  why?!!
// при использовании оператора new
// 1. Создает новый объект self
// 2. Записывает свойство prototype функции конструктора в прототип объекта self
// 3. Вызывает функцию конструктор с объектом self в качестве аргумента this
// 4. Возвращает self если конструктор вернул примитивное значение, иначе возвращает значение из конструктора

//console.log( user2.name ); // undefined
//console.log( user2); // [String: 'Pete']
let obj12 = new Object("Pete")
//console.log( obj12);
//-----------------------------------------------------------------------------------------------------------
let func2 =new Function()
//console.dir(func2);
//console.dir([1,2,3])

function f2(name) {
    console.log("Hello, " + name);
}
Function.prototype.defer = function(delay, name){
    //console.log("Defer: " + delay);
    setTimeout(this, delay, [name])
}

//f2.defer(2000, "Piter");

function f3(a, b) {
    console.log( a + b );
}
Function.prototype.defer2 = function(ms) {
    let f = this;
    return function(...args) {
        setTimeout(() => f.apply(this, args), ms);
    }
};

//f3.defer2(1000)(1, 2); // выведет 3 через 1 секунду.
//-----------------------------------------------------------------------------------------------------------
//let key = 'abc'
let key = '__proto__'
let obj3 = {
    [key]: 123
}
//console.dir(obj3)
//console.dir(obj3.abc)
//-----------------------------------------------------------------------------------------------------------
//let dictionary = Object.create(null);
let dictionary = Object.create(null, {
    toString: { // определяем свойство toString
        value() { // значение -- это функция
            return Object.keys(this).join();
        },
        writable: false, //по умолчанию
        enumerable: false, //по умолчанию
        configurable: false //по умолчанию

    },
});


Object.defineProperty(dictionary, "toString", {
    writable: false,
    enumerable: false,
    configurable: false
});


// ваш код, который добавляет метод dictionary.toString
/*
const dictToString =  function(){
    //console.log(Object.keys(this).join(', '))
    return Object.keys(this).join(', ')
}
dictionary.toString = dictToString;
*/
//Object.setPrototypeOf(dictionary, {toString, __proto__: null})

// добавляем немного данных
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // здесь __proto__ -- это обычный ключ

// только apple и __proto__ выведены в цикле
for(let key in dictionary) {
    console.log(key); // "apple", затем "__proto__"
}

// ваш метод toString в действии
console.log(dictionary.toString()); // "apple,__proto__"
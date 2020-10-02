//https://proglib.io/p/js-guide
//В концепции JavaScript функции являются объектами, а значит могут иметь собственные свойства и методы.
//Функция может являться аргументом или возвращаемым значением другой функции, а также быть помещенной в переменную.

//параметры по умолчанию
const foo = function(index = 0, testing = true) { /* ... */ }
foo()
//*********************************************************************************************
//в списке параметров можно оставлять замыкающую запятую:
const doSomething = (var1, var2,) => { /*...*/  }
doSomething('test2', 'test2',)
//*********************************************************************************************
//замыкания
function makeURL(domen='.com'){
    return function(url){
        return url + domen
    }
}

let urlCom = makeURL()
console.log(urlCom('google'))
let urlRu = makeURL('.ru')
console.log(urlRu('yandex'))
//*********************************************************************************************
//this
//Если функция определена как свойство некоторого объекта, она называется его методом и может ссылаться на сам объект через ключевое слово this.

const car = {
    brand: 'Ford',
    model: 'Fiesta',
    start: function() {
        console.log(`Started ${this.brand} ${this.model}`)
    }
}
car.start() // Started Ford Fiesta
//this можно установить искусственно (то есть связать с функцией некий контекст, объект) с помощью методов call, apply и bind:
//call - сразу выполянет, параметры функции передаются списком
//apply - сразу выполняет, параметры функции передаются одним параметром-массивом
//bind - возвращает функцию
const car1 = {
        maker: 'Ford',
        model: 'Fiesta',
        drive() {
            console.log(`Driving a ${this.maker} ${this.model} car!`)
        }
    }
const anotherCar = {
    maker: 'Audi',
    model: 'A4'
}
car1.drive.bind(anotherCar)()
//Driving a Audi A4 car!

const car2 = {
    maker: 'Ford',
    model: 'Fiesta'
}
const drive = function(kmh) {
    console.log(`Driving a ${this.maker} ${this.model} car at ${kmh} km/h!`)
}
drive.call(car2, 100)
//Driving a Ford Fiesta car at 100 km/h!
drive.apply(car2, [100])
//Driving a Ford Fiesta car at 100 km/h!

//Если функция вызывается не в контексте объекта, ее this равен undefined.

//*********************************************************************************************
//Стрелочные функции
//В ES6 появился новый вид функций, который полностью изменил вид JS-кода. На первый взгляд они очень просты:

const foo1 = () => {
        //...
}

// можно даже в одну строку
const foo2 = () => doSomething()

// с передачей параметра
const foo3 = param => doSomething(param)


// неявный возврат значения
const foo4 = param => param * 2
foo4(5) // 10

//Однако есть ряд тонкостей, например, стрелочные функции не имеют собственного this, а получают его из контекста создания.
//в момент создания this это не объект obj_a, это глобальный объект модуля, а если это запустить в браузере то объект Window
//Window{parent: Window, opener: null, top: Window, length: 0, frames: Window,…}
const obj_a = {
    key: 123,
    method: () => {
        console.log(this);
    }
}

obj_a.method(); // undefined
//*********************************************************************************************
//IIFE
//Immediately Invoked Function Expressions – функции, которые выполняются сразу же после объявления.

(function () {
    console.log('executed')
}
)();
//*********************************************************************************************
//Генераторы
//Особые функции, работу которых можно приостановить с помощью ключевых слов yield и возобновить позже. Это позволяет использовать совершенно новые концепции JavaScript-программирования.
console.log("**********************************************************************************")
console.log('Generators');


// создание функции-генератора
function *calculator(input) {
    var doubleThat = 2 * (yield (input / 2))
    var another = yield (doubleThat)
    return (input * doubleThat * another)
}

// инициализация со значением 10
const calc = calculator(10)

// запуск калькулятора
console.log(calc.next());

// возвращает { done: false, value: 5 },
// где value - это результат выражения input / 2

// продолжаем с новым значением
// оно подставляется вместо первого yield
console.log(calc.next(7));
//console.log(calc.next());//{ value: NaN, done: false }

// возвращает { done: false, value: 14 },
// где value - это вычисленное значение doubleThat

// продолжаем с новым значением
// оно подставляется вместо второго yield
console.log(calc.next(100));

// функция отрабатывает до конца и возвращает
// { done: true, value: 14000 }
// где value = 10 * 14 * 100

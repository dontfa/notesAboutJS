/*
let promise = new Promise(function(resolve, reject) {
   setTimeout(()=>{
       let rnd = Math.floor(Math.random() * 10)
       if(rnd%2===0)
           resolve("Even: " + rnd)
       else
           reject("Odd: " + rnd)
   }, 1000)
});

promise
    .then(
        result1 => console.log("result 1: " + result1),
        //result2  => console.log("result 2: " + result2)
    )
    .catch( result3  => console.log("result 3: " + result3) )

//------ Задержка на промисах ---------------------------------------------------------------------------------------
function delay(ms) {
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve("Ok")
        }, ms)
    })
}

delay(3000).then(() => console.log('выполнилось через 3 секунды'));

//------ Цепочка промисов -------------------------------------------------------------------------------------------
new Promise(function(resolve, reject) {

    setTimeout(() => resolve(1), 1000); // (*)

}).then(function(result) { // (**)

    console.log(result); // 1
    return result * 2;

}).then(function(result) { // (***)

    console.log(result); // 2
    return result * 2;

}).then(function(result) {

    console.log(result); // 4
    return result * 2;

});

new Promise(function(resolve, reject) {

    setTimeout(() => resolve(1), 1000);

}).then(function(result) {

    console.log(result); // 1

    return new Promise((resolve, reject) => { // (*)
        setTimeout(() => resolve(result * 2), 2000);
    });

}).then(function(result) { // (**)

    console.log(result); // 2

    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(result * 2), 3000);
    });

}).then(function(result) {

    console.log(result); // 4

});

//------ Метод fetch ------------------------------------------------------------------------------------------------
//let promise = fetch(url);
//Этот код запрашивает по сети url и возвращает промис. Промис успешно выполняется и в свою очередь возвращает объект response после того, как удалённый сервер присылает заголовки ответа, но до того, как весь ответ сервера полностью загружен.
//Чтобы прочитать полный ответ, надо вызвать метод response.text(): он тоже возвращает промис, который выполняется, когда данные полностью загружены с удалённого сервера, и возвращает эти данные.
const fetch = require("node-fetch");
fetch('http://country.io/names.json')
//fetch('https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API')
    // .then в коде ниже выполняется, когда удалённый сервер отвечает
    .then(function(response) {
        // response.text() возвращает новый промис,
        // который выполняется и возвращает полный ответ сервера,
        // когда он загрузится
        //return response.text();
        return response.json();
    })
    .then(function(text) {
        // ...и здесь содержимое полученного файла
        console.log(text); // {"name": "iliakan", isAdmin: true}
    });


let promise = new Promise(function (resolve, reject){
    setTimeout(()=>{
        resolve(1)
    }, 1000)
})

let ret = promise.then(res=>{
    console.log(res)
    //return res+2
    return new Promise(function(resolve, reject){setTimeout(()=>resolve(res+2), 2000)})
})

ret.then(res=>{
    console.log("ret:" + res)
})

//console.dir(ret)


new Promise((resolve, reject) => {
    resolve("ок");
}).then((result) => {
    blabla(); // нет такой функции
}).catch(console.log); // ReferenceError: blabla is not defined

 */

//-------- статические методы класса Promise --------------------------------------------------------------------------
//https://learn.javascript.ru/promise-api
//1. Promise.all(promises) – ожидает выполнения всех промисов и возвращает массив с результатами. Если любой из указанных промисов вернёт ошибку, то результатом работы Promise.all будет эта ошибка, результаты остальных промисов будут игнорироваться.
//2. Promise.allSettled(promises) (добавлен недавно) – ждёт, пока все промисы завершатся и возвращает их результаты в виде массива с объектами, у каждого объекта два свойства:
// state: "fulfilled", если выполнен успешно или "rejected", если ошибка,
// value – результат, если успешно или reason – ошибка, если нет.
//3. Promise.race(promises) – ожидает первый выполненный промис, который становится его результатом, остальные игнорируются.
//4. Promise.resolve(value) – возвращает успешно выполнившийся промис с результатом value.
//   Тоже самое что: let promise = new Promise(resolve => resolve(value));
//5. Promise.reject(error) – возвращает промис с ошибкой error.
//   Тоже самое что: let promise = new Promise((resolve, reject) => reject(error));
// Из всех перечисленных методов, самый часто используемый – это, пожалуй, Promise.all.

Promise.all([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
    new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
    new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(console.log); // когда все промисы выполнятся, результат будет 1,2,3
// каждый промис даёт элемент массива

//********************************************************************************************************************
//**************************************** Resume ********************************************************************
//********************************************************************************************************************
//1.  При создании промиса в функцию-executor передается две функции: resolve, reject. Это делаем сама JS. Внутри функции
// выполняется какой-то  асинхронный код, в котором если всё хорошо вызываешь функцию resolve(), если ошибка функцию reject().
//2.  Метод then() регистрирует для промиса функции-потребители. То есть then(func1, func2) Первый аргумент метода .then – функция, которая выполняется, когда промис переходит в состояние «выполнен успешно», и получает результат. Второй аргумент .then – функция, которая выполняется, когда промис переходит в состояние «выполнен с ошибкой», и получает ошибку.
//3.  То значение которое будет передано в функции resolve, reject как параметр, будет получены как аргумент в функциях func1, func2
//    То есть:
/*
let promise = new Promise(function(resolve, reject) {
    if (true)
        resolve("done")
    else
        reject("err")
});
promise.then(
    result => console.log(result), // result = "done"
    error => console.log(error)    // error  = "err"
);
 */
//4. Если нужно только обработать ошибку, то можно использовать null в качестве первого аргумента: .then(null, errorHandlingFunction). Или можно воспользоваться методом .catch(errorHandlingFunction), который сделает тоже самое.
//5. Есть также метод finally(handler), который вызывыется при любом исходе промиса: успех или ошибка. Функция handler
//   никаких параметров не получает. Используется обычно чтобы остановить индикатор или закрыть какие-нибудь ресурсы.
//6. Цепочка промисов.
//   Надо запомнить: если в методе then() вернуть любое значение, то оно будет обёрнуто в новый промис и возвращено следующему then().
//   И это значение будет доступно как параметр в первой функции-потребителе, в первой функции then().
//   Однако это будет происходить мгновенно, так как в новом then() не получится использовать асинхронный код и вернуть из него
//   значение. Если нужно использовать асинхронность из then() возвращают новый промис. Обертка промиса в промис не происходит.

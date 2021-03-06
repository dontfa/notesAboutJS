//https://learn.javascript.ru/microtask-queue
/*
//Обработчики промисов .then/.catch/.finally всегда асинхронны.
// Даже когда промис сразу же выполнен, код в строках ниже .then/.catch/.finally будет запущен до этих обработчиков.
let promise = Promise.resolve();
promise.then(() => console.log("промис выполнен"));
console.log("код выполнен"); // это показывается первым
//promise.then(() => console.log("промис выполнен")).then(() => console.log("код выполнен"));

//Обработка промисов всегда асинхронная, т.к. все действия промисов проходят через внутреннюю очередь «promise jobs», так называемую «очередь микрозадач (microtask queue)» (термин v8).
// Таким образом, обработчики .then/catch/finally вызываются после выполнения текущего кода.
// Если нам нужно гарантировать выполнение какого-то кода после .then/catch/finally, то лучше всего добавить его вызов в цепочку .then.
//----------------------------------------------------------------------------------------------------------------------
//async
// async ставится перед функцией, вот так:

async function f() {
    return 1;
}
//У слова async один простой смысл: эта функция всегда возвращает промис. Значения других типов оборачиваются в завершившийся успешно промис автоматически.
// Например, эта функция возвратит выполненный промис с результатом 1:
async function f2() {
    return 1;
}
f2().then(console.log); // 1

//Можно и явно вернуть промис, результат будет одинаковым:
async function f3() {
    return Promise.resolve(1);
}

f3().then(console.log); // 1
//---------------------------------------------------------------------------------------------------------------------
//Await
// работает только внутри async–функций
// let value = await promise;
// Ключевое слово await заставит интерпретатор JavaScript ждать до тех пор, пока промис справа от await не выполнится. После чего оно вернёт его результат, и выполнение кода продолжится.
// В этом примере промис успешно выполнится через 1 секунду:
async function f4() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("готово!"), 1000)
  });

  let result = await promise; // будет ждать, пока промис не выполнится (*)

  console.log(result); // "готово!"
}

f4();
// В данном примере выполнение функции остановится на строке (*) до тех пор, пока промис не выполнится. Это произойдёт через секунду после запуска функции. После чего в переменную result будет записан результат выполнения промиса, и браузер отобразит alert-окно «готово!».
//
// Обратите внимание, хотя await и заставляет JavaScript дожидаться выполнения промиса, это не отнимает ресурсов процессора. Пока промис не выполнится, JS-движок может заниматься другими задачами: выполнять прочие скрипты, обрабатывать события и т.п.
//
// По сути, это просто «синтаксический сахар» для получения результата промиса, более наглядный, чем promise.then.


 */
//-------------------------------------------------------------------------------------------------------------------

const fetch = require("node-fetch");
/*

function loadJson(url) {
    return fetch(url)
        .then(response => {
            if (response.status == 200) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
}

loadJson('no-such-user.json') // (3)
//loadJson('http://country.io/names.json') // (3)
    .then(console.log)
    .catch(err=>{
        console.log("@@ Error: " + err)
    }); // Error: 404


 */
//-------------------------------------------------------------------------------------------------------------------
/*
async function loadJson(url){

    try {
        let response = await fetch(url)

        if (response.status == 200)
            return response.json();
            //return 123
        else
            throw new Error(response.status);

    }
    catch (err){
        return  ("@@ Error: " + err)
        //console.log("@@ Error: " + err)
    }

}

//console.log("11111: " + loadJson('no-such-user.json'))
loadJson('no-such-user.json')
//loadJson('http://country.io/names.json')
    .then(console.log)

 */
//-------------------------------------------------------------------------------------------------------------------
//Есть «обычная» функция. Как можно внутри неё получить результат выполнения async–функции?
async function wait() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return 10;
}

(function f5() {
    // ...что здесь написать?
    // чтобы вызвать wait() и дождаться результата "10" от async–функции
    // не забывайте, здесь нельзя использовать "await"
    wait()
        .then(console.log)
})()

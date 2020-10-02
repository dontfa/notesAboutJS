console.log('Одна строка')
console.log("Другая строка")

// кавычки внутри строк необходимо экранировать
// двойные, если строка в двойных кавычках
console.log("Ресторан \"У конца вселенной\"")
// одинарные, если в одинарных
console.log('I\'m Groot')

// строки могут содержать управляющие последовательности
console.log("Первая строка\nВторая строка")

//Для конкатенации строк используется оператор +:
console.log("Hello, " + "world")

//Строку можно заполнить символами до определенной длины (с начала или с конца):
//padStart(targetLength [, padString])
//padEnd(targetLength [, padString])

console.log('test'.padStart(7)) // ' test'
console.log('test'.padStart(7, 'a')) // 'aaatest'
console.log('test'.padStart(7, 'abcd')) // 'abctest'

console.log('test'.padEnd(7)) // 'test '
console.log('test'.padEnd(7, 'a')) // 'testaaa'
console.log('test'.padEnd(7, 'abcd')) // 'testabc'

//В ES6 появился новый синтаксис для создания строк, допускающий интерполяцию выражений и многострочность:
// для шаблонных строк используются обратные кавычки
let str = `шаблонная строка`

let answer = 42
let a = `Ответ на главный вопрос жизни, вселенной и всего такого - ${answer}`
let b = `Дважды два равно ${ 2*2 }`
let c = `something ${ foo() ? 'x' : 'y' }`

console.log(a)
    console.log(b)
        console.log(c)

let multiline = `Первая строка
вторая строка

третья строка`
console.log(multiline)

//let foo = ()=> Math.floor(Math.random() * 10)
function foo() {
    return (Math.floor(Math.random() * 10) - 5) <= 0 ? 0 : 1
}

//console.log(Boolean(0))
// приводятся к false в логическом контексте
//0
//-0
//NaN
//undefined
//null
//'' // пустая строка
// остальные значения становятся true
//https://proglib.io/p/js-guide
function test() {
    let obj = {
        nam: "Jom"
    }

// до ES6 были только var-переменные
    var a = 'variable'
    var b = 1, c = 2

// let-переменные можно изменять
    let x = 10
    x = 20

// const-переменные нельзя изменять
    const y = 10
    //y = 20 // ошибка

    //hoisting - поднятие, переменные var видны из внутренних областей видимости
    //var x_var = 5
    if (obj.nam == "Jom"){
        var x_var = 6
        //let x_let = 7
        //const x_const = 8
    }

    console.log("Hello " + x_var) //x_let и x_const - ошибка
}

test()
/*
flatten
Дан массив, в котором могут храниться любые типы данных.
нужно реализовать функцию, которая разворачивает вложенные массивы в исходный массив,
данные остальных типов должны остаться без изменений.
Попробуйте написать полифил метода flat. Сам метод в решении не используйте.
 */

let res = flatten([1, 'any [complex] string', null, function() {}, [1, 2, [3, '4'], 0], [], { a: 1 }]);
// возвращает
//      [1, 'any [complex] string', null, function() {}, 1, 2, 3, '4', 0, { a: 1 }]
console.log(res)

function flatten(list) {
    // code here
    let newArr = []
    let beArr = false;
    list.forEach((it, ind)=>{
        if(Array.isArray(it)){
            it.forEach(it2=>{
                newArr.push(it2)
                beArr = !beArr ? Array.isArray(it2) :true
            })
        }
        else{
            newArr.push(it)
        }
    })

    //newArr.forEach(it=>console.log(it))
    return beArr ? flatten(newArr) : newArr
}



/*
const arr1 = [0, 1, 2, [3, 4], 5, 6];
console.log(arr1.flat());

const arr2 = [0, 1, 2, [[[3, 4]]]];
console.log(arr2.flat(2));

 */
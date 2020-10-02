/*
Напишите функцию get, которая получает объект и путь к вложенному свойству объекта и возвращает значение этого свойства (или undefined, если свойства не существует). Третий, опциональный аргумент функции — значение по умолчанию, которое возвращается, если значения по указанному пути не существует.

 */
function get(obj, path, defaultValue) {
    // your code here

    let path_arr = path.split(".")
    let curVal = obj

    for (let i = 0; i < path_arr.length; i++) {
        curVal = curVal[path_arr[i]]
        if(!curVal) break;
    }

    return curVal ? curVal : defaultValue
}

const obj = {
    a: {
        b: {
            c: 'd'
        },
        e: 'f'
    }
};

console.log(get(obj, 'a'));
console.log(get(obj, 'a.b'));   // { c : 'd' }
console.log(get(obj, 'a.b.c')); // 'd'
console.log(get(obj, 'a.e'));   // 'f'
console.log(get(obj, 'a.x.e')); // undefined
console.log(get(obj, 'a.x.e', true)); // true
console.log(get(obj, 'a.x.e', 'My default value')); // My default value
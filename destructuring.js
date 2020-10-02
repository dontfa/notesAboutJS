//Спред-оператор
//Дает возможность развернуть массив, объект или строку на элементы:

const a = [1, 2, 3]

// простое объединение массивов
const b = [...a, 4, 5, 6]
console.log(b);

// простое копирование массива
const c = [...a]
console.log(c);

// работает и с объектами
const oldObj = {a12: 'aaa', b12: 'bbb'}
const newObj = {a12: "aaa2", ...oldObj }
console.log(newObj);

// и со строками
const hey = 'destructuring'
const arrayized = [...hey] // ['h', 'e', 'y']
console.log(arrayized);

// позволяет передавать в функции параметры-массивы
const f = (foo, bar) => {
    console.log(foo);
    console.log(bar);
}
const a2 = [1, 2]
f(...a2)

//Деструктурирующее присваивание
//Дает возможность извлечь из объекта нужные значения и поместить их в именованные переменные:

    const person = {
        firstName: 'Tom',
        lastName: 'Cruise',
        actor: true,
        age: 54,
    }
const {firstName: name, age} = person
console.log(name, age);

// работает и с массивами
const a3 = [1,2,3,4,5]
let [first, second, , , fifth] = a3
console.log(first, second, fifth);
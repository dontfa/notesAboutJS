//Циклы
//for
//for-each
//do-while
//while
////for-in
//for-of

//for
console.log('for -------------------------------------------------------------------------');
const list = ['a', 'b', 'c']
for (let i = 0; i < list.length; i++) {
    console.log(list[i]) //value
    console.log(i) //index
}

//for-each
console.log('for-each -------------------------------------------------------------------------');
const list2 = ['a', 'b', 'c']
list2.forEach((item, index) => {
    console.log(item) //value
    console.log(index) //index
})
//index is optional
list2.forEach(item => console.log(item))

//do-while
console.log('do-while -------------------------------------------------------------------------');
const list3 = ['a', 'b', 'c']
let i = 0
do {
    console.log(list3[i]) //value
    console.log(i) //index
    i = i + 1
} while (i < list3.length)

//while
console.log('while -------------------------------------------------------------------------');
const list4 = ['a', 'b', 'c']
i = 0
while (i < list4.length) {
    console.log(list4[i]) //value
    console.log(i) //index
    i = i + 1
}

//for-in
console.log('for-in -------------------------------------------------------------------------');
let object = {key1: 123, key2: 456}
for (let property in object) {
    console.log(property) //property name
    console.log(object[property]) //property value
}

//for-of
//Сочетает лаконичность метода массивов forEach с возможностью прерывания цикла.
console.log('for-of -------------------------------------------------------------------------');
for (const v of ['a', 'b', 'c']) {
    console.log(v);
    if(v === 'b') break;
}

for (const [i, v] of ['a', 'b', 'c'].entries()) {
    console.log(i, v);
}
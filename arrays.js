let arr = ['name', 'top', '123']
for (const arrKey in arr) {
    console.log(arrKey);
}

for (const arrKey of arr) {
    console.log(arrKey);
}
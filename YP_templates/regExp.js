//https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Regular_Expressions
//Регулярные выражения используются в методах test и exec объекта RegExp и с методами match, replace, search, и split объекта String

let str = '<ul class="{{ className }}" data-chat-id="{{chat.id}}" onClick="{{handleClick}}">\n' +
    '    {{ items }}\n' +
    '</ul>'

console.log(str);

//let re = new RegExp("\\{\\s*items\\s*\\}");
//let re = /\{\{\s*items\s*\}\}/
//let res = re.exec(str)
//console.log(res);

//let res = str.replace('items', "123")
let word = "items"
let res = str.replace(new RegExp('\\{\\{\\s*' + word + '\\s*\\}\\}'), "123")
console.log(res);

const context = {
    className: "chat",
    chat: {
        id: 123
    },
    handleClick: function() {
        console.log("123456");
    }
};

console.log(context.handleClick.toString());
/*

Шаблонизатор
Шаблонизатор — утилита, которая генерирует HTML-страницы. Она упрощает работу веб-разработчика. Вместо того, чтобы копировать одну и ту же разметку и заменять данные, он просто передает данные в шаблонизатор.
Простейший пример:
const templator = context => `<p>${context.text}</p>`;

const element = document.createElement('div');
element.innerHTML = templator({text: 'Hello, Templator!'});

Подробнее о шаблонизаторах мы расскажем в курсе.
В данной задаче необходимо реализовать шаблонизатор, который умеет работать следующим образом. На вход подают объект-контекст со значениями, которые хотят подставить:
строкой,
объектом,
функцией.
Это делает шаблонизатор templator.js. Он заменит шаблонные переменные на значения из контекста.
Назначение остальных файлов:
index.html — вызывает скрипты в указанном порядке,
script.js — содержит объект контекста, компилирует шаблоны и помещает их на страницу,
chats.tmpl.js — описывает шаблон.
Результат должен быть как на видео.
При нажатии на элементы списка выводите элемент ul:
<ul class="chat" data-chat-id="123" onclick="window.handleClick()">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
</ul>
Табы, новые строки при выводе учитывать не нужно.
Допишите функционал в файле templator.js, остальные файлы трогать не нужно!
 */

(function() {
    class Templator {
        constructor(template) {
            this._template = template;
        }

        compile(ctx) {
            //_template содержит строку с шаблонами
            //<ul class="{{ className }}" data-chat-id="{{chat.id}}" onClick="{{handleClick}}">
            //   {{ items }}
            // </ul>
            //
            //<li>{{name}}</li>
            //
            //ctx - это объект который содержит данные, которыми нужно заполнить шаблоны
            //
            //_template: "<li>{{name}}</li>"
            //ctx: { name: item }
            let res = this._template.trim()
            for(let key of Object.keys(ctx)){
                let val = ctx[key]

                if((typeof val) === 'string' || (typeof val) === 'number'){
                    res = res.replace(new RegExp('\\{\\{\\s*' + key + '\\s*\\}\\}'), val)
                }
                else if((typeof val) === 'object'){
                    //chat.id
                    //chat: { id: 123  }
                    for(let key2 of Object.keys(val)){
                        let templ = key + '.' + key2;//chat.id
                        res = res.replace(new RegExp('\\{\\{\\s*' + templ + '\\s*\\}\\}'), val[key2])

                    }


                }
                else if((typeof val) === 'function'){
                    //console.log(val)
                    //res = res.replace(new RegExp('\\{\\{\\s*' + key + '\\s*\\}\\}'), val.toString())
                    res = res.replace(new RegExp('\\{\\{\\s*' + key + '\\s*\\}\\}'), 'window.' + key + '()')
                    window[key] = val

                }


            }

            //return "<p>Моя разметка живет тут</p>";
            return res
        }
    }

    window.Templator = Templator;
})();
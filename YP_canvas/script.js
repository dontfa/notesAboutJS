//Условия для логотипа:
// размер канваса — 400x400px;
// толщина линий — 16px;
// длина вертикальной линии — 150px;
// длина горизонтальной линии — 100px;
// цвет фона — чёрный;
// цвет линии — белый;
// расстояние по оси X от вертикальной до горизонтальной линии (ближайшие друг к другу границы) — 22px;
// расстояние по оси Y от вертикальной до горизонтальной линии — 22px;
// логотип должен располагаться по центру.
// Условия для анимации:
// логотип передвигается по нажатию стрелок на клавиатуре: вверх, вниз, вправо, влево;
// каждое передвижение смещает логотип целиком на 25px;
// передвижение логотипа должно быть цикличным — если логотип выходит за пределы канваса, то исчезнувшая часть должна появиться с противоположной стороны.

function drawPict(ctx, x1, y1){

    let mult = 1
    let shift = 30
    ctx.beginPath();
    ctx.moveTo(mult*(x1+shift), mult*y1);
    ctx.lineTo(mult*(x1+shift + 100), mult*y1);
    ctx.stroke();

    ctx.moveTo(mult*(x1), mult*(y1 + shift));
    ctx.lineTo(mult*(x1), mult*(y1 + shift + 150));
    ctx.stroke();

    ctx.moveTo(mult*(x1+shift + 100 + shift), mult*(y1 + shift));
    ctx.lineTo(mult*(x1+shift + 100 + shift), mult*(y1 + shift + 150));
    ctx.stroke();




}

function clearCanv(ctx){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.width, canvas.height);

}

function init(){
    //let body = document.getElementsByTagName('body')
    document.body.style.backgroundColor = '#000'
    //console.log(document.body)
    let canvas = document.getElementById("canvas")
    //canvas.style.width = "400px"
    //canvas.style.height = "400px"
    let wid_c = 400
    let heig_c = 400

    canvas.width = wid_c
    canvas.height = heig_c

    canvas.style.borderWidth = "1px"
    canvas.style.position = "absolute"
    canvas.style.left = "50%"
    canvas.style.marginLeft = "-200px"
    canvas.style.top = "50%"
    canvas.style.marginTop = "-200px"
    //canvas.setAttribute('style', "position: absolute;  left: 50%;margin-left:-200px; top: 50%;margin-top:-200px;");

    let ctx = canvas.getContext("2d")
    ctx.lineWidth = 16;
    ctx.strokeStyle = 'white';

    //let x1 = 128, y1 = 103  // 22
    //let x1 = 112, y1 = 101    //22+16=38
    let x1 = 120, y1 = 114    //22+8=30
    drawPict(ctx, x1, y1)

    //clearCanv(ctx)

    // let count = 0
    // let timerId = setInterval(()=>{
    //     clearCanv(ctx)
    //     x1+=5
    //     count++
    //     if(count>10) clearInterval(timerId)
    //     drawPict(ctx, x1, y1)
    // }, 50)

    //console.log(canvas)

    let x1_2 = 0, y1_2 = 0;

    //144 - ширина рисунка
    //172 - высота рисунка
    let widPict = 144, heigPict = 172

    document.addEventListener("keydown", (e)=>{
        //console.log(e.keyCode);
        let cb = e.keyCode
        //Up 38; Down 40; Left 37; Wright 39
        if(cb==38){
            y1-=10
        }
        else if(cb==40){
            y1+=10
        }
        else if(cb==37){
            x1-=10
        }
        else if(cb==39){
            x1+=10
        }
        else{
            return
        }

        // x1_2 = x1
        // y1_2 = y1

        clearCanv(ctx)
        drawPict(ctx, x1, y1)

        let x2 = x1, y2 = y1;

        if(x1<0){
            drawPict(ctx, wid_c+ x1, y1)
            x2 = wid_c+ x1
        }
        else if(x1+widPict > wid_c){
            drawPict(ctx, -wid_c+x1, y1)
            x2 = -wid_c+x1
        }

        if(y1<0){
            drawPict(ctx, x1, heig_c + y1)
            y2 = heig_c + y1
        }
        else if(y1+heigPict > heig_c){
            drawPict(ctx, x1, -heig_c + y1)
            y2 = -heig_c + y1
        }

        if(true){
            drawPict(ctx, x2, y2)
        }


        if(x1+widPict < 0){
            x1 = wid_c + x1
        }
        else if(x1 > wid_c){
            x1 = -wid_c + x1
        }

        if(y1+heigPict < 0){
            y1 = heig_c + y1
        }
        else if(y1 > heig_c){
            y1 = -heig_c + y1
        }


        console.log(`x1=${x1}; y1=${y1};`)

        // if(x1 < -widPict || x1 > wid_c+widPict){
        //     x1 = x1_2
        // }
        // if(y1 < -heigPict || y1 > heig_c+heigPict){
        //     y1 = y1_2
        // }


        // let secPict=false
        //
        // if(x1<0 ){
        //     x1_2 = wid_c+x1
        //     secPict=true
        //     //drawPict(ctx, x1_2, y1)
        // }
        // else if(x1+widPict > wid_c ){
        //     x1_2 = x1-wid_c
        //     secPict=true
        //     //drawPict(ctx, x1_2, y1)
        // }
        // else {
        //     x1_2 = x1
        // }
        //
        // if(y1<0 ){
        //     y1_2 = heig_c+y1
        //     secPict=true
        //     //drawPict(ctx, x1_2, y1)
        // }
        // else if(y1+heigPict > heig_c ){
        //     y1_2 = y1-heig_c
        //     secPict=true
        //     //drawPict(ctx, x1_2, y1)
        // }
        // else {
        //     y1_2 = y1
        // }
        //
        // if(secPict){
        //     drawPict(ctx, x1_2, y1_2)
        // }
        //
        //
        // // if(x1 < -widPict || x1 > wid_c+widPict){
        // //     x1 = x1_2
        // // }
        // // if(y1 < -heigPict || y1 > heig_c+heigPict){
        // //     y1 = y1_2
        // // }

       //console.log(`x1=${x1}; y1=${y1}; x1_2=${x1_2}; y1_2=${y1_2}`)


    })

    function windowToCanvas(canvas, x, y) {
        var bbox = canvas.getBoundingClientRect();
        return { x: x - bbox.left * (canvas.width / bbox.width),
            y: y - bbox.top * (canvas.height / bbox.height)
        };
    }

    canvas.onmousedown = function (e) {
        //var loc = windowToCanvas(canvas, e.clientX, e.clientY);
        //drawBackground();
        //drawSpritesheet();
        //drawGuidelines(loc.x, loc.y);
        //updateReadout(loc.x, loc.y);
        //console.log((loc.x, loc.y));
        console.log(e.clientX, e.clientY);
    };

}

init()
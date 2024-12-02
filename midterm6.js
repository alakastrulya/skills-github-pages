
var counter = 0;
var quadrat = document.querySelectorAll('#table td');
var header = document.getElementById('header');
var countX = document.getElementById('sX');
var count0 = document.getElementById('s0');
var countD = document.getElementById('sD');
let cX=0;
let c0=0;
let cD=0;


// если уже есть победитель, 
// это функция будет возвращать тру или фолз
function winner(){
    // поскольку мы взяли квадратики через querySelectorAll 
    // он проиндексировал их
    var wins =[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    // проверяем совпадения, одинаковые ли символы во всех трех ячейках, при этом они не должны быть пустыми
    for(var win of wins){
        if(quadrat[win[0]].innerHTML==quadrat[win[1]].innerHTML && quadrat[win[1]].innerHTML==quadrat[win[2]].innerHTML && quadrat[win[0]].innerHTML!=''){
            return true;
        }
    }
    return false;

}


function tap(event){
    if (counter%2==0){
        // если четное то выбираем нажатую ячейку
        // вставляем фото крестика
        event.target.innerHTML='<img src="Chess.png " width="100px">';
    }
    else{
        // если нечетное то выбираем нажатую ячейку
        // вставляем фото кругляшочка
        event.target.innerHTML='<img src="circle.png " width="100px">';
    }
// проверяем кто победитель
    if(winner()){
        for(let cell of quadrat){
            // если кто то выиграет, что бы игра не продолжалась
            cell.removeEventListener('click', tap);
        }

        if(counter%2==0){
            cX+=1;
            countX.textContent=cX;
            header.innerText='X is winner!';
        }else{
            c0+=1;
            count0.textContent=c0;
            header.innerText='0 is winner!';
        }
    }
    // если счетчик заполнен но никто не выиграл
    else if(counter==8){
        cD+=1;
        countD.textContent=cD;
        header.innerText='Draw!';
    }

    // счетчик увеличиваем на нажатие любой ячейки
    counter++;
    // что бы избежать ошибок, что бы ячейка на повторное, на третье нажатие не вызывало функцию тап
    // удаляем  обработчик события
    event.target.removeEventListener('click', tap);

}

function startGame(){
    header.innerText='Tic Tac Toe';
    counter = 0;
    // что бы пробежаться по всем ячейкам
    for(var cell of quadrat){
        cell.innerHTML='';
        // за нажатием каждой ячейки будем следить через
        // обработку событий
        cell.addEventListener('click', tap);
    }
    console.log(cX,c0,cD);
}

startGame()
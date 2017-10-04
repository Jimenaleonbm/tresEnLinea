// DECLARO VARIABLES
var buttonId;
var turno = 1;
var jugarDeNuevo;
var items = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];
var ganador = false;
var jugador = {
    1: {
        ganados: 0
    },
    2: {
        ganados: 0
    }
}
var oponente = 'pc';
var counter = 0;

var explicaciones = {
    javaScript: {
        clicked: false,
        show() {
            window.open("https://www.w3schools.com/js/default.asp");
            this.clicked = true;
        }
    },
    objetos: {
        clicked: false,
        show(){
            window.open("https://www.w3schools.com/js/js_objects.asp");
            this.clicked = true;
        }
    },
    dataTypes: {
        clicked: false,
        show(){
            window.open("https://www.w3schools.com/js/js_datatypes.asp");
            this.clicked = true;
        }
    }
}

// creando tabla
var table = document.getElementsByTagName("table")[0];
var cells = table.getElementsByTagName("td");  

for(var i = 0; i < cells.length; i++){
    var cell = cells[i];
    // obtengo posicion de la celda seleccionada
    cell.onclick = function(e){
        var rowIndex  = this.cellIndex;  
        var cellIndex = this.parentNode.rowIndex;
        // alert("cell: " + cellIndex + " / row: " + rowIndex );
        buttonId = e.target.id;
        items[cellIndex][rowIndex] = turno;

        // cambiar color por turno
        if(turno === 1){
            addColor('http://www.iconsdb.com/icons/preview/deep-pink/x-mark-2-xxl.png');
        }else {
            addColor('https://rebalancediabetes.files.wordpress.com/2015/10/blue-circle-200px.jpg');
        }
        compare();
    }
}


// CAMBIO EL ESTILO DEL BOTON QUE SELECCIONE
function addColor(color) {
    
    if(document.getElementById(buttonId).style.backgroundImage != '') {
        alert('Este espacio ya fue seleccionado, pierde el turno');
    }else {
        document.getElementById(buttonId).style.backgroundImage = "url('"+ color +"')";
        counter ++;
    }
}

function compare() {
    for(var i = 0; i < 3; i ++){  
        if(items[i][0] === items[i][1] && items[i][0] === items[i][2] && items[i][0] !== 0){
            ganador = true;
            break;
        }else if(items[0][i] === items[1][i] && items[0][i] === items[2][i] && items[0][i] !== 0){
            ganador = true;
            break;
        }else if(items[0][0] === items[1][1] && items[0][0] === items[2][2] && items[0][0] !== 0){
            ganador = true;
            break;
        }else if(items[0][2] === items[1][1] && items[0][2] === items[2][0] && items[0][2] !== 0){
            ganador = true;
            break;
        }
    }
    
    if(!ganador && counter === 9){
        var again = confirm('No Hay Ganador, ¿Quiere jugar de nuevo?');
        if(again === true){
            reset();
        }else{
            console.log('juego terminado');
        }
    }
    if(ganador){
        jugador[turno].ganados ++;
        // actualizo datos de la tabla
        document.getElementById("jug1").innerHTML = jugador[1].ganados;
        document.getElementById("jug2").innerHTML = jugador[2].ganados;
        var total =  jugador[1].ganados + jugador[2].ganados;
        document.getElementById("jugtotal").innerHTML = total;

        // muestro el mensaje del ganador
        setTimeout(function(){ 
            jugarDeNuevo = confirm('ganador jugador ' + turno + '\n¿Quiere jugar de nuevo?'); 
            if (jugarDeNuevo == true) {
                reset();
            } else {
                console.log("You pressed Cancel!");
            }
        }, 100);
    }else{
        changeTurn();
    }
    
}

function changeTurn() {
        switch(turno){
            case 1:
                if(oponente === 'pc'){
                    selectAut();
                }else{
                    turno = 2;
                }
            break;
            case 2:
                 turno = 1;
            break;
        }
    // mostrar el turno en pantalla
    document.getElementById('turno').innerHTML = 'TURNO JUGADOR: ' + turno;
}

function reset() {
    console.log("You pressed OK!");
    ganador = false;
    var buttons = document.getElementsByTagName("button");
    for(var i = 0; i < 9; i++){
        button = buttons[i];
        button.style.backgroundImage = '';
    }
    items = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]; 
    turno = 1;
    counter = 0;
}

function abrirWeb() {
    window.open("https://jimenamartin.com");
}

// agregando date
var d = new Date();
document.getElementById("date").innerHTML = d.toDateString();


// select user
function selectuser(val){
    var selec = document.getElementById('seleccione');
    selec.style.opacity = '0';
    selec.style.height = '0';    
    var juego = document.getElementById('juego');
    juego.style.opacity = '1';
    juego.style.height = 'auto';
    switch(val){
        case 'pc':
            oponente = 'pc';
            selectAut();
        break;
        case 'friend':
            oponente = 'friend';
        break;
    }
}
var valCell;
var valRow
function selectAut(){
    do {
        valCell = Math.floor(Math.random() * 3) + 1
        valRow = Math.floor(Math.random() * 3) + 1
    
        valCell = valCell - 1;
        valRow = valRow - 1;
    
        console.log(valCell + " "+valRow);
     } while (items[valCell][valRow] != 0 && turno === 1){
         setTimeout(function() {             
             items[valCell][valRow] = 2;
             buttonId = 'p'+valCell+valRow;
             // cambiar color por turno
                 addColor('https://rebalancediabetes.files.wordpress.com/2015/10/blue-circle-200px.jpg');
            turno = 2;
            compare();
         }, 400);
     };
}

// explicaciones
function showInfo(val){
    explicaciones[val].show();
}
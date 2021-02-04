//Declaro  matriz del juego y la inicializo
var N=3;//dimencion del tablero
var cantJugadores=2;//jugadores

var coloresVector=["White","Black","Red","Blue"];//colores disponibles
var Jugador;
var matrix = [];

var contJugador;

let conJugada=0;

const asignarPos=(idBoton)=>{
    let fila;
    let col;
    fila=parseInt((idBoton-1)/N);
    col=(idBoton-1)%N;
//Asigna a jugador la posicion
    return[fila,col];
}
const asignarValor=(posicion,Jugador)=>{


    if(matrix[posicion[0]][posicion[1]]==0)
    {   
        matrix[posicion[0]][posicion[1]]=Jugador;
       
        return true;}
    else
        return false;

}
const colorear=(idBoton,jugador)=>
{
    const cuadro=document.getElementById(idBoton);
    cuadro.style.backgroundColor=coloresVector[jugador-1];

}
const verificacionFilas=()=>
{
    let contJugador=new Array(cantJugadores);
    for(let i =0;i<cantJugadores;i++) contJugador[i]=0; 
//Verifica Victoria fila
    for(let i =0;i<N;i++) 
    {
        if(matrix[i].includes(0)==false)
        {
            for(let j=0;j<N;j++)
            {for(let l=0;l<cantJugadores;l++) 
                if((l+1)==matrix[i][j])
                    contJugador[l]=contJugador[l]+1;
                }
         
        }
    for(let m=0;m<cantJugadores;m++)
     if(contJugador[m]==N) 
     {
        return [m+1,i+1];}  // return jugador-fila ganadora
    for(let k =0;k<cantJugadores;k++) contJugador[k]=0;   
    }
    return 0;
}
const verificacionColumnas=()=>
{//Traspongo la matriz
    let auxmatrix = [];

    for(let i =0;i<N;i++) auxmatrix[i]=new Array(N);
    for(let i =0;i<N;i++) for(let j =0;j<N;j++) auxmatrix[i][j]=matrix[i][j];
   
    for( let i=0;i<N;i++)
    {
        for(let j=0;j<i;j++)
        {
            let temp=auxmatrix[i][j];
            auxmatrix[i][j]=auxmatrix[j][i];
            auxmatrix[j][i]=temp;
        }
    }
    let contJugador=new Array(cantJugadores);
    for(let i =0;i<cantJugadores;i++) contJugador[i]=0; 
//Verifica Victoria fila
    for(let i =0;i<N;i++) 
    {
        if(auxmatrix[i].includes(0)==false)
        {
            for(let j=0;j<N;j++)
            {for(let l=0;l<cantJugadores;l++) 
                if((l+1)==auxmatrix[i][j])
                    contJugador[l]=contJugador[l]+1;
                }
         
        }
    for(let m=0;m<cantJugadores;m++)
     if(contJugador[m]==N) 
     {console.log(`El Jugador${m+1} hizo la columna${i+1}`);
        return [m+1,i+1]}// return jugador-columnas ganadora
    
    for(let k =0;k<cantJugadores;k++) contJugador[k]=0;   
    }
    return 0;
}
const verificacionDiagonales=()=>{
for(let k =0;k<cantJugadores;k++) contJugador[k]=0;  
    for(let i=0;i<N;i++)
    {
        for(let j=0;j<N;j++)
        {
            if((i==j)&&(matrix[i][j]!==0))
            {
                for(let k=0;k<cantJugadores;k++)
                {
                    if((k+1)===matrix[i][j])
                        contJugador[k]++;
                    if(contJugador[k]==N)
                        {console.log(`El jugador${k+1} hizo la diagonal izquierda`);
                        return [k+1,0];
                    }//return jugador-diagonal izquierda
                }
            }

        }
    }
for(let k =0;k<cantJugadores;k++) contJugador[k]=0;  
    for(let i=0;i<N;i++)
    {
        for(let j=0;j<N;j++)
        {
            if((i+j==N-1)&&(matrix[i][j]!==0))
            {
                for(let k=0;k<cantJugadores;k++)
                {
                    if((k+1)===matrix[i][j])
                        contJugador[k]++;
                    if(contJugador[k]==N)
                        {console.log(`El jugador${k+1} hizo la diagonal derecha`);
                    return[k+1,1]}//return jugador-diagonal izquierda
                }
            }

        }
    }
  

return 0;

}
const ResolucionJuego=()=>{
    let resultado=verificacionColumnas();
    if(resultado!=0) 
    {window.console.clear();
    console.log(`Ganador Jugador ${resultado[0]} Columna: ${resultado[1]}`);
    document.getElementById("Estado").innerText=`Ganador: Jugador ${resultado[0]}`;
      return 2;
    }
    resultado=verificacionFilas();
    if(resultado!=0) 
    {
     window.console.clear();

    console.log(`Ganador Jugador ${resultado[0]} Fila: ${resultado[1]}`);
    document.getElementById("Estado").innerText=`Ganador: Jugador ${resultado[0]}`;
      return 2;
    }
    resultado=verificacionDiagonales();
    if(resultado!=0) 
    {
    window.console.clear();
    console.log(`Ganador Jugador ${resultado[0]} Diagonal: ${resultado[1]}`);
    document.getElementById("Estado").innerText=`Ganador: Jugador ${resultado[0]}`;
      return 2;
    }


    for(let i =0;i<N;i++) 
        {   for(let j =0;j<N;j++) 
                if(matrix[i][j]==0) {console.log("Continuar");return 0}
                     
                        
        }
        window.console.clear();
        console.log("Empate");
        document.getElementById("Estado").innerText=`Empate`;
        return 1//Empate
}
const inicioJuego =(element)=>{
    
    Jugador=(conJugada)%cantJugadores+1;//determino jugador
    console.log("Jugador: "+Jugador);
    let posicion=new Array(2);
    const idBoton=element.target.id;//Obtengo el Id del boton oprimido
    posicion=asignarPos(idBoton);
    if(asignarValor(posicion,Jugador)===true)
    {   
        colorear(idBoton,Jugador);
        conJugada++;
        let EstadoJuego=ResolucionJuego()
        if(EstadoJuego==2||EstadoJuego==1) terminarJuego();
    }
    else
        console.log(matrix,conJugada);//Casilla ya ocupada por otro jugador

           
}
const terminarJuego=()=>
{
    const botones=document.getElementsByClassName("boton")
    console.log("Game Over");
    for(boton of botones)
    {
        boton.removeEventListener("click",inicioJuego);
    }
    
}

const selTab =(event)=>{

   // console.log(event);
    if(event.target.id=="Tablero3x3")
    {   console.log("Se selecciono tablero 3x3");
        N=3;}
    if(event.target.id=="Tablero4x4")
    { 
        console.log("Se selecciono tablero 4x4");
        N=4;
    }
}
const selJug=(event)=>{

    const numeroJugador=event.target.options.selectedIndex
    if(numeroJugador==1)
    {   console.log("Se selecciono 2 jugadores");
        cantJugadores=2;
    }
    if(numeroJugador==2) 
    {console.log("Se selecciono 3 jugadores");
     cantJugadores=3;
    }
    if(numeroJugador==3) 
    {console.log("Se selecciono 4 juagadores");
    cantJugadores=4;
    }
}
const selCol=(event)=>{
    const jugador=event.target.id;
    const color=event.target.value;
    if(jugador==="color1")
    {
        coloresVector[0]=color;
        console.log(`Se selecciono para el jugador1 el color ${color}`);
    } 
    if(jugador==="color2")
    {
         console.log(`Se selecciono para el jugador2 el color ${color}`);
         coloresVector[1]=color;
        }
    if(jugador==="color3") 
    {console.log(`Se selecciono para el jugador3 el color ${color}`);
    coloresVector[2]=color;

    }
    if(jugador==="color4")
    { console.log(`Se selecciono para el jugador4 el color ${color}`);
    coloresVector[3]=color;
    }
    
    
}

function iniciar(event){

    const contenedor=document.getElementById("contenedor");
    console.log(event.target.outerText);
    if(event.target.outerText=="Iniciar")
    {  event.target.innerText="Reiniciar";
    
    
        

if(N===3) contenedor.innerHTML=`
        <div class="row justify-content-center">
            <div id="1"class="col-3 boton m-1"></div>
            <div id="2"class="col-3 boton m-1"></div>
            <div id="3"class="col-3 boton m-1"></div>
        </div>
        <div class="row justify-content-center">
            <div id="4"class="col-3 boton m-1"></div>
            <div id="5"class="col-3 boton m-1"></div>
            <div id="6"class="col-3 boton m-1"></div>
        </div>
        <div class="row justify-content-center">
            <div id="7"class="col-3 boton m-1"></div>
            <div id="8"class="col-3 boton m-1"></div>
            <div id="9"class="col-3 boton m-1"></div>
        </div>
<div class="row justify-content-center">
<div class="col-8 m-2 ">
<form method="post" action="#"" >
<label >Cuadrado</label>
<input type="radio" name="forma" value="Cuadrado" id="Cuadrado" onchange="circulos(event)"/>
<label >Circulo</label>
<input type="radio" name="forma" value="Circulo" id="Circulo" onchange="circulos(event)" />
</form>
</div>
</div>
        `
if(N===4)contenedor.innerHTML=`
<div class="row justify-content-center">
    <div id="1"class="col-2 boton m-1"></div>
    <div id="2"class="col-2 boton m-1"></div>
    <div id="3"class="col-2 boton m-1"></div>
    <div id="4"class="col-2 boton m-1"></div>
</div>
<div class="row justify-content-center">
    <div id="5"class="col-2 boton m-1"></div>
    <div id="6"class="col-2 boton m-1"></div>
    <div id="7"class="col-2 boton m-1"></div>
    <div id="8"class="col-2 boton m-1"></div>
</div>
<div class="row justify-content-center">
    <div id="9"class="col-2 boton m-1"></div>
    <div id="10"class="col-2 boton m-1"></div>
    <div id="11"class="col-2 boton m-1"></div>
    <div id="12"class="col-2 boton m-1"></div>
</div>
<div class="row justify-content-center">
    <div id="13"class="col-2 boton m-1"></div>
    <div id="14"class="col-2 boton m-1"></div>
    <div id="15"class="col-2 boton m-1"></div>
    <div id="16"class="col-2 boton m-1"></div>
</div>
           
<div class="row justify-content-center">
<div class="col-8 m-2 ">
<form method="post" action="#"" >
<label >Cuadrado</label>
<input type="radio" name="forma" value="Cuadrado" id="Cuadrado" onchange="circulos(event)"/>
<label >Circulo</label>
<input type="radio" name="forma" value="Circulo" id="Circulo" onchange="circulos(event)" />
</form>
</div>
</div>
`
menu.innerHTML="";
//menu.innerHTML=`<p> La cantidad de jugadores es ${cantJugadores},tablero de ${N}x${N} y colores ${coloresVector.join(",")}</p>`
contJugador=new Array(cantJugadores);
for(let i =0;i<N;i++) matrix[i]=new Array(N);
for(let i =0;i<N;i++) for(let j =0;j<N;j++) matrix[i][j]=0;
const botones=document.getElementsByClassName("boton");
   

    for(boton of botones)
    {
        boton.addEventListener("click",inicioJuego);
    }

}
else
    {
    document.getElementById("Estado").innerText=`Estado del juego`;
      const menu=document.getElementById("menu");
      menu.innerHTML=`
     
        <label>Elija el tipo de tablero: </label>
                
        <label >3x3</label>
        <input type="radio" name="tipo" value="3x3" id="Tablero3x3" onchange="selTab(event)"/>
        <label >4x4</label>
        <input type="radio" name="tipo" value="4x4" id="Tablero4x4" onchange="selTab(event)" />
            </br>
        <label>Elija el numero de jugadores: </label>
  
      <select id="jugadores" onchange="selJug(event)">
            <option id="jugador0" ></option>
            <option id="jugador2" >2 jugadores</option>
            <option id="jugador3" >3 jugadores</option>
            <option id="jugador4" >4 jugadores</option>
        </select>
        </br>
             <label for="color1">Jugador 1 </label> 
            <input type="color" id="color1" required value="#ff0000" onchange="selCol(event)" />
            <label for="color2">Jugador 2 </label> 
            <input type="color" id="color2" required value="#00ff00" onchange="selCol(event)"/>
            <label for="color3">Jugador 3 </label>
            <input type="color" id="color3" required value="#0000ff" onchange="selCol(event)"/>
            <label for="color4">Jugador 4 </label> 
            <input type="color" id="color4" required value="#ffff00" onchange="selCol(event)"/>
        </br>
      
      `
        contenedor.innerHTML="";

        event.target.innerHTML="Iniciar";
    }

}

function circulos(event)
{
    const botones=document.getElementsByClassName("boton");
   
console.log(event);
if(event.target.id==="Cuadrado")
for(boton of botones) boton.style.borderRadius="0%";

if(event.target.id==="Circulo")
for(boton of botones) boton.style.borderRadius="50px";
    
}
function start(){

  
  

}



window.onload=start;
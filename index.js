//Declaro  matriz del juego y la inicializo
const N=3;//dimencion del tablero
const cantJugadores=2;//jugadores
var contJugador=new Array(cantJugadores);
var coloresVector=["White","Black","Red"];//colores disponibles
var Jugador;
var matrix = [];

for(let i =0;i<N;i++) matrix[i]=new Array(N);
for(let i =0;i<N;i++) for(let j =0;j<N;j++) matrix[i][j]=0;
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
      return 2;
    }
    resultado=verificacionFilas();
    if(resultado!=0) 
    {
     window.console.clear();
    console.log(`Ganador Jugador ${resultado[0]} Fila: ${resultado[1]}`);
      return 2;
    }
    resultado=verificacionDiagonales();
    if(resultado!=0) 
    {
    window.console.clear();
    console.log(`Ganador Jugador ${resultado[0]} Diagonal: ${resultado[1]}`);
      return 2;
    }


    for(let i =0;i<N;i++) 
        {   for(let j =0;j<N;j++) 
                if(matrix[i][j]==0) {console.log("Continuar");return 0}
                     
                        
        }
        window.console.clear();
        console.log("Empate");
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
        boton.removeEventListener("click",gameStart);
    }
}


function start(){
    const botones=document.getElementsByClassName("boton");
    
    for(boton of botones)
    {
        boton.addEventListener("click",inicioJuego);
    }

}



window.onload=start;
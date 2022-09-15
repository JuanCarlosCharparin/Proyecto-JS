// Piedra Papel o tijera
//Creacion y asignacion de variables
const piedra = 0
const papel = 1
const tijera = 2

//Traigo de html mis botones principales
const tijera1 = document.getElementsByClassName('tijera')[0]
const piedra1 = document.getElementsByClassName('piedra')[0]
const papel1 = document.getElementsByClassName('papel')[0]

//Traigo div donde voy a mostrar el resultado
const mostrarResult = document.getElementById('resultado')

//Traigo div donde van las imagenes del resultado
const userImg = document.getElementById("userImg")
const machineImg = document.getElementById("machineImg")

//div para puntaje
const user = document.getElementById("user")
const machine = document.getElementById("machine")

//Inicializo marcadores
let marcador1 = 0
let marcador2 = 0

//Asigno numeros a mis opciones de resultado
const empate = 0
const ganado = 1
const perdido = 2

//Listeners de mis botones
tijera1.addEventListener('click', () => {
    Jugar(tijera)
})

piedra1.addEventListener('click', () => {
    Jugar(piedra)
})

papel1.addEventListener('click', () => {
    Jugar(papel)
})

/
function Jugar(usuario){
    let computer = ""
    const maquina = Math.floor(Math.random() * 3)
    const result = Resultado(usuario, maquina)

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c088dc5743msh5afb656aa8214c1p11d56djsn6ab38d3a0735',
            'X-RapidAPI-Host': 'rock-paper-scissor2.p.rapidapi.com'
        }
    };
   
    if (maquina == 0){
        computer = "rock"
        fetch('https://rock-paper-scissor2.p.rapidapi.com/api/rock', options)
            .then(response => response.json())
            .then(({computer}) => (computer))
            .catch(err => console.error(err));
    } else if (maquina == 1){
        computer = "paper"
        fetch('https://rock-paper-scissor2.p.rapidapi.com/api/paper', options)
            .then(response => response.json())
            .then(({computer}) => (computer))
            .catch(err => console.error(err));
    } else if (maquina == 2){
        computer = "scissor"
        fetch('https://rock-paper-scissor2.p.rapidapi.com/api/scissor', options)
            .then(response => response.json())
            .then(({computer}) => (computer))
            .catch(err => console.error(err));
    }

    if (usuario == 0){userImg.src = "./img/piedraImg.jpg"}
    if (usuario == 1){userImg.src = "./img/papelImg.jpg"}
    if (usuario == 2){userImg.src = "./img/tijeraImg.jpg"}

    if (computer == "rock"){machineImg.src ="./img/piedraImgInvertida.jpg"}
    if (computer == "paper"){machineImg.src = "./img/papelImgInvertida.jpg"}
    if (computer == "scissor"){machineImg.src = "./img/tijeraImgInvertida.jpg"}
    
    

    switch (result){
        case empate :
            mostrarResult.innerHTML = "EMPATE"
            break
        case ganado :
            mostrarResult.innerHTML = "GANASTE"
            break
        case perdido :
            mostrarResult.innerHTML = "PERDISTE"
            break   
    }
    
    
    if (mostrarResult.innerHTML == "GANASTE"){
        
        marcador1++
        localStorage.setItem("Usuario", marcador1)
        user.innerHTML = `
        ` + marcador1
        
        if(marcador1 == 3){
            Toastify({
                text: "Ganaste la Partida",
                duration: 3000,
                gravity: "top", 
                position: "left",
                stopOnFocus: true,
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                
              }).showToast();
            marcador1 = 0
            user.innerHTML = 0
            machine.innerHTML = 0
            marcador2 = 0
        }
    }
    
    if (mostrarResult.innerHTML == "PERDISTE"){
        marcador2++
        localStorage.setItem("Maquina", marcador2)
        machine.innerHTML = `
        ` + marcador2

        if(marcador2 == 3){
            Toastify({
                text: "Perdiste la Partida",
                duration: 3000,
                gravity: "top", 
                position: "right", 
                stopOnFocus: true, 
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
               
              }).showToast();
            marcador2 = 0
            user.innerHTML = 0
            machine.innerHTML = 0
            marcador1 = 0
        } 
    }  
    
    
            
}

function Resultado(usuario, maquina){
    
    if (usuario == maquina){
        return empate

    } else if (usuario == piedra) {
        
        if (maquina == papel) return perdido
        if (maquina == tijera) return ganado

    } else if (usuario == papel) {

        if (maquina == tijera) return perdido
        if (maquina == piedra) return ganado

    } else if (usuario == tijera) {

        if (maquina == papel) return ganado
        if (maquina == piedra) return perdido

    }
}




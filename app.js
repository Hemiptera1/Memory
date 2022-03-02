const cartas = [
    {
        nombre: 'chariot',
        ruta: 'img/chariot.jpg'
    },
    {
        nombre: 'devil',
        ruta: 'img/devil.jpg'
    },
    {
        nombre: 'empress',
        ruta: 'img/empress.jpg'
    },
    {
        nombre: 'fool',
        ruta: 'img/fool.jpg'
    },
    {
        nombre: 'hanged',
        ruta: 'img/hanged.jpg'
    },
    {
        nombre: 'hieropant',
        ruta: 'img/hieropant.jpg'
    },
    {
        nombre: 'priesstes',
        ruta: 'img/priesstes.jpg'
    },
    {
        nombre: 'strenght',
        ruta: 'img/strenght.jpg'
    },
    {
        nombre: 'sun',
        ruta: 'img/sun.jpg'
    }
]

const main = document.querySelector('main')
let muertos = 0
let exluir = []
let enJuego = []
let dos = false
let audio = new Audio()
const sonidos = ['sonidos/cardPlace1.wav','sonidos/cardPlace2.wav','sonidos/cardPlace3.wav','sonidos/cardPlace4.wav']
const sonidoCorrecto = 'sonidos/Coin01.mp3'
const victoria = 'sonidos/you_win.ogg'
for(i = 0; i < cartas.length*2; i++){
    let divCarta = document.createElement('div')
    divCarta.classList.add('divCarta')
    main.append(divCarta)

    if(i == 9){ exluir = [], dos = true }
    let picker = Math.floor(Math.random() * 9)
    while(exluir.includes(picker)){ picker =  Math.floor(Math.random() * 9) }
    exluir.push(picker)

    let img = document.createElement('img')
    img.src = cartas[picker].ruta
    // DAR NOMBRE Y DISTINGUIR ENTRE IGUALES CON *
    if(dos == false){ img.dataset.nombre = cartas[picker].nombre }else if(dos == true){ img.dataset.nombre = cartas[picker].nombre + '*' }
    img.classList.add('carta', 'elegido', cartas[picker].nombre)
    img.addEventListener('click', () => {
        let pickerSonido = Math.ceil(Math.random() * 4 - 1)
        audio.src = sonidos[pickerSonido]
        audio.play()
        img.classList.toggle('elegido')
        if(enJuego.length == 0){
            enJuego.push(img.dataset.nombre)
        }else if(enJuego.length == 1 & enJuego[0] !== img.dataset.nombre){
            let img2 = document.querySelector(`[data-nombre="${enJuego[0]}"]`)
            enJuego.push(img.dataset.nombre)
            if(enJuego[0] + '*' == enJuego[1] || enJuego[0] == enJuego[1] + '*'){
                audio.src = sonidoCorrecto
                audio.play()
                setTimeout(() => {
                    img.parentElement.classList.toggle('muerto')
                    img2.parentElement.classList.toggle('muerto')
                }, 500)
                muertos += 1
                console.log(muertos)
                if(muertos == 9){
                    audio.src = victoria
                    audio.play()
                    setTimeout(() => {
                        document.location.reload()
                    }, 1000)
                }
                enJuego = []
            }else if(enJuego[0] !== enJuego[1]){
                setTimeout( () => {
                    img.classList.toggle('elegido')
                    img2.classList.toggle('elegido')
                }, 500)
                enJuego = []
            }
        }else if(enJuego.length == 1 && enJuego[0] == img.dataset.nombre){
            enJuego = []
        }
    })
    divCarta.append(img)
}
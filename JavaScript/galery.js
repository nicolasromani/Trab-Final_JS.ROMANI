/*Variables*/
const btnCierra = document.querySelector('#btn-cierra');
const btnAdelanta = document.querySelector('#btn-adelantar');
const btnRetrocede = document.querySelector('#btn-retroceder');

const galeriaSection1 = document.querySelector('#galeria1');
const galeriaSection2 = document.querySelector('#galeria2');
const galeriaSection3 = document.querySelector('#galeria3');

const imagenesArray1 = Array.from(galeriaSection1.querySelectorAll('img'));
const imagenesArray2 = Array.from(galeriaSection2.querySelectorAll('img'));
const imagenesArray3 = Array.from(galeriaSection3.querySelectorAll('img'));

const contenedorPrincipal = document.querySelector('#contenedorPrincipal');
const imagenActiva = document.querySelector('#imagen-activa');

let indiceImagen1 = 0;
let indiceImagen2 = 0;
let indiceImagen3 = 0;


const abrirGaleria1 = () => {
    indiceImagen1 = 0;
    imagenActiva.src = imagenesArray1[indiceImagen1].src;
    contenedorPrincipal.style.display = 'flex';

    btnAdelanta.addEventListener('click', adelantaImagen(indiceImagen1, imagenesArray1));
    btnRetrocede.addEventListener('click', retrocedeImagen(indiceImagen1, imagenesArray1));
};

const abrirGaleria2 = () => {
    indiceImagen2 = 0;
    imagenActiva.src = imagenesArray2[indiceImagen2].src;
    contenedorPrincipal.style.display = 'flex';

    btnAdelanta.addEventListener('click', adelantaImagen(indiceImagen2, imagenesArray2));
    btnRetrocede.addEventListener('click', retrocedeImagen(indiceImagen2, imagenesArray2));
};

const abrirGaleria3 = () => {
    indiceImagen3 = 0;
    imagenActiva.src = imagenesArray3[indiceImagen3].src;
    contenedorPrincipal.style.display = 'flex';

    btnAdelanta.addEventListener('click', adelantaImagen(indiceImagen3, imagenesArray3));
    btnRetrocede.addEventListener('click', retrocedeImagen(indiceImagen3, imagenesArray3));
};

// Función para adelantar imagen
const adelantaImagen = (indice, imagenesArray) => () => {
    if (indice == imagenesArray.length - 1) {
        indice = -1;
    }
    indice++;
    imagenActiva.src = imagenesArray[indice].src;
};

// Función para retroceder imagen
const retrocedeImagen = (indice, imagenesArray) => () => {
    if (indice == 0) {
        indice = imagenesArray.length;
    }
    indice--;
    imagenActiva.src = imagenesArray[indice].src;
};

/*Cerrar contenedorPrincipal*/
btnCierra.addEventListener('click', () => {
    contenedorPrincipal.style.display = 'none';
    btnAdelanta.removeEventListener('click', adelantaImagen);
    btnRetrocede.removeEventListener('click', retrocedeImagen);
});

/*Abrir contenedorPrincipal*/
document.querySelector('#mostrar-galeria1').addEventListener('click', abrirGaleria1);
document.querySelector('#mostrar-galeria2').addEventListener('click', abrirGaleria2);
document.querySelector('#mostrar-galeria3').addEventListener('click', abrirGaleria3);


/*VARIABLES del FORMULARIO*/

// Se crean variables globales para ahorrar enviar como parametro pero modificar sus datos en el codigo en general
let datosReserva = {}; 
let cantDias = 0;
let gastoTotal = 0;
let gastoConIVA = 0;
let montoCuotas, totalConTarj;

let promoCode = document.getElementById('promoCode');
let fontSize = 20;
let fontSizeMax = 35;

let book = document.getElementById('book');
let btnReserva = document.getElementById('btnReserva');
let comprobante = document.getElementById('abrirComprobante');
let comprobanteHTML = document.getElementById('contenedorDeDatos');
let cerrarCompr = document.getElementById('cerrarComprobante');

let checkIn = document.getElementById('checkin');
let checkOut = document.getElementById('checkout');

/*FUNCIONES NECESARIAS*/

function cantHabitaciones (arregloInput) {
    for (i = 0; i < arregloInput.length; i++) {
        if (arregloInput[i] != '') {
            arregloInput[i] = Number(arregloInput[i]);
        } else {
            arregloInput[i] = 0;
        }
    }
    //Aca le aplico un filtro para asegurarme que a pesar de poner numeros negativos el sistema tome su valor absoluto.
    //Aun no encontre como modificar el front para que el input directamente no tenga habilitado colocar un numero negativo.
    for (j = 0; j < arregloInput.length; j++) {
        if (arregloInput[j] < 0) {
            arregloInput[j] = (-1) * arregloInput[j];
        }
    }
}

function gastosConIva (arr1,arr2,arr3) {
    const precios = [2500, 3500, 4500, 3500, 4500, 5500, 5500, 6500, 7500];
    const habitaciones = [arr1, arr2, arr3];
    let i = 0;

    for (const habitacion of habitaciones) {
        for (const key of habitacion) {
            gastoTotal = gastoTotal + key * precios[i];
            i++;
        }
    }
    gastoTotal = gastoTotal + (gastoTotal*(0.21)); //SUMO IVA a todas las habitaciones para UNA NOCHE
    gastoConIVA = gastoTotal * cantDias; //Se aplica el gasto a la cantidad de dias
}

function descuento (wordcode){
    wordcode = wordcode.toUpperCase();
    if (wordcode == "CENTE10OFF") {
        gastoConIVA = gastoConIVA - (gastoConIVA * 0.10);
        datosReserva.codigo = "CODIGO 10%OFF APLICADO";
    } else {
        datosReserva.codigo = "SIN CODIGO DE DESCUENTO";
    }
}

function formeDepago(medioDePago,cuota) {
    datosReserva.medioDePago = medioDePago;
    if (medioDePago == 'Credito') {
        if (cuota == 'una') {
            montoCuotas = Math.round(gastoConIVA);
            totalConTarj = Math.round(gastoConIVA);
            datosReserva.cantCuotas = 1;
            datosReserva.cuotas = montoCuotas;
            datosReserva.total = totalConTarj;
           
        } else if (cuota == 'tres') {
            montoCuotas = Math.round((gastoConIVA + (gastoConIVA*0.1)) / 3);
            totalConTarj = Math.round(montoCuotas * 3);
            datosReserva.cantCuotas = 3;
            datosReserva.cuotas = montoCuotas;
            datosReserva.total = totalConTarj;
           
        } else if (cuota == 'seis') {
            montoCuotas = Math.round(gastoConIVA / 6);
            totalConTarj = Math.round(gastoConIVA);
            datosReserva.cantCuotas = 6;
            datosReserva.cuotas = montoCuotas;
            datosReserva.total = totalConTarj;
            
        } else {
            montoCuotas = Math.round((gastoConIVA + (gastoConIVA*0.2)) / 12);
            totalConTarj = Math.round(montoCuotas * 12);
            datosReserva.cantCuotas = 12;
            datosReserva.cuotas = montoCuotas;
            datosReserva.total = totalConTarj;
            
        }
    } else if (medioDePago == 'Debito') {
        montoCuotas = Math.round(gastoConIVA);
        totalConTarj = Math.round(gastoConIVA);
        datosReserva.cantCuotas = 1;
        datosReserva.cuotas = montoCuotas;
        datosReserva.total = totalConTarj;
    }
}

/*EJECUCION DEL PROCESO*/

setInterval (function () {
    fontSize += 2;
    if (fontSize > fontSizeMax) {
        fontSize = 20;
    }
    promoCode.style.fontSize = fontSize + 'px';
}, 300);

let cupon = document.getElementById('discountCupon');
cupon.addEventListener('change', () => {
    let cuponValue = cupon.value.toUpperCase();
    cuponValue == "CENTE10OFF"
    ?   Toastify({
            text:"CUPON VALIDO",
            duration: 3000,
            stopOnFocus: true,
            style: {
                background: "green",
                fontSize: '22px',
                color: "white",
                borderRadius: '10px',
                height: '50px'
            }
        }).showToast()
    :   Toastify({
            text:"CUPON INVALIDO",
            duration: 3000,
            stopOnFocus: true,
            style: {
                background: "red",
                fontSize: '22px',
                color: "white",
                borderRadius: '10px',
                height: '50px'
            }
        }).showToast();
});

book.addEventListener('click', () => {

    //Aca voy a capturar los value de todos los elementos de los cuales necesito comprobar que contienen informacion. 
    
    let fullname = document.getElementById('fullname').value;
    let telephone = document.getElementById('telefono').value;
    let email = document.getElementById('email').value;

    let juniorSimple = document.getElementById('jun.sim');
    let juniorDoble =  document.getElementById('jun.dob');
    let juniorConfort = document.getElementById('jun.conf');

    let superiorSimple = document.getElementById('sup.sim');
    let superiorDoble = document.getElementById('sup.dob');
    let superiorConfort = document.getElementById('sup.conf');

    let deluxeSimple = document.getElementById('del.sim');
    let deluxeDoble = document.getElementById('del.dob');
    let deluxeConfort = document.getElementById('del.conf');
    
    let cupon = document.getElementById('discountCupon').value;
    let termsCond = document.getElementById('checkBox').checked;

    if (fullname && telephone && email && checkIn.value !='' && checkOut.value !='' && termsCond) {
        
        //Los datos que no necesitan mas procesos se guardan en este objeto el cual es el que se enviar por sessionStorage.
        datosReserva.fullname = fullname;
        datosReserva.tel = telephone;
        datosReserva.mail = email;

        if (checkOut.value > checkIn.value) {

            let fechaCheckIn = new Date(checkIn.value);
            let fechaCheckOut = new Date(checkOut.value);

            cantDias = (fechaCheckOut - fechaCheckIn) / 86400000;
            datosReserva.cantDias = cantDias;

            //Capturo los valores, pero para evitar copiar un vacio (no colocar datos en input) ejecuto la funcion cantHabitaciones que vuelve 0 a los vacios y Number a los datos
            let arrayJunInput = [juniorSimple.value, juniorDoble.value, juniorConfort.value];
            let arraySupInput = [superiorSimple.value, superiorDoble.value, superiorConfort.value];
            let arrayDelInput = [deluxeSimple.value, deluxeDoble.value, deluxeConfort.value];

            cantHabitaciones(arrayJunInput);
            let cantJun = arrayJunInput.reduce((acumulador,elemento) => acumulador + elemento, 0);
            datosReserva.cantJun = cantJun;

            cantHabitaciones(arraySupInput);
            let cantSup = arraySupInput.reduce((acumulador,elemento) => acumulador + elemento, 0);
            datosReserva.cantSup = cantSup;

            cantHabitaciones(arrayDelInput);
            let cantDel = arrayDelInput.reduce((acumulador,elemento) => acumulador + elemento, 0);
            datosReserva.cantDel = cantDel;

            if (cantJun + cantSup + cantDel > 0) {

                //En esta funcion envio 3 arrays los cuales tiene los numeros de los input de habitaciones y ya se pasaron a Number() con esto hago una doble iteracion para saber el monto total
                //luego se le aplica indistintamente el 21% de IVA y se multiplica por los dias para obtener el total del gasto a realizar.
                gastosConIva(arrayJunInput,arraySupInput,arrayDelInput);
                
                //Luego de obtener el valor del input del cupon se ejecuta esta funcion en orden, de haber macht con el wordcode se aplica el descuento. Este dato nunca es mostrado al usuario hasta que 
                //pueda ver su comprobante de RESERVA.
                //EN CASO AFIRMATIVO DEL CUPON QUIZAS CON ALGUNA LIBRERIA O MODIFICANDO EL NODO PODRIA AGREGAR UNA LEYENDA QUE DIGA QUE EL CODIGO ES VALIDO PERO NECESITARIA PONER UN BOTON U ACCION MAS
                //LUEGO DE ESCRIBIR EL CODIGO DE DESCUENTO. ESTO PODRIA RESOLVERLO PARA LA SIGUIENTE ENTREGA.
                
                descuento(cupon);

                //Con esta funcion lo que se haces es enviar los value del medio de pago y cant de cuotas para hacer el calculo de los gastos con o sin intereses. Estos datos son almacenados
                formeDepago(document.getElementById('medioDePago').value, document.getElementById('cantCuotas').value);

                sessionStorage.setItem("datos",JSON.stringify(datosReserva)); //Envio un obj como JSON a sessionStorage para mostrarlo luego en el bloque de la reserva.

                /*Bloque RESET*/
                arrayJunInput = [];
                arraySupInput = [];
                arrayDelInput = [];
                gastoConIVA = 0;
                gastoTotal = 0;

                //Muestro un boton que me permitira mostrar el comprobante de toda la informacion guardada en un SesionStorage.
                btnReserva.style.display = 'block';
                //borro el boton reserva para evitar sobrescribir informacion y evitar errores
                book.style.display = 'none';
            } else {
                Swal.fire ({
                    title: 'No tan rapido...',
                    text: 'Debes elegir al menos una habitación',
                    confirmButtonText: 'Aceptar' 
                });     //HAY QUE ESTILIZAR LOS SWEETALERT
            }
        } else {
            Swal.fire ({
                title: 'Algo salió mal!',
                text: 'El Check Out no puede ser anterior a la fecha de Check In',
                icon: 'error',
                confirmButtonText: 'Aceptar' 
            });
        }
    } else {
        Swal.fire ({
            title: 'Aguarda...',
            text: 'Debes completar toda la informacion antes de continuar',
            confirmButtonText: 'Aceptar' 
        });
    }

});

btnReserva.addEventListener ('click', () => {
    comprobante.style.display = 'block';
    btnReserva.style.display = 'none'; //Cambio el display para que no se sigan acumulando las creaciones del div(conteiner) quitando la posibilidad de seguir clickeando el boton

    //Recupero los datos guardados en sessionStorage y los parseo para obtener le obj Js
    let muestra = JSON.parse(sessionStorage.getItem("datos"));

    let conteiner = document.createElement ("div");
    conteiner.className = "comprobante__reserva"
    conteiner.innerHTML = `<h4>Reserva a nombre de: ${muestra.fullname}</h4>
                            <p>Email de contacto: ${muestra.mail}</p>
                            <p>Tel de contacto: ${muestra.tel}</p>
                            <p>Cantidad de noches: ${muestra.cantDias}</p>
                            <p>Cantidad habitaciones Junior ${muestra.cantJun}</p>
                            <p>Cantidad de habitaciones Superior ${muestra.cantSup}</p>
                            <p>Cantidad de habitaciones Deluxe ${muestra.cantDel}</p>
                            <p>Codigo: ${muestra.codigo}</p>
                            <p>Medio de pago: ${muestra.medioDePago} - cantidad de cuota/s ${muestra.cantCuotas}</p>
                            <p>Valor de cuota/s: $${muestra.cuotas} - Total a abonar: $${muestra.total}</p>`;

    comprobanteHTML.append(conteiner);

    //Este pequeno bloque es para limpiar los inputs luego de hacer la reserva

    let fullname = document.getElementById('fullname');
    let telephone = document.getElementById('telefono');
    let email = document.getElementById('email');
    let juniorSimple = document.getElementById('jun.sim');
    let juniorDoble =  document.getElementById('jun.dob');
    let juniorConfort = document.getElementById('jun.conf');
    let superiorSimple = document.getElementById('sup.sim');
    let superiorDoble = document.getElementById('sup.dob');
    let superiorConfort = document.getElementById('sup.conf');
    let deluxeJunior = document.getElementById('del.sim');
    let deluxeDoble = document.getElementById('del.dob');
    let deluxeConfort = document.getElementById('del.conf');
    let cupon = document.getElementById('discountCupon');
    let termsCond = document.getElementById('checkBox');    

    //ESTO ES PARA FETCH

    /*Para el uso de promesas y asincronia opte por usar el metodo post con la idea de mandar la informacion que obtengo del usuario a traves del formulario
    pero a efectos practicos volverlo a pegar en el comprobante de reserva para mostrar el proceso de guardado de los datos, su recuperacion y manipulacion 
    del DOM. */
    const formData = {
        nombre: fullname.value,
        email: email.value,
        telefono : telephone.value
    };

    const emailPost = async () => {
        try {
            const response = await fetch ('https://jsonplaceholder.typicode.com/posts',{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            
            let emailData = document.createElement ('article');
            emailData.className = "datos_mail";
            emailData.innerHTML = `<h2>Se enviara una copia de la reserva a la siguiente casilla de correo: ${formData.email}</h2>
                                    <h2>A nombre de: ${formData.nombre} con telefono: ${formData.telefono}</h2>`;
            comprobanteHTML.append(emailData);
        } catch (error) {
            //Esto solo se deja a efectos practicos, para no dejar la rama vacia.
            console.error("Error: ", error);
        }
    };

    emailPost();

    fullname.value = '';
    telephone.value = '';
    email.value = '';
    juniorSimple.value = '';
    juniorDoble.value = '';
    juniorConfort.value = '';
    superiorSimple.value = '';
    superiorDoble.value = '';
    superiorConfort.value = '';
    deluxeJunior.value = '';
    deluxeDoble.value = '';
    deluxeConfort.value = '';
    cupon.value = '';
    termsCond.checked = false;
    checkIn.value = '';
    checkOut.value= '';
});

cerrarCompr.addEventListener ('click', () => {
    //El boton se oculta para evitar generar un error por encima del comprobante abierto. De este modo quito la opcion al usuario de generar el error.
    book.style.display = 'block'; 
    comprobante.style.display = 'none';

    // Con esto borro los datos del contenedorHTML para que luego de cerrar, poner datos nuevos y reservar se cree con nuevos datos. Evitando el error que tenia de encimar los contenedores
    while (comprobanteHTML.firstChild) {
        comprobanteHTML.removeChild(comprobanteHTML.firstChild);
    }

    //Con esto libero la informacion sin usar un refresh de la pantalla y poder almacenar nueva informacion. Es a modo practico, pero se podrian guardar o reservar de forma continua
    sessionStorage.removeItem("datos");
    
});
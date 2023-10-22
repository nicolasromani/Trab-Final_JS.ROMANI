
/*Bloque de variables globales*/

let simple = { jun: 0, sup: 0, del: 0};
let doble = { jun: 0, sup: 0, del: 0};
let confortDoble = { jun: 0, sup: 0, del: 0};
let presupuesto_sin_desc = 0;
let presupuestoTotal = 0;

const chequeoDatos = [];
const revisionArray = ["tipologia","cantidad de noches","cantidad de cuotas","valor de cuotas","total"];

/* Bloque de funciones*/

function confortCantidad() {
    let opcion = parseInt(prompt("Seleccione el tipo de Confort:\n1. Junior\n2. Superior\n3. Deluxe"));
    let cant_jun = 0, cant_sup = 0, cant_del = 0;
    switch (opcion) {
        case 1:
            cant_jun = parseInt(prompt("Cantidad Junior: "));
            break;
        case 2:
            cant_sup = parseInt(prompt("Cantidad Superior: "));
            break;
        case 3:
            cant_del = parseInt(prompt("Cantidad Deluxe: "));
            break;
    }
    return { cant_jun, cant_sup, cant_del };
}

//Con esta funcion logro modificar los objetos simple,doble y confortDoble (declarados globales) para ser utilizados mas adelante.
function tipologia() {
    let flag = 0;
    alert ("LISTA DE PRECIOS:\n\t\t\t\tJunior\tSuperior\tDeluxe\nSimple\t$2500\t3500\t$4500\nDoble\t$3500\t$4500\t$5500\nConfort\t$5500\t$6500\t$7500")
    let varCant = parseInt(prompt("Cantidad de habitaciones que precisa:..."));
    for ( let i = varCant; i > 0 && flag < varCant ; i--) {
        let chooiceTipe = parseInt(prompt("SELECCIONE TIPO:\n1. Simple\n2. Doble\n3. Confort doble (Matrimonial)"));
        switch (chooiceTipe) {
            case 1:
                const obj1 = confortCantidad();
                simple.jun += obj1.cant_jun;
                simple.sup += obj1.cant_sup;
                simple.del += obj1.cant_del;
                flag += obj1.cant_jun + obj1.cant_sup + obj1.cant_del;
                //console.log("cantidad de flags: " + flag); 
                //Su uso es solamenta para corroborar que se van cargando las opciones.
                break;
            case 2:
                const obj2 = confortCantidad();
                doble.jun += obj2.cant_jun;
                doble.sup += obj2.cant_sup;
                doble.del += obj2.cant_del;
                flag += obj2.cant_jun + obj2.cant_sup + obj2.cant_del;
                //console.log("cantidad de flags: " + flag);
                //Su uso es solamenta para corroborar que se van cargando las opciones.
                break;
            case 3:
                const obj3 = confortCantidad();
                confortDoble.jun += obj3.cant_jun;
                confortDoble.sup += obj3.cant_sup;
                confortDoble.del += obj3.cant_del;
                flag += obj3.cant_jun + obj3.cant_sup + obj3.cant_del;
                //console.log("cantidad de flags: " + flag);
                //Su uso es solamenta para corroborar que se van cargando las opciones.
                break;
        };
    }
}
//Esta funcion es la que recibe los 3 objetos como parametros y dentro se crea un Array de objetos para hacer una doble iteracion y entrar en cada elemento de cada objeto de forma secuencial.
function presupuesto (simple, doble, confortDoble) {
    const precios = [2500, 3500, 4500, 3500, 4500, 5500, 5500, 6500, 7500]; //valores de todas las habitaciones ordenadas de forma ascendente para que sean conincidentes con el Array habitaciones
    const habitaciones = [ simple, doble, confortDoble]; //Array de objetos para hacer una doble iteracion
    let gastoTotal = 0, i = 0;

for (const objet of habitaciones) {
    for (const key in objet ) {
        gastoTotal = gastoTotal + (objet[key]*precios[i]);
        i++;
        //console.log (objet[key])
    }
}
let cantNoches = parseInt(prompt("Cantidad de noches que desea alojarse (Contempla todas las habiataciones elegidas): "));
chequeoDatos.push(cantNoches);
return cantNoches*gastoTotal;
}

function descuento (presupuesto){
    let wordcode = prompt("Ingrese su cupon de descuento...");
    wordcode = wordcode.toUpperCase();
    if (wordcode == "CENTE10OFF") {
        presupuesto = presupuesto - (presupuesto*0.10);
        alert ("Descuento aplicado correctamente");
        console.log("Monto total abonar por reserva con el descuento es: " + presupuesto);
    } else {
        alert("Lo siento cupon incorrecto.")
        console.log("Monto total abonar por reserva sin descuento es: " + presupuesto);
    }
    return presupuesto;
}

function credito (monto,cant_cuotas) {
    let cuota, total;
    if (cant_cuotas == 3) {
        cuota = (monto + (monto*0.2)) / 3;
        total = cuota*3;
        alert ("El total a abonar es 3 cuotas de $" + cuota + " por un total de $" + total);
    } else if (cant_cuotas == 1) {
        alert ("Total a abonar es 1 cuota de: $" + monto);
    }   else {
        cuota = (monto + (monto*0.3)) / 6;
        total = cuota*6;
        alert ("El total a abonar es de 6 cuotas de $" + cuota + " por un total de $" + total);
    }
    chequeoDatos.push(cuota);
    chequeoDatos.push(total);
}

function formeDepago() {
    let opcion_pago;
    do {
        opcion_pago = parseInt(prompt("Formas de Pago:\tSeleccione una opcion\n1. Debito\n2. Tarjetas de credito"));
    } while (opcion_pago != 1 && opcion_pago != 2);
    let opcion_cuota;
    switch (opcion_pago) {
        case 1:
            alert ("Total a abonar es: $" + presupuestoTotal);
            chequeoDatos.push('Debito');
            chequeoDatos.push(presupuestoTotal);
            chequeoDatos.push(presupuestoTotal);
            break;
        case 2:
            console.log("Tarjetas de credito bancarizadas\n1 Cuota\t\t" + presupuestoTotal + "\n3 cuotas\t\t20% de aumento\n6 cuotas\t\t30% de aumento");
            do {
                opcion_cuota = parseInt(prompt("INGRESE UNA OPCION DE PAGO: 1, 3 o 6 cuotas"));
            }   while ((opcion_cuota != 3 && opcion_cuota != 6) && opcion_cuota != 1);
            chequeoDatos.push(opcion_cuota);
            credito(presupuestoTotal,opcion_cuota);
            break;
        }
}

function muestraDedatos (objeto) {
    for (let i = 1; i <= 3; i++) {
        switch (i) {
            case 1:
                if (objeto.jun != 0) {
                    console.log("Cantidad de habitaciones tipo JUNIOR: " + objeto.jun)
                };
                break;
            case 2:
                if (objeto.sup != 0) {
                    console.log("Cantidad de habitaciones tipo SUPERIOR: " + objeto.sup)
                };
                break;
            case 3:
                if (objeto.del != 0) {
                    console.log("Cantidad de habitaciones tipo DELUXE: " + objeto.del)
                };
                break;
            }
        }   
} 

function menuHotel (valor) {
    const menu = [1,2,3,4,5]
    if (valor == 1) {
        for (let index = 0 ; index < menu.length ; index++) {
            switch (menu[index]) {
                case 1:
                    alert("HABITACIONES");
                    tipologia();
                    break;
                case 2:
                    alert("CANTIDAD DE NOCHES");
                    presupuesto_sin_desc = presupuesto(simple,doble,confortDoble);
                    break;
                case 3:
                    alert("CUPON DE DESCUENTO");
                    //CENTE10OFF (palabra para descuento)
                    presupuestoTotal = descuento(presupuesto_sin_desc);
                    break;
                case 4:
                    alert("FORMAS DE PAGO");
                    formeDepago(); 
                    break;
                case 5:
                    alert("Su reserva se hizo correctamente.")
                    break;
            }
        }
    } 
}

/*Bloque ejecucion del Script*/

alert("Bienvenido a Centenario Hotel - Sistema de reservas en linea");
let opcionEnter = parseInt(prompt("Por favor digite una opcion 1 - Reservas / 0 - Salir"));

while (opcionEnter != 1 && opcionEnter != 0 ) {
    opcionEnter = parseInt(prompt("Debe ingresar 1-Reservas o 0-Salir"));
}

if (opcionEnter == 1) {
    menuHotel(opcionEnter);
    let revision = prompt("Si desea revisar algunos de los siguientes datos por favor TIPEELO TAL COMO SE LEEN:\nTIPOLOGIA\nCANTIDAD DE NOCHES\nCANTIDAD DE CUOTAS\nVALOR DE CUOTAS\nTOTAL\n---Caso contrario dijite NO.");
    revision = revision.toLowerCase();
    if (revisionArray[0] == revision) {
        console.log("SIMPLE:\n");
        muestraDedatos(simple);
        console.log("DOBLES:\n");
        muestraDedatos(doble);
        console.log("CONFORT DOBLE:\n")
        muestraDedatos(confortDoble);
    } else if (revisionArray[1] == revision) {
        console.log("Cantidad de noches: " + chequeoDatos[revisionArray.indexOf(revision) - 1]);
    } else if (revisionArray[2] == revision) {
        console.log("Cantidad de cuotas: " + chequeoDatos[revisionArray.indexOf(revision) - 1]);
    } else if (revisionArray[3] == revision) {
        console.log("Valor de cuotas: " + chequeoDatos[revisionArray.indexOf(revision) - 1]);
    } else if (revisionArray[4] == revision) {
        console.log("Total a abonar: " + chequeoDatos[revisionArray.indexOf(revision) - 1]);
    } else if (revision == "no") {
        console.log("Gracias por elegirnos.")
    } else {
        alert("No dijito ninguna opcion valida, gracias por elegirnos.")
    }
    console.log("Gracias por su reserva lo esperamos.")
} else {
    console.log("Gracias por su visita.")
}



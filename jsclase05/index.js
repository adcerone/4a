const prompt = require("prompt-sync")({ sigint: true });
let dataPerson = [];

const addDataPerson = (firstName = 'jose', lastName = 'ramon', age = 20, status = 1, insert = true) => {
    let persona = {
        firstName,
        lastName,
        age,
        status
    }
    if (insert) {
        dataPerson.push(persona);
    }
    else {
        dataPerson.unshift(persona);
    }
}

addDataPerson("juan", "perez", 20, 1);
addDataPerson("jose", "ramon", 10, 2);
addDataPerson("maria", "ramona", 12, 3, false);
addDataPerson("lucia", "vazques", 14, 3);
addDataPerson("laura", "osorio", 15, 2);
addDataPerson("pedro", "ramon", 10, 2);
addDataPerson("judith", "perez", 30, 1);
addDataPerson("ramona", "mercede", 35, 2);
addDataPerson("lucas", "ramon", 18, 3);
addDataPerson("antonio", "ramon", 19, 1);


/**
 * ACTIVIDA AGREGAR 15 ELEMENTOS DE OBJETO PERSONA AL ARRAY CON DIFERENTE DATA
 * 1.- MOSTRAR EL PROMEDIO DE LAS EDADES
 * 2.- FILTRAR POR NOMBRE O APELLIDO UN VALOR INGRESADO 
 * POR EL USUARIO DONDE COINCIDA CON LA LETRA O PALABRA
 * 
 */

addDataPerson("Sebastian", "Uriarte", 5, 1);
addDataPerson("Santiago", "Iglesias", 24, 2);
addDataPerson("Ramiro", "Otero", 75, 2);
addDataPerson("Roberto", "Ojeda", 34, 3);
addDataPerson("Fabian", "Vargas", 8, 2);
addDataPerson("Silvia", "Parra", 12, 1);
addDataPerson("Micaela", "Gomez", 55, 1);
addDataPerson("Olivia", "Rojo", 34, 1);
addDataPerson("Lia", "Acedo", 18, 3);
addDataPerson("Estela", "Peiro", 33, 3);

let t = 0;

for (let i = 0; i < dataPerson.length; i++) {
    t += dataPerson[i].age;
}

let p = ( t / dataPerson.length)
console.log(('la edad promedio es'),(p),('años'));


console.log('############################################')

const searchTerm = prompt("Ingrese el nombre o apellido a buscar: ").toLowerCase();

const filteredPersons = dataPerson.filter(
    (person) => person.firstName.toLowerCase().includes(searchTerm) || person.lastName.toLowerCase().includes(searchTerm)
);

console.log("Personas encontradas:");
console.log(filteredPersons);
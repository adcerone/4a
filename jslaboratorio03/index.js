let numeros = [15, 2, 35, 4, 5, 16, 7, 8, 10];

for (let i = 0; i < numeros.length; i++) {
  if (numeros[i] > 10) {
    console.log(numeros[i]);
  }
}

console.log("-------------------------------------------")

numeros.forEach(numero => {
  if (numero > 10) {
    console.log(numero);
  }
});

console.log("-------------------------------------------")

let autos = ["VW Up", "Renault Sandero", "VW Gol", "Fiat Uno"];

autos.pop();

console.log(autos);

autos.push("Ford Fiesta");

console.log(autos);

console.log("-------------------------------------------")


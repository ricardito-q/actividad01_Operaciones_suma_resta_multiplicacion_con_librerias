const colors = require('colors');
const axios = require('axios');

const operaciones = {
  suma: (nums) => nums.reduce((acc, num) => acc + num, 0),
  resta: (nums) => nums.reduce((acc, num) => acc - num),
  multiplicar: (nums) => nums.reduce((acc, num) => acc * num, 1)
};

const obtenerBroma = async () => {
  try {
    const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
    const chiste = response.data;
    console.log(`Aquí tienes un chiste antes de iniciar las operaciones: ${chiste.setup} - ${chiste.punchline}`.yellow);
  } catch (error) {
    console.error('Error al obtener la broma:'.red, error);
  }
};

const preguntarOperacion = async () => {
  const inquirer = await import('inquirer');
  const preguntasOperacion = [
    {
      type: 'list',
      name: 'operacion',
      message: 'Seleccione una operación:'.green,
      choices: ['Suma', 'Resta', 'Multiplicar', 'Salir']
    }
  ];

  const { operacion } = await inquirer.default.prompt(preguntasOperacion);

  if (operacion === 'Salir') {
    console.log('gracias'.cyan);
    process.exit();
  }

  const preguntasNumeros = [
    {
      type: 'input',
      name: 'numeros',
      message: 'Ingrese una lista de números separados por comas:'.green,
      filter: (input) => input.split(',').map(Number)
    }
  ];

  const { numeros } = await inquirer.default.prompt(preguntasNumeros);

  let resultado;

  switch (operacion) {
    case 'Suma':
      resultado = operaciones.suma(numeros);
      console.log(`El resultado de la suma es: ${resultado}`.green);
      break;
    case 'Resta':
      resultado = operaciones.resta(numeros);
      console.log(`El resultado de la resta es: ${resultado}`.blue);
      break;
    case 'Multiplicar':
      resultado = operaciones.multiplicar(numeros);
      console.log(`El resultado de la multiplicación es: ${resultado}`.magenta);
      break;
    default:
      console.log('Operación no válida.'.red);
      break;
  }
};

const iniciarPrograma = async () => {
  await obtenerBroma();
  while (true) {
    await preguntarOperacion();
  }
};

iniciarPrograma();







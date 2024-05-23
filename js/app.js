class Pokemon {
    constructor(nombre, tipo, foto) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.foto = foto;
    }

    validarDatos() {
        if (!this.nombre || !this.tipo || !this.foto) {
            throw new Error("Faltan datos del Pokémon.");
        }
    }
}

class Entrenador {
    constructor(id, nombre, pokemons) {
        this.id = id;
        this.nombre = nombre;
        this.pokemons = pokemons.map(pokemon => new Pokemon(pokemon.nombre, pokemon.tipo, pokemon.foto));
    }

    validarDatos() {
        if (!this.id || !this.nombre || !this.pokemons) {
            throw new Error("Faltan datos del Entrenador.");
        }
        for (const pokemon of this.pokemons) {
            pokemon.validarDatos();
        }
    }
}

function imprimirEntrenadores(entrenadores) {
    const contenedor = document.getElementById('entrenadores');
    contenedor.innerHTML = '';

    entrenadores.forEach(entrenador => {
        const entrenadorDiv = document.createElement('div');
        entrenadorDiv.classList.add('entrenador');
        entrenadorDiv.innerHTML = `<h2>${entrenador.nombre}</h2>`;

        entrenador.pokemons.forEach(pokemon => {
            const pokemonDiv = document.createElement('div');
            pokemonDiv.classList.add('pokemon');
            pokemonDiv.innerHTML = `
                <img src="${pokemon.foto}" alt="${pokemon.nombre}">
                <p>${pokemon.nombre}</p>
                <p>${pokemon.tipo}</p>
            `;
            pokemonDiv.style.backgroundColor = getColorByType(pokemon.tipo);
            entrenadorDiv.appendChild(pokemonDiv);
        });

        contenedor.appendChild(entrenadorDiv);
    });
}

function getColorByType(tipo) {
    switch (tipo) {
        case 'Fuego':
            return 'red';
        case 'Agua':
            return 'blue';
        case 'Planta':
            return 'green';
        case 'Tierra':
            return 'brown';
        case 'Roca':
            return 'gray';
        case 'Acero':
            return 'silver';
        case 'Veneno':
            return 'purple';
        case 'Bicho':
            return 'orange';
        case 'Normal':
            return 'lightgray';
        default:
            return 'black';
    }
}

// Cargar datos desde el archivo JSON
fetch('json/entrenadores.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar los datos de los entrenadores. Código de estado: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        const entrenadores = data.map(entrenador => new Entrenador(entrenador.id, entrenador.entrenador, entrenador.pokemons));
        entrenadores.forEach(entrenador => entrenador.validarDatos());
        imprimirEntrenadores(entrenadores);
    })
    .catch(error => {
        console.error(error);
        alert('Error al cargar los datos de los entrenadores.');
    });
// Intentamos cargar el archivo JSON
fetch('json/entrenadores.json')
    .then(response => {
        // Verificamos si la respuesta es exitosa
        if (!response.ok) {
            // Si la respuesta no es exitosa, lanzamos un error
            throw new Error('No se pudo cargar el archivo JSON. Código de estado: ' + response.status);
        }
        // Si la respuesta es exitosa, retornamos los datos en formato JSON
        return response.json();
    })
    .then(data => {
        // Una vez que tenemos los datos en formato JSON, los imprimimos en la consola
        console.log(data);
    })
    .catch(error => {
        // Si ocurre algún error en el proceso, lo mostramos en la consola
        console.error('Error durante la carga del archivo JSON:', error);
    });

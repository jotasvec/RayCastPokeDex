import { useFetch } from '@raycast/utils';

const pokeRandom: number = Math.floor(Math.random()*150)+1 // random number between 1 and 151
const API: string = `https://pokeapi.co/api/v2/pokemon/` //5 is Charmeleon

interface PokeResponse {
    isLoading: boolean; 
    data?: object;
}

interface PokeData{
    name: string;
    sprites: object;
    front_default: string;
    species: object;
    type: object;
    types: object;

  }  



export function getPokemon() {
    const { isLoading, data } = useFetch<any>(`${API}${pokeRandom}/`); 

    //console.log('->', data);
    return { isLoading, data }
}

export function getPokemonByName(name: string) {
    const { isLoading, data } = useFetch<any>(`${API}${name}/`); 
    //console.log('->', data);
    return { isLoading, data }
}
import { useFetch } from '@raycast/utils';

const pokeRandom: number = Math.floor(Math.random()*150)+1 // random number between 1 and 151
const pokeAPI: string = `https://pokeapi.co/api/v2/pokemon/${pokeRandom}/` //5 is Charmeleon

interface PokeResponse {
    isLoading: boolean; 
    data?: object;
}

interface PokeData{
    name: string;
    sprites: object;
    front_default: string;
    species: object;

  }  



export default function getPokemon() {
    const { isLoading, data } = useFetch<any>(pokeAPI); 

    //console.log('->', data);
    return { isLoading, data }
}
import { useFetch } from '@raycast/utils';

const speciesAPI: string = `https://pokeapi.co/api/v2/pokemon-species/`

interface PokeResponse {
    isLoading: boolean; 
    data?: object;
    evolution: object;
    species: object;
    evolution_chain: object;
    
}

function getEvolutionChain(ID:number) {
    const URL = speciesAPI+ID
    const { data } = useFetch<any>(URL)
    /*
    * TODO: hay que buscar dentro desde la url de pokemon 
    * buscar en la url de especies https://pokeapi.co/api/v2/pokemon-species/6/ 
    * el ID para usar en Evolution chain 
    */

    // geting evolution chain number to use it on fetchEvolution url
    const evolutionChain: number = data?.evolution_chain.url.split('/')[6]
    
    return evolutionChain;
}

export default getEvolutionChain;
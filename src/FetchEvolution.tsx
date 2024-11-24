import { useFetch, usePromise } from '@raycast/utils';
import getEvolutionChain from './getSpecies';
import axios from 'axios';

const evoAPI: string = `https://pokeapi.co/api/v2/evolution-chain/`

interface PokeResponse {
    isLoading: boolean; 
    data?: object;
    evolution: object;
    species: object;
    evolves_to: object;
    evolution_details: object;
    name: string;
    result: object;
    
}

function fetchEvoChain(ID:number) {
    const url = `${evoAPI+ID}`;
    const { isLoading, data, error} = usePromise<any>(
        async (url: string) => {
            try {
                const response  = await axios(url).then((resp) => {
                    console.log('response data ', resp.data)
                    console.log('response status ', resp.status)
                    console.log('response statustext ', resp.statusText)
                    return resp.data

                }).catch(error => {
                    console.error("error fetching axios data: ", error)
                })
                /* 
                if (!response) {
                    throw new Error(`Failed to fetch: ${response}`)
                }
                console.log('res', response);
                const result = await response.json();
                console.log('Fetched Result Data: ', result);
                return result; */
                return response

            } catch (error) {
                console.error("error fetching data: ", error)
                throw error
            } 
        },
        [url] //dependency array
    );
    return { isLoading, data, error};


}

export function getEvolution(ID:number) {
    const chainID = getEvolutionChain(ID);
    const chainEvolution: string[] = [];
    const { isLoading, data, error} = fetchEvoChain(chainID)
        /*
    * TODO: hay que buscar dentro desde la url de pokemon 
    * buscar en la url de especies https://pokeapi.co/api/v2/pokemon-species/6/ 
    * el ID para usar en Evolution chain 
    */
    console.log('Data chain ->', data)
    /* if (error) {
        console.error("Error: ",error.message)
    } */

    if(data){
        const evolves_to = data?.chain?.evolves_to
        const chain_base = data?.chain?.species?.name
        // base Pokemon
        if (chain_base) {
            chainEvolution.push(chain_base)
        }

        if (evolves_to?.length){
            const evo: string = data?.chain?.evolves_to[0]?.species?.name
            if(evo){
                chainEvolution.push(evo)
                console.log('evo', evo)
            }
        }

        if (data?.chain?.evolves_to[0]?.evolves_to[0]?.length){
            const evo2: string = data?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name
        
            if(evo2){     
                chainEvolution.push(evo2)
                console.log('evo2', evo2)
            }
        }
        console.log('chainEvolution', chainEvolution)
    }

    
    return { isLoading, chainEvolution, error}
}

// export getEvolution;
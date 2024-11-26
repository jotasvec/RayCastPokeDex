import { Detail } from "@raycast/api";
import { getPokemon, getPokemonByName }  from "./fetchData";
import { getEvolution } from "./FetchEvolution";
import { Icon, List } from "@raycast/api";
import { Colors, getColorByName } from "./Colors";
import { EvolutionTag } from "./evolutionTag";
import { useEffect, useState } from "react";



export default function Command() {
  //const [evoChainData, setEvoChainData] = useState<Record<string, any>[]>([])
  const { isLoading, data } = getPokemon();
  const speciesID = data?.species?.url?.split("/")[6];
  const { isLoading: loadingEvo, chainEvolution } = getEvolution(speciesID)    
  console.log('chainEvolution', chainEvolution)

/*   useEffect(() => {
    const fetchEvoData = async () => {
      const fetchData = await Promise.all(
        chainEvolution.map(async (evo: string) => {
          const { data } = getPokemonByName(evo);
          return { name: evo, data };
        })
      )
      setEvoChainData(fetchData)
    };
    if(chainEvolution.length > 0) fetchEvoData();
  }, [chainEvolution]); */
  
  // adding the data 
  const name = data?.name
  const weight = data?.weight
  const height = data?.height
  const pokemonType = data?.types

  //console.log("evolution",evolution.length)

  
  const frontImg: string = data?.sprites.other.dream_world.front_default //data?.sprites.other.dream_world.front_default (this is for the other PokeData source)
  
  return <Detail 
  isLoading={isLoading || loadingEvo}   
  markdown={`
  # ${ name }
  ![${name}](${frontImg}?raycast-width=250&raycast-height=250)
  `} 
  navigationTitle={name}
  metadata={
    <Detail.Metadata>
      <Detail.Metadata.Label title="Weight" text={weight*0.1 +' Kg'} icon={Icon.Weights}/>  {/*weight was in hectograms *0.1 to Kg */}
      <Detail.Metadata.Label title="Height" text={height*10 +' cm'}  icon={Icon.ArrowUp} /> {/*<!--height was in decimetro, *10 to cm */}
      <Detail.Metadata.TagList title="Type">
        {
          pokemonType?.map((tp: { type: { name: string | undefined; }; }) => {
            const colorName = tp.type.name ? getColorByName(tp.type.name) : Colors.unknow
            return <Detail.Metadata.TagList.Item key={tp.type.name} text={tp.type.name} color={colorName} />
          })
        }
        
      </Detail.Metadata.TagList>
      <Detail.Metadata.Separator />
      <Detail.Metadata.TagList title='Evolution Chain'>
        {
          chainEvolution.map((evo) => {
            console.log('evo ???', evo)
            return <EvolutionTag key={evo} evolutionChainName={evo} currentName={name} />
           
          })
        }
      </Detail.Metadata.TagList>

    </Detail.Metadata>
  }
  />;
}

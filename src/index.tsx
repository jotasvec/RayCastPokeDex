import { Detail } from "@raycast/api";
import getPokemon  from "./fetchData";
import { getEvolution } from "./FetchEvolution";
import { Icon, List } from "@raycast/api";
import { Colors, getColorByName } from "./Colors";



export default function Command() {
  const { isLoading, data } = getPokemon();

  const speciesID = data?.species.url.split("/")[6];
  const {isLoading: loading, chainEvolution: evolution} = getEvolution(speciesID)

  // adding the data 
  const name = data?.name
  const weight = data?.weight
  const height = data?.height
  const pokemonType = data?.types

  //console.log("evolution",evolution.length)

  
  const frontImg = data?.sprites.other.dream_world.front_default //data?.sprites.other.dream_world.front_default (this is for the other PokeData source)
  
  return <Detail 
  isLoading={isLoading}   
  markdown={`
  # ${ name }
  ![](${frontImg})
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
      <Detail.Metadata.Link title='Evolution Chain' target={`https://www.pokemon.com/us/pokedex/${name}`} text={evolution[0] || "Evolution "} />
    </Detail.Metadata>
  }
  />;
}

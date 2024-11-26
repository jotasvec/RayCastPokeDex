import { getPokemonByName } from "./fetchData";
import { Detail } from "@raycast/api";
import { Colors, getColorByName } from "./Colors";



export function EvolutionTag({evolutionChainName, currentName}:{evolutionChainName: string , currentName: string}) {
    const { isLoading, data: specie } = getPokemonByName(evolutionChainName);

    if (isLoading) return null;
    //console.log('specie',specie)
    const specieType = specie?.types?.type || []
    const specieIcon = specie?.sprites?.front_default
    const colorName = specieType?.name ? getColorByName(specieType?.name) : Colors.unknow


    return currentName !== specie?.name ? 
        (<Detail.Metadata.TagList.Item key={specie?.name} icon={specieIcon } text={`${specie?.name}`} color={colorName} />) :
        (<Detail.Metadata.TagList.Item key={currentName} text={`${currentName} has no evolutions chain`} />);

}
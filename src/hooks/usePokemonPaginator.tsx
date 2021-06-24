import { useEffect, useRef, useState } from "react";
import { pokemonApi } from "../api/pokemonApi";
import { PokemonPaginatedResponse, SimplePokemon, Results } from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {

    const [isLoading, setisLoading] = useState(false)
    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon/?limit=40')
    const [simplePokemonsList, setsimplePokemonsList] = useState<SimplePokemon[]>([])

    const loadPokemons = async () => {
        try {
            setisLoading(true)
            let response = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current);
            nextPageUrl.current = response.data.next;
            mapPokemonList(response.data.results);
            setisLoading(false);
        } catch (error) {
            console.log(error)
            setisLoading(false);
        }
    }

    const mapPokemonList = ( pokemonsList: Results[]) => {

        const newPokemonList: SimplePokemon[] = pokemonsList.map( ({ name, url }) => {
            const urlPath = url.split('/');
            const id = urlPath[ urlPath.length - 2];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            return { id, picture, name }
        })
        setsimplePokemonsList([ ...simplePokemonsList, ...newPokemonList ]);
    }

    useEffect(() => {
        loadPokemons();
    }, [])

    return { 
        simplePokemonsList,
        isLoading,
        loadPokemons
    }

}
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import ImageColors from 'react-native-image-colors'
import { SimplePokemon } from '../interfaces/pokemonInterfaces'
import { FadeInImage } from './FadeInImage';

interface Props {
    pokemon: SimplePokemon;
}

const windowWidth = Dimensions.get('screen').width

export const PokemonCard = ({ pokemon }: Props) => {
    
    const navigation = useNavigation()
    const [bgColor, setbgColor] = useState('grey');
    const isMounted = useRef(true)

    useEffect(() => {
        // Ios Background
        // Android Background
        if (!isMounted) return; 

        ImageColors.getColors(pokemon.picture, { fallback: 'grey' })
            .then( colors => {
                (colors.platform === 'android' ? setbgColor(colors.dominant || 'grey')
                : setbgColor(colors.background || 'grey'))
            }, error => console.log(error))

        return () => {
            isMounted.current = false
        }
    }, [])

    const redirectDetailPokemon = () => {
        navigation.navigate('PokemonScreen', {
            simplePokemon: pokemon,
            color: bgColor
        })
    }

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={ redirectDetailPokemon }
        >
            <View style={{ 
                ...styles.cardContainer,
                backgroundColor: bgColor
            }}>
                <View>
                    <Text style={{
                        ...styles.name
                    }}>
                        {pokemon.name}
                        {'\n#' + pokemon.id}
                    </Text>
                </View>
                <View style={ styles.pokebolaContainer }>
                    <Image
                        source={require('../assets/pokebola-blanca.png')}
                        style={styles.pokebola}
                    />
                </View>
                <FadeInImage
                    uri={pokemon.picture}
                    style={styles.pokemonImage}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        height: 120,
        width: windowWidth * 0.4,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -25,
        bottom: -25

    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -8,
        bottom: -5,
    },
    pokebolaContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        opacity: 0.5,
        overflow: 'hidden'
    }
})

import React from 'react'
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { PokemonFull } from '../interfaces/pokemonInterfaces';

interface Props {
    pokemon: PokemonFull
}

export const PokemonDetails = ({ pokemon }: Props) => {
    return (
        <ScrollView
            style={{
                ...StyleSheet.absoluteFillObject
            }}
        >
            <View
                style={{ ...styles.container, marginTop: 370 }}
            >
                <Text style={styles.title}>Types</Text>
                <View style={{ flexDirection: 'row' }}>
                    {
                        pokemon.types.map(({ type }) => (
                            <Text
                                style={{...styles.regularText, marginRight: 10 }}
                                key={type.name}>{type.name}
                            </Text>
                        ))
                    }
                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22
    },
    regularText: {
        fontSize: 19,

    }
})
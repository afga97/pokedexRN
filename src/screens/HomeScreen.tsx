import React from 'react'
import { Image, FlatList, ActivityIndicator, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styles } from '../theme/appTheme'
import { usePokemonPaginated } from '../hooks/usePokemonPaginator';
import { PokemonCard } from '../components/PokemonCard';

export const HomeScreen = () => {
    
    const { top } = useSafeAreaInsets()
    const { simplePokemonsList, loadPokemons } = usePokemonPaginated();

    return (
        <>
            <Image
                source={require('../assets/pokebola.png')}
                style={styles.pokebolaBG}
            />
            <View
                style={{
                    alignItems: 'center'
                }}
            >
                <FlatList
                    data={simplePokemonsList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(pokemon) => pokemon.id}
                    numColumns={2}
                    renderItem={({ item }) => (<PokemonCard pokemon={item} />
                    )}
                    onEndReached={loadPokemons}
                    onEndReachedThreshold={0.4}
                    ListHeaderComponent={(
                        <Text style={{
                            ...styles.title,
                            ...styles.globalMargin,
                            top: top + 20,
                            marginBottom: top + 20,
                            paddingBottom: 20
                        }}
                        >Pokemones</Text>
                    )}
                    ListFooterComponent={(
                        <ActivityIndicator
                            style={{ height: 100 }}
                            color="grey"
                            size={30}
                        />
                    )}
                />
            </View>

        </>
    )
}

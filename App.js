import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import PokemonCard from './components/PokemonCard';
import PokemonShowModel from './components/PokemonShowModel';


const pokemonapi = 'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetch(pokemonapi)
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.pokemon);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handlePokemonPress = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleModalClose = () => {
    setSelectedPokemon(null);
  };

  const renderPokemonDetails = () => {
    if (!selectedPokemon) {
      return null;
    }
    return <PokemonShowModel pokemon={selectedPokemon} onClose={handleModalClose} />;
  };

  const renderContent = () => {
    if (isLoading) {
      return <Text style={styles.loadingText}>Loading...</Text>;
    }

    const types = {};
    pokemonList.forEach((pokemon) => {
      pokemon.type.forEach((type) => {
        if (!types[type]) {
          types[type] = [];
        }
        types[type].push(pokemon);
      });
    });

 

  
    const sections = Object.keys(types).map((type) => ({
      title: type,
      data: types[type],
    }));

    return (
      <View style={styles.container}>
        <SectionList
          sections={sections}
          renderItem={({ item }) => (
            <PokemonCard pokemon={item} onPress={() => handlePokemonPress(item)} />
          )}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
        
        />
        {renderPokemonDetails()}
      </View>
    );

  };

  return renderContent();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 50,
  },
  loadingText: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
    marginHorizontal: 20,
  },
})
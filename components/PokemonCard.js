// PokemonCard.js

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const PokemonCard = ({ pokemon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.pokemonCard}>
        <Image source={{ uri: pokemon.img }} style={styles.pokemonImage} />
        <Text style={styles.pokemonName}>{pokemon.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pokemonCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    
    
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pokemonImage: {
    width: 100,
    height: 100,
  },
  pokemonName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default PokemonCard;

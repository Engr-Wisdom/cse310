import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import MovieCard from "../components/MovieCard";
import { searchMovies } from "../services/searchService";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);

  const handleSearch = async (text: string) => {
    setQuery(text);

    if (!text.trim()) {
      setMovies([]);
      return;
    }

    try {
      const data = await searchMovies(text);
      setMovies(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons
          name="search"
          size={22}
          color="#999"
        />

        <TextInput
          placeholder="Search movies..."
          placeholderTextColor="#888"
          value={query}
          onChangeText={handleSearch}
          style={styles.input}
        />

        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="close"
            size={24}
            color="#ffffff"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.heading}>
        Search Results
      </Text>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MovieCard movie={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },

  input: {
    flex: 1,
    color: "#ffffff",
    marginLeft: 10,
    borderWidth: 0,
  },

  heading: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 20,
  },
});
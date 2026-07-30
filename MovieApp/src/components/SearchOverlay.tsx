import React, { useState } from "react";
import {
  Modal,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { searchMovies } from "../services/searchService";
import MovieCard from "./MovieCard";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function SearchOverlay({
  visible,
  onClose,
}: Props) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);

  const handleChange = async (text: string) => {
    setQuery(text);

    if (!text.trim()) {
      setSuggestions([]);
      setResults([]);
      return;
    }

    try {
      const data = await searchMovies(text);

      setSuggestions(data.results.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      return;
    }

    try {
      const data = await searchMovies(query);

      setResults(data.results || []);
      setSuggestions([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSuggestionPress = async (title: string) => {
    setQuery(title);

    try {
      const data = await searchMovies(title);

      setResults(data.results || []);
      setSuggestions([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#999"
            />

            <TextInput
              placeholder="Search movies..."
              placeholderTextColor="#999"
              value={query}
              onChangeText={handleChange}
              onSubmitEditing={handleSearch}
              style={styles.input}
              returnKeyType="search"
            />

            <TouchableOpacity
              onPress={() => {
                setQuery("");
                setSuggestions([]);
                setResults([]);
                onClose();
              }}
            >
              <Ionicons
                name="close"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>

          {suggestions.length > 0 && (
            <FlatList
              data={suggestions}
              keyExtractor={(item) =>
                item.id.toString()
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.itemContainer}
                  onPress={() =>
                    handleSuggestionPress(item.title)
                  }
                >
                  <Text style={styles.itemText}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}

          {suggestions.length === 0 && (
            <FlatList
              data={results}
              numColumns={2}
              keyExtractor={(item) =>
                item.id.toString()
              }
              contentContainerStyle={
                styles.resultsContainer
              }
              renderItem={({ item }) => (
                <View style={styles.cardContainer}>
                  <MovieCard movie={item} />
                </View>
              )}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.92)",
  },

  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20,
  },

  searchContainer: {
    backgroundColor: "#222",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    color: "#ffffff",
    marginLeft: 10,
    fontSize: 16,
  },

  itemContainer: {
    paddingVertical: 15,
  },

  itemText: {
    color: "#ffffff",
    fontSize: 16,
  },

  resultsContainer: {
    paddingTop: 20,
  },

  cardContainer: {
    marginBottom: 20,
    marginRight: 10,
  },
});
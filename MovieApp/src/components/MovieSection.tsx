import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import MovieCard from "./MovieCard";

type Props = {
  title: string;
  movies: any[];
};

export default function MovieSection({
  title,
  movies,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>

        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <MovieCard movie={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 15,
  },

  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },

  seeAll: {
    color: "#E50914",
    fontWeight: "600",
  },

  list: {
    paddingLeft: 20,
    paddingRight: 10,
  },
});
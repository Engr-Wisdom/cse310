import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { router } from "expo-router";
import { IMAGE_URL } from "../api/apiConfig";

type Props = {
  movie: any;
};

export default function MovieCard({ movie }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: "/movie/[id]",
          params: { id: movie.id.toString() },
        })
      }
    >
      <View style={styles.card}>
        <Image
          source={{
            uri: IMAGE_URL + movie.poster_path,
          }}
          style={styles.image}
        />

        <Text numberOfLines={1} style={styles.title}>
          {movie.title}
        </Text>

        <View style={styles.info}>
          <Text style={styles.rating}>
            ⭐ {movie.vote_average?.toFixed(1) ?? "0.0"}
          </Text>

          <Text style={styles.year}>
            {movie.release_date?.substring(0, 4)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    marginRight: 16,
  },

  image: {
    width: 150,
    height: 225,
    borderRadius: 15,
    backgroundColor: "#333",
  },

  title: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    marginTop: 8,
  },

  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },

  rating: {
    color: "#FFD700",
    fontSize: 13,
  },

  year: {
    color: "#ccc",
    fontSize: 13,
  },
});
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";
import { IMAGE_URL } from "../api/apiConfig";

export default function CastCard({
  actor,
}: {
  actor: any;
}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: "/person/[id]",
          params: { id: actor.id },
        })
      }
    >
      <Image
        source={{
          uri: IMAGE_URL + actor.profile_path,
        }}
        style={styles.image}
      />

      <Text numberOfLines={1} style={styles.name}>
        {actor.name}
      </Text>

      <Text numberOfLines={1} style={styles.character}>
        {actor.character}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    marginRight: 15,
    alignItems: "center",
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  name: {
    color: "#fff",
    marginTop: 8,
    fontWeight: "bold",
    textAlign: "center",
  },

  character: {
    color: "#aaaaaa",
    fontSize: 12,
    textAlign: "center",
  },
});
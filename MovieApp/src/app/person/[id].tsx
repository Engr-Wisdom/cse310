import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { IMAGE_URL } from "../../api/apiConfig";
import {
  getActorDetails,
  getActorMovies,
} from "../../services/personService";

import { FlatList } from "react-native";

export default function PersonDetails() {
  const { id } = useLocalSearchParams();

  const [person, setPerson] = useState<any>(null);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    loadPerson();
  }, []);

  const loadPerson = async () => {
    try {
      const personData = await getActorDetails(
        id.toString()
      );

      const movieData = await getActorMovies(
        id.toString()
      );

      setPerson(personData);
      setMovies(movieData.cast.slice(0, 10));
    } catch (error) {
      console.log(error);
    }
  };

  if (!person) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          Loading actor information...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="white"
          />
        </TouchableOpacity>

        <View style={styles.header}>
          <Image
            source={{
              uri: IMAGE_URL + person.profile_path,
            }}
            style={styles.image}
          />

          <Text style={styles.name}>
            {person.name}
          </Text>

          <Text style={styles.info}>
            Born: {person.birthday || "Unknown"}
          </Text>

          <Text style={styles.info}>
            {person.place_of_birth || "Unknown"}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>
            Biography
          </Text>

          <Text style={styles.biography}>
            {person.biography || "Biography unavailable."}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>
            Movies
          </Text>

          <FlatList
            horizontal
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.movieCard}
                activeOpacity={0.8}
                onPress={() =>
                  router.push({
                    pathname: "/movie/[id]",
                    params: {
                      id: item.id.toString(),
                    },
                  })
                }
              >
                <Image
                  source={{
                    uri: IMAGE_URL + item.poster_path,
                  }}
                  style={styles.movieImage}
                />

                <Text
                  style={styles.movieName}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>

                <Text style={styles.movieDate}>
                  {item.release_date?.substring(0, 4)}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#171717",
  },

  loadingText: {
    color: "#ffffff",
    fontSize: 18,
  },

  backButton: {
    marginTop: 20,
    marginLeft: 20,
  },

  header: {
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },

  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },

  name: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },

  info: {
    color: "#bbbbbb",
    marginTop: 5,
    textAlign: "center",
  },

  section: {
    padding: 20,
  },

  heading: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  biography: {
    color: "#dddddd",
    lineHeight: 24,
    textAlign: "justify",
  },

  movieCard: {
    width: 140,
    marginRight: 15,
  },

  movieImage: {
    width: 140,
    height: 210,
    borderRadius: 12,
  },

  movieName: {
    color: "#ffffff",
    marginTop: 8,
    fontWeight: "bold",
  },

  movieDate: {
    color: "#aaaaaa",
    marginTop: 5,
  },
});